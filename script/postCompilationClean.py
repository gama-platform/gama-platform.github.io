from bs4 import BeautifulSoup
import glob

# All files and directories ending with .txt and that don't begin with a dot:
for file in glob.glob("./website/build/*.html"):

    if "search" not in file:
        if "404" not in file:
            print("Updating file ", file)
            soup = BeautifulSoup(open(file), 'html.parser')

            soup.find('div', {'class':'dropdown--right'}).decompose()

            with open(file, "wb") as f_output:
               f_output.write(soup.prettify("utf-8"))