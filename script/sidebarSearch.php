<?php

/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 **/

/**
 * This script will add the SearchBar entry
 * into the search engine result 
 **/

// Get existing json search result
// and transform it in JSON format
$json = json_decode(file_get_contents("./website/static/database/index.json"), true);

$fp=fopen("./docs/_Sidebar.md", "r+");
while ($line = stream_get_line($fp, 1024 * 1024, "\n")) {

	$item = array("tag" => "Sidebar", "title" => "", "url" => "");

	$item["title"] = explode("[", explode("](", $line)[0])[1];
	$item["url"] = explode(")", explode("](", $line)[1])[0];

	$json[] = $item;
}

fclose($fp);

file_put_contents('./website/static/database/index.json', json_encode($json));

//fclose($fp);
//var_dump( $sidebarArray );

?>