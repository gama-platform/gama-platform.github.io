import getopt
import re
import sys
from typing import List, Dict


class TextElement:

    startIndex: int

    def __init__(self, start_index: int):
        self.startIndex = start_index


class Char(TextElement):

    line: int
    col: int
    val: str

    def __init__(self, line: int, col: int, val: str, char_nb: int):
        super().__init__(char_nb)
        self.line = line
        self.col = col
        self.val = val

    def __str__(self):
        return f"{self.val}(l:{self.line},c:{self.col},nb:{self.startIndex})"


class Tag(TextElement):

    characters: List[Char]
    name: str
    finalPos: int
    startLine: int
    startCol: int

    def __init__(self, tag_characters: List[Char]):
        super().__init__(tag_characters[0].startIndex)
        self.characters = tag_characters
        self.name = "".join([t.val for t in tag_characters[1:]])
        self.finalPos = tag_characters[-1].startIndex
        self.startLine = tag_characters[0].line
        self.startCol = tag_characters[0].col

    def __str__(self):
        return f"{self.name}(l:{self.startLine},c:{self.startCol})"


def escaping(char: Char) -> str:
    if char.val == "<":
        return "&lt;"
    elif char.val == "{":
        return "&#123;"
    else:
        raise Exception("Unable to escape " + str(char))

def print_help():
    print("""Parameters:
 -h for help
 -i --ifile for the path of the input file
 -o --ofile for the path of the output file
If no output file given, the result will be printed directly in the console
Example use: python escapingTags.py -i <badly_formatted_file> -o <path_to_the_brand_new_perfectly_formatted_file>""")


# Parameters:
# -h for help
# -i for the path of the input file
# -o for the path of the output file
# If no output file given, the result will be printed directly in the console
if __name__ == '__main__':
    """
        The principle of the algorithm is to first parse through the text to transform it into a list of Char objects, 
        each containing the character value as well as its location in the original text (index, line and column).
        Then, on that list we do a second pass to find where are located all the tags (in the html definition of tags) 
        that are not closed as well as "<" char followed by anything but a space char that are not tags ("<-" for example)
        and all the "{" characters not in code blocks and build a list out of it. Then we rebuild a new text where we 
        replace the first char of all detected elements by an escaped version.
    """
    input_file = ''
    output_file = ''
    try:
        opts, args = getopt.getopt(sys.argv[1:], "hi:o:", ["ifile=", "ofile="])
    except getopt.GetoptError:
        print_help()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print_help()
            sys.exit()
        elif opt in ("-i", "--ifile"):
            input_file = arg
        elif opt in ("-o", "--ofile"):
            output_file = arg
    try:
        text = open(input_file).read()
    except OSError as e:
        print(f"Unable to open the file '{input_file}'")
        print_help()
        sys.exit()

    globalCol: int = 1
    globalLine: int = 1
    chars: List[Char] = []
    for i, c in enumerate(text):
        chars += [Char(globalLine, globalCol, c, i)]
        if c == "\n":
            globalLine += 1
            globalCol = 1
        else:
            globalCol += 1

    #TODO: for the moment we ignore those in comments and/or strings

    tagStack: List[Tag] = []
    ElementsToEscape: List[TextElement] = []
    ite = 0

    # Counters used to remember if the text is in a code bloc
    in_simple_quote = False
    in_triple_quotes = False
    while ite < len(chars) - 1:
        currentChar = chars[ite]

        # If we encounter a "<" and are not in quoted text
        if not in_simple_quote and not in_triple_quotes and currentChar.val == "<":
            # We check if it looks like a tag
            if re.match("[\?a-zA-Z\d]", chars[ite+1].val):
                # We found a new tag, first we are going to parse to get its name
                tag = [currentChar]
                ite += 1
                while re.match("[\?a-zA-Z\d]", chars[ite].val):
                    tag += [chars[ite]]
                    ite += 1
                    currentChar = chars[ite]

                # We save the tag in our tag stack
                tagStack += [Tag(tag)]
                currentChar = chars[ite]

                # Now either we have a "/>" closing the tag or ">" followed by some content and a closing tag
                while currentChar.val != ">" and ite < len(chars) - 1 and currentChar.val != "/" and chars[ite+1].val != ">":
                    ite += 1
                    currentChar = chars[ite]

                # If we have reached the end of the tag, we must now look for the closing one
                if currentChar.val == ">":
                    currentTag = tagStack[-1]
                    remainingText = "".join([c.val for c in chars[ite:]])
                    match = re.search("</" + currentTag.name, remainingText, flags=re.IGNORECASE)

                    if match is None:
                        # No closing tag found, we signal this tag as non closing and continue
                        ElementsToEscape += [currentTag]
                    else:
                        # We found a closing tag, so move until the closing tag and continue
                        ite = ite + match.span()[1]

                    # Whether we found it or not, we unstack the last tag
                    tagStack = tagStack[:-1]

                # Else if the tag is self-closing, we can unstack it and continue
                elif ite < len(chars) - 1 and currentChar.val == "/" and chars[ite+1].val == ">":

                    tagStack = tagStack[:-1]
                # If we reached the end without a closing tag
                # we should signal the tag as non closing, unstack it and reset ite
                else:

                    currentTag = tagStack[-1]
                    ElementsToEscape += [currentTag]
                    ite = currentTag.finalPos
                    tagStack = tagStack[:-1]
            # If it's not a tag but still followed by any character different from a space we also need to escape it
            elif chars[ite+1].val != " ":
                ElementsToEscape += [currentChar]
        # If we encounter a "{" and are not in quoted text
        elif not in_simple_quote and not in_triple_quotes and currentChar.val == "{":
            ElementsToEscape += [currentChar]

        # If we encounter a quote
        if currentChar.val == '`':
            # If we encountered a triple quote
            if ite < len(chars) - 2 and chars[ite+1].val == '`' and chars[ite+2].val == '`':
                in_triple_quotes = not in_triple_quotes
                ite += 2 # In order to not have to process the 2 next simple quotes in the loop
                # If we are getting out of triple quotes, we are out of simple quotes no matter what
                if not in_triple_quotes:
                    in_simple_quote = False
            # If not, it's only a simple quote
            else:
                in_simple_quote = not in_simple_quote

        ite += 1

    ElementsToEscape = ElementsToEscape + tagStack

    outText = text
    log = []
    # Now we can finally replace all the elements by their escaped version
    # We reverse the list so we can modify the out text while keeping the in text indices
    ElementsToEscape.sort(reverse=True, key=lambda tag: tag.startIndex)
    for element in ElementsToEscape:
        log += [f"element to escape: {element}"]
        outText = outText[:element.startIndex] + escaping(chars[element.startIndex]) + outText[element.startIndex+1:]

    #print("\n".join(reversed(log)))
    #print("\n\n\n\n")
    if output_file != "":
        f = open(output_file, "w+")
        f.write(outText)
    else:
        print(outText)


