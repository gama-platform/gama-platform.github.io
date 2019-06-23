<?php

/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 **/

/**
 * This script will transform the _Sidebar.md MarkDown
 * file into a JSON format Docusaurus-friendly
 *
 * The sidebar.json will have 2 sub-sidebars :
 *  - _tuto_ which will be the Tutorials one
 *  - _doc_ which will be the Documentation one 
 **/

$sidebarArray = array("tuto"=> array(), "doc"=> array());

$catArray=$subMenu=$subSubMenu=$prevTitle="";

$fp=fopen("./docs/_Sidebar.md", "r+");
while ($line = stream_get_line($fp, 1024 * 1024, "\n")) {
	// Title
	if (strpos($line, '##') !== false) {
		//$sidebarArray["doc"][] = $line;
		if( $line[3] == '['){
			$title = explode("](", explode("[", $line)[1] );

			if($title[0] == "Tutorials"){
				$catArray = "tuto";
			}
			else{
				$catArray = "doc";	
			}

			$subMenu = $title[0];

			$sidebarArray[$catArray][ $subMenu ] = array( explode(')', $title[1])[0] );
		}
		else {
			printf("You've forget that line");
			var_dump( $line );
		}

	}
	// Links
	else {

		// Item
		if( $line[0] != ' ' ){

			if( $catArray == "tuto"){


				$arrayTuto = array();
				$t = explode(')', explode("](", explode('[', $line)[1] )[1] )[0];

				$arrayTuto[] = $t;

				
				$step = count(glob("./docs/" . $t . "*"));

				for ($i=1; $i < $step; $i++) { 
					$arrayTuto[] = $t . "_step" . $i;
				}

				$sidebarArray[$catArray][ explode("](", explode('[', $line)[1] )[0] ] = $arrayTuto;


			}
			else{
				$t = explode(')', explode("](", explode('[', $line)[1] )[1] )[0];
				$sidebarArray[$catArray][$subMenu][] = $t;
				$prevTitle = explode("](", explode('[', $line)[1] )[0];	
			}
		}
		// SubItem
		else{
			// Create sub menu
			$indexArray = sizeof($sidebarArray[$catArray][$subMenu]) -1;
			if( !is_array ($sidebarArray[$catArray][$subMenu][$indexArray]) ){ 
				$sidebarArray[$catArray][$subMenu][] = array( 
					"type" => "subcategory",
					"label" => $prevTitle,
					"ids" => array($sidebarArray[$catArray][$subMenu][ $indexArray ], explode(')', explode("](", explode('[', $line)[1] )[1] )[0])
				);
			}
			else{
				$sidebarArray[$catArray][$subMenu][ $indexArray ]["ids"][] = explode(')', explode('(', $line)[1])[0];
			}
		}
	}
}

fclose($fp);

$fp = fopen('./website/sidebars.json', 'w');
fwrite($fp, json_encode($sidebarArray));
fclose($fp);

?>