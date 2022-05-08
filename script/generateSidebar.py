# generateSidebar.py

import json
import os

class Category:
	cat = {}
	
	def __init__(self, label: str, mdName: str, items: list[str] = []):
		self.cat["type"]       = "category"
		self.cat["label"]      = label
		self.cat["link"]       = {"type": "doc", "id": mdName}
		self.cat["collapsed"]  = "true"
		self.cat["items"]      = items

	def toJson(self):
		return json.dumps(self.cat, indent = 4) 

	def toDict(self):
		return dict(self.cat)

	def __str__(self):
		return self.toJson()

	def __json__(self):
		return json.dumps(self.cat) 

class CategoryTutorial(Category):
	def __init__(self, label: str, mdName: str, items: list[str] = []):
		self = Category(label, mdName, self.getTutoPages(mdName))

	def getTutoPages(self, mdName):
		steps = [filename[:-3] for filename in os.listdir(docPath) if filename.startswith(mdName+"_")]
		# Better steps.sort()
		return sorted(steps, key=lambda name: int(name[(len(mdName)+len("_step")):]))

	def toDict(self):
		if self.cat["items"] == []:
			return self.cat["link"]["id"]
		else:
			return Category.toDict(self)

def generateTutorial(tutorialList: list[str] = []):
	tutoCat = []
	tutorialList = splitMdSidebar()["tuto"] if tutorialList == [] else tutorialList

	for tuto in tutorialList:
		tutoSplit = tuto.split(")")[0].split("[")[1].split("](")
		tutoCat.append(CategoryTutorial( tutoSplit[0], tutoSplit[1]).toDict())

	#print("{\"tuto\": "+json.dumps(tutoCat, indent=4)+",")
	return tutoCat

def splitMdSidebar():
	isTuto = False
	endTuto = False
	tutorialList = {"tuto": [], "side": []}

	index = "side"
	for line in getSidebarContent():
		# Clean menu
		if not isTuto :
			if "Tutorials" in line:
				isTuto = True
				index = "tuto"
				tutorialList[index].append(line)
			else:
				tutorialList[index].append(line)
		elif not endTuto and isTuto :
			if "#" in line:
				endTuto = True
				index = "side"
				tutorialList[index].append(line)
			else:
				tutorialList[index].append(line)
		else:
			tutorialList[index].append(line)

	return tutorialList

def getSidebarContent():
	file = open(sideMdPath, "r")
	# read the file as a list
	sideMd = file.readlines()
	# close the file
	file.close()

	# Remove entry with only "\n"
	return [i.split("\n")[0] for i in sideMd if i != "\n"]

def makeSubCat(subList: list[str]):
	items = []
	subCatTrigger = "    "
	entry = 1
	while entry < len(subList):
		if len(subList) > entry+1:
			if subList[entry+1].startswith(subCatTrigger):
				# Get sub cat
				subCatList = [subList[entry]]
				endSubCatList = False
				skipIndex = 1
				while not endSubCatList:
					if len(subList) > entry+skipIndex : 
						if subList[entry+skipIndex].startswith(subCatTrigger):
							# Add without 
							subCatList.append(subList[entry+skipIndex][len(subCatTrigger):])
							skipIndex += 1
						else:
							endSubCatList = True
					else:
						endSubCatList = True
				#print(skipIndex, entry)
				items.append( makeSubCat(subCatList) )
				entry = entry + skipIndex-1
			else:
				items.append(subList[entry].split("](")[1].split(")")[0])
		else:
			items.append(subList[entry].split("](")[1].split(")")[0])

		# Manual loop process
		entry += 1

	titleSplit = subList[0].split(")")[0].split("[")[1].split("](")
	return Category(titleSplit[0], titleSplit[1], items).toDict()

def generateMain(mdList: list[str] = []):
	indexTitleCat = []

	# Pre-cut sidebar list for makeSubCat()
	for i in range(len(mdList)):
		if mdList[i].startswith("#"):
			if len(mdList) > i+1:
				if mdList[i+1].startswith("#"):
					#print("not a category title - NOT SUPPORTED YET")
					# Is supported now ;) 
					indexTitleCat.append("~" + str(i))
				else:
					indexTitleCat.append(i)

	# Last element need to have index to last line 
	indexTitleCat.append(len(mdList))

	mainList = []
	for i in range((len(indexTitleCat)-1)):
		if str(indexTitleCat[i]).startswith(str("~")):
			mainList.append( mdList[int(indexTitleCat[i][1:])].split("](")[1].split(")")[0] )
		else:
			mainList.append( makeSubCat(mdList[indexTitleCat[i]:int(str(indexTitleCat[i+1]).replace("~",""))]) )

	return mainList

# ======== 
#	Main
# ========

docPath="./docs/"
sideMdPath = docPath+"/_Sidebar.md"
	
splittedSidebar = splitMdSidebar()

print( json.dumps({"tuto": generateTutorial(splittedSidebar["tuto"]),"side": generateMain(splittedSidebar["side"])}) )

#print(finalJson)

"""
for x in sideMd:
	x = x.replace('\n', '')
	if x.replace(" ", "") != "":
		print("-"+x+"~")
	pass"""