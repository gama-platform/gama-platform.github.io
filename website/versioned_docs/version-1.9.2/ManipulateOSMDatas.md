---
title:  Manipulate OSM Datas
---

[//]: # (startConcept|use_osm_datas)
[//]: # (keyword|concept_osm)

[//]: # (keyword|concept_load_file)
This section will be presented as a quick tutorial, showing how to proceed to manipulate OSM (Open street map) data, clean them and load them into GAMA. We will use the software [QGIS](http://www.qgis.org/en/site/) to change the attributes of the OSM file.

Note that GAMA can read and import OpenStreetMap data natively and create agents from them. An example model is provided in the Model Library (Data Importation / OSM File Import.gaml). In this case, you will have to write a model to import, select data from OpenStreetMap before creating agents and then could export them into shapefiles, much easier to use in GAMA.

From the website [openstreetmap.org](https://www.openstreetmap.org/), we will choose a place (in this example, we will take a neighborhood in New York City). Directly from the website, you can export the chosen area in the osm format.

![1_getopenstreetmap](https://user-images.githubusercontent.com/104968829/205202713-05373b25-0bac-48f0-82fe-0885ad95eb19.png)

We have now to manipulate the attributes for the exported osm file.
Several softwares can be used, but we will focus on [QGIS](http://www.qgis.org/en/site/), which is totally free and provides a lot of possibilities in term of manipulation of data.

Once you have installed correctly QGIS, launch QGIS Desktop, and start to import the topology from the osm file.

QGis 3, the version we are using to build this tutorial, needs us to install a plugin to process files downloaded from OSM website. There are several versions of plugins allowing to do that. However, the most stable and simple one to use is QuickOSM. Go to your extension manager, select "All extensions" on the top left corner, look for "QuickOSM" extension and install it. 

![2_GetQuickOSM](https://user-images.githubusercontent.com/104968829/205202766-23d8304c-7e24-4f96-bd32-ba6bc50d2db6.png)

You should now be able to use the extension QuickOSM. Open its menu by entering the vector menu on the top QGis panel, go to QuickOSM, then select :
1) OSM file
2) Browse your xml file.
3) Browse to select the folder that will welcome the processed file through QGis (select the "includes" folder of your current GAMA project for more efficiency). 
4) Select the format you want for your processed file (in the example, ESRI shapefile will give a .shp, very well processed by GAMA afterwards).
5) Open your file. 

![3_ImporAndOpentOSMfile](https://user-images.githubusercontent.com/104968829/205202856-498511cb-b9be-43e2-a099-cabdd4553422.png)

You will go back naturally to the main QGis UI and you downloaded OSM layer will be visible. 

Before beginning the layer treatment process with QGis, please note that it is easier to use separated shapefiles for each entities if the objective is to use GAMA afterwards. Therefore, we recommend importing in GAMA separated shapefiles for each spatial entity you want to make appear in your model. Indeed, it is simpler to create one species for each spatial entity instead of having one species declined by different arributes. If you want to represent buildings and houses, it's recommended to have two separated files : one for buildings and one for houses. 

First, we want buildings to be isolated from the other polygons. We can use the field 'building' to make an attribute selection to do that. By opening the attribute table of the file, we can check that this field exists and that every building has been attributed a "yes". If other information are given, replace the information by "yes" to facilitate the process of selection. Once it's done, go to the attribute selection menu on the top panel and type this in the dialogue box : "building" = 'yes'. Click on "select features" once it's done and close the window. 

![5_OpenAttributes](https://user-images.githubusercontent.com/104968829/205202991-9de2d11f-47e0-450e-bc3b-88c9ee172faf.png)

![6_CheckExistingFieldsToIsolate](https://user-images.githubusercontent.com/104968829/205202999-f008cc37-9793-4ddd-b5b6-9d4472856fab.png)

![7_SelectBuildings](https://user-images.githubusercontent.com/104968829/205203028-1d95bc00-c678-4ceb-a533-ec65b3f96ac4.png)

If typed correctly, QGis should understand that you want to select only polygons that are recognized as buildings. The buildings polygons should be highlighted in yellow now. Save the selected features as a new .shp file in your "includes" folder. We called ours "OSM_For_GAMA_Buildings". The new layer which just appeared should only comprise buildings of the area. 

![8_SaveSelectedFeatures](https://user-images.githubusercontent.com/104968829/205203070-ad210146-6172-4c69-b3b6-a84ef25d3563.png)

Then, we can create a new field for the new buildings layer to allow a better handling in GAMA platform do differentiate colors : first, enter you attribute table of the layer. 

Then, go to edit mode (the pen icon on the top left corner) and select field calculator. 

![9_InAttributes](https://user-images.githubusercontent.com/104968829/205203174-72bdf22c-4ab9-4625-9ec5-ce87d591abf4.png)

Stay on the left hand side, we will now set up the field's characteristics, you can copy what you see in the screenshot bellow. Pay attention to selecting "string" to the field type, otherwise you won't be able to get the proper format of attributes in the following steps of this tutorial. 

![10_Creatingattr1](https://user-images.githubusercontent.com/104968829/205203196-aa3cdc3a-db12-4fe4-99ba-8822e100eff1.png)

We want to create this attribute and associate to it variables that will be colors. We want to ask QGis to do that randomly on its own. Therefore, we have to provide the software a function. Go to the "function editor" tab, click on the "+" to add a new function file and write these lines down after having deleted the default help : 

```
from qgis.core import *
from qgis.gui import *
import random, string

@qgsfunction(args='auto', group='Custom')
def myFun(value1, feature, parent):
    return random.choice(["blue","red"])
```

Save and run the function using the proper button on the bottom right corner. 

![11_Creatingattr2](https://user-images.githubusercontent.com/104968829/205203210-4926d26e-986a-4fde-8487-cb9e22c5ca94.png)

Then go to the expression type and call your function by typing :
```myFun('attrForGam')```
Click on "Ok" which will get you back to your attribute table : you can now check the layer's attributes to see if the new field 'attrForGam' has been filled with random values "red" or "blue". 

![12_Creatingattr3](https://user-images.githubusercontent.com/104968829/205203225-ce473809-5493-4cf6-9ced-7d1ffc4f6f56.png)

When you download data from OSM website, some fields might be missing. For instance, the file we downloaded here doesn't include the buildings' height. To give realistic aspects to our model, we want here to call another function to make QGis create a "Height" field and associate automatically a height to buildings between 20 and 50 meters high. You can repeat the previous steps for the 'attrForGam' field to create a 'Height' field using the following code :

```
from qgis.core import *
from qgis.gui import *
import random, string

@qgsfunction(args='auto', group='Custom')
def myFunHeight(value1, feature, parent):
    return random.randrange(20, 50, 1)
 ```
 Don't forget to call this new function in the expression tab : ```myFunHeight('Height')```. Then, check if the new field has been added and save the modifications of your attributes. 
 
![13_CheckAndSaveModifications](https://user-images.githubusercontent.com/104968829/205203279-c448e2af-78b7-42ab-a808-18510629045d.png)

Our work on the buildings layer is done. You don't have to save it since QGis is automatically saving the modifications you do on your files (the one we previously called "OSM_For_GAMA_Buildings"). 
The file for buildings is now ready to be used in GAMA for modelling. We now have to take care our other polygons and lines we downloaded.

We now want to add the main natural elements to our model : parks. For this, we only have to select the few parks we have in the area thanks to the spatial selection tool provided by QGis.
To do that, you have to use the original polygons layer you downloaded to make a spatial selection of the parks. 
To select several polygons using this tool, just press shift + left click on each polygons you are interested with. Before beginning the selection, locate where the parks are so that you are sure the polygons you select are the parks you want to represent. 
1) Select the polygon layer. 
2) Select the tool "select features by area or single click" on the top panel. 
3) Select the right polygons using left click and pressing maj to select several polygons. 

![14_SelectParks](https://user-images.githubusercontent.com/104968829/205203311-d82f542e-9011-489f-aead-700006d4f701.png)

Then, save the selected polygons as a new shapefile which will only comprise parks areas. For this tutorial, we called the parks shapefile "OSM_For_GAMA_Parks". 

Finally, we need roads for our possible agents to travel the city. The shapefile already exists from the OSM file we downloaded. It is possible to modify it using the edition mode after selecting the lines layer, and delete the roads we don't want. 

![15_ModifyLines](https://user-images.githubusercontent.com/104968829/205203329-e0f0530c-a403-4786-8df8-aa51e7240a50.png)

Don't forget to save your layer as a .shp file in your "includes" folder of your current GAMA project. For this tutorial, we call the roads shapefile "OSM_For_GAMA_Parks"

Please note that you can repeat these steps as many times as you want according to the level of details you need in your model. As OSM provides a large possibility of land use types, we cannot go over every one of them in this tutorial. The steps are the same as the ones described above. 

You can now import your three .shp files that should be in your "includes" folder of your current project. 

```
model OSMtutorial

global {
    // Global variables related to the Management units 
 
	file shapeFile1 <- file("../includes/OSM_For_GAMA_Buildings.shp");
    file shapeFile2 <- file("../includes/OSM_For_GAMA_Parks.shp");
	file shapeFile3 <- file("../includes/OSM_For_GAMA_Roads.shp");

    //definition of the environment size from the shapefile. 
    //Note that is possible to define it from several files by using: geometry shape <- envelope(envelope(file1) + envelope(file2) + ...);
    geometry shape <- envelope(envelope(shapeFile1) + envelope(shapeFile2) + envelope(shapeFile3));
    
    init {
    //Creation of Buildings agents from the shapefile (and reading some of the shapefile attributes)
    create Buildings from: shapeFile1
        with: [elementId::int(read('full_id')), elementHeight::int(read('Height')), elementColor::string(read('attrForGam'))] ;
        
    create Parks from: shapeFile2;
    	
    create Roads from: shapeFile3 where (each != nil);
    }
}
    
species Buildings{
    int elementId;
    int elementHeight;
    string elementColor;
    
    aspect basic{
    draw shape color: (elementColor = "blue") ? #blue : ( (elementColor = "red") ? #red : #yellow) depth: elementHeight;
    }
} 

species Parks {
	
	aspect basic {
		draw shape color: #green;
	}
} 

species Roads {
	
	aspect basic {
		draw shape color: #grey width: 3#meter;
	}
}

experiment main type: gui {     
    output {
    display HowToUseOpenStreetMap type:opengl {
       species Buildings aspect: basic; 
       species Parks aspect: basic;
       species Roads aspect: basic;
    }
    }

```

Here is the result, with a special colorization of the different elements regarding the value of the attribute "attrForGama", an elevation regarding the value of the attribute "height", and basic species creation for roads and parks. 

![16_FinalGAMA](https://user-images.githubusercontent.com/104968829/205203411-a09549ca-0761-47ea-ba51-c78ed23af7a4.png)

[//]: # (endConcept|use_osm_datas)