<?php

$sidebarArray = array("tuto"=> array(), "side"=> array());

$catArray=$subMenu=$subSubMenu=$prevTitle="";

$fp=fopen("./docs/_Sidebar.md", "r+");
while ($line = stream_get_line($fp, 1024 * 1024, "\n"))
{
	// Title
	if (strpos($line, '##') !== false) {
		//$sidebarArray["side"][] = $line;
		if( $line[3] == '['){
			$title = explode("](", explode("[", $line)[1] );

			if($title[0] == "Tutorials"){
				$catArray = "tuto";
			}
			else{
				$catArray = "side";	
			}

			$subMenu = $title[0];

			$sidebarArray[$catArray][ $subMenu ] = array( explode(')', $title[1])[0] );
		}
		else {
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

				var_dump($sidebarArray[$catArray][ $subMenu ]);
				var_dump( $t );

				
				$step = count(glob("./docs/" . $t . "*"));

				for ($i=1; $i < $step; $i++) { 
					$arrayTuto[] = $t . "_step" . $i;
				}

				$sidebarArray[$catArray][ explode("](", explode('[', $line)[1] )[0] ] = $arrayTuto;

				printf("There were %d Files\n\n", $step);

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
				$sidebarArray[$catArray][$subMenu][ $indexArray ] = array( 
					"type" => "subcategory",
					"label" => $prevTitle,
					"ids" => array($sidebarArray[$catArray][$subMenu][ $indexArray ], explode(')', explode("](", explode('[', $line)[1] )[1] )[0])
				);
			}
			else{
				$sidebarArray[$catArray][$subMenu][ $indexArray ]["ids"][] = explode(')', explode("](", explode('[', $line)[1] )[1] )[0];
			}
			//var_dump($line);
		}
	}
}
//		var_dump($sidebarArray);
fclose($fp);



$fp = fopen('./website/sidebars.json', 'w');
fwrite($fp, json_encode($sidebarArray));
fclose($fp);


?>