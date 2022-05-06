import getopt
import re
import sys
from typing import List, Dict


class Char:

    def __init__(self, line: int, col: int, val: str, char_nb: int):
        self.line       = line
        self.col        = col
        self.val        = val
        self.charNumber = char_nb

    def __str__(self):
        return f"{self.val}(l:{self.line},c:{self.col},nb:{self.charNumber})"


class Tag:

    def __init__(self, tagOpening: List[Char]):
        self.tagOpening = tagOpening
        self.name       = "".join([t.val for t in tagOpening[1:]])
        self.finalPos   = tagOpening[-1].charNumber
        self.startLine  = tagOpening[0].line
        self.startCol   = tagOpening[0].col
        self.startNb    = tagOpening[0].charNumber

    def __str__(self):
        return f"{self.name}(l:{self.startLine},c:{self.startCol})"


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

    input_file  = ''
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

    globalCol : int = 1
    globalLine: int = 1
    chars : List[Char] = []
    for i, c in enumerate(text):
        chars += [Char(globalLine, globalCol, c, i)]
        if c == "\n":
            globalLine += 1
            globalCol = 1
        else:
            globalCol += 1

    #TODO: for the moment we ignore those in comments and/or strings

    tagStack: List[Tag] = []
    unclosedTags : List[Tag] = []
    ite = 0
    while ite < len(chars) - 1:
        currentChar = chars[ite]
        if currentChar.val == "<" and re.match("[a-zA-Z]", chars[ite+1].val):
            #we found a new tag
            tag = [currentChar]
            ite += 1
            #we parse to have the name
            while re.match("[a-zA-Z\d]", chars[ite].val):
                tag += [chars[ite]]
                ite += 1
                currentChar = chars[ite]

            tagStack += [Tag(tag)]
            currentChar = chars[ite]
            #Now either we have a "/>" closing the tag or we have some content
            while currentChar.val != ">" and ite < len(chars) -1 and currentChar.val != "/" and chars[ite+1].val != ">":
                ite += 1
                currentChar = chars[ite]

            if currentChar.val == ">":
                # The tag ended, we must now look for the closing one
                currentTag = tagStack[-1]
                remainingText = "".join([c.val for c in chars[ite:]])
                match = re.search("</" + currentTag.name, remainingText, flags=re.IGNORECASE)

                if match is None:
                    # No closing tag found, we signal this tag as non closing and continue
                    unclosedTags += [currentTag]
                else:
                    # We found a closing tag, so move until the closing tag and continue
                    ite = ite + match.span()[1]

                # Whether we found it or not, we unstack the last tag
                tagStack = tagStack[:-1]

            elif ite < len(chars) - 1 and currentChar.val == "/" and chars[ite+1].val == ">":
                #The tag is self-closing, we can unstack it and continue
                tagStack = tagStack[:-1]
            else:
                #In this case we reach the end without a closing tag, we should signal the tag as non closing, unstackit and reset ite
                currentTag = tagStack[-1]
                unclosedTags += [currentTag]
                ite = currentTag.finalPos
                tagStack = tagStack[:-1]

        ite += 1

    unclosedTags = unclosedTags + tagStack

    outText = text
    log = []
    #we reverse the list so we can modify the out text while keeping the in text indices
    unclosedTags.sort(reverse=True, key=lambda tag: tag.startNb)
    for unclosedTag in unclosedTags:
        log += [f"unclosed tag: {unclosedTag.name} starting line: {unclosedTag.startLine} col:{unclosedTag.startCol}"]
        outText = outText[:unclosedTag.startNb] + "&lt;" + outText[unclosedTag.startNb+1:]

    #print("\n".join(reversed(log)))
    #print("\n\n\n\n")
    if output_file != "":
        f = open(output_file, "w+")
        f.write(outText)
    else:
        print(outText)


