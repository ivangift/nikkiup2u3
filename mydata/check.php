<?php

require('cli-common.php');

$category = parse_ini_file('category.ini');
$content = file_get_contents('data.txt');
mb_convert_variables(APP_ENCODING, 'UTF-8', $category, $content);

if($argc > 1) {
	if(!isset($category[$argv[1]])) {
		throw new Exception('Unable to get category');
	}
	define(EXTRACT_CATEGORY, $argv[1]);
}

$text = '';
$sections = explode('|', $content);
foreach($sections as $section) {
	if(empty($section)) continue;
	list($title, $data) = explode(':', $section);
	$keys = explode(',', $data);
	sort($keys, SORT_STRING);
	$filename = array_search($title, $category);
	echo $title.' - '.$filename.' ('.count($keys).')'.PHP_EOL;
	if($filename == EXTRACT_CATEGORY) {
		$names = array();
		$content = file_get_contents('../raw/'.$filename.'.csv');
		mb_convert_variables(APP_ENCODING, 'UTF-8', $content);
		$lines = explode("\n", $content);
		foreach($lines as $line) {
			$cols = explode(',', $line);
			if(empty($cols[1])) continue;
			$names[$cols[1]] = $cols[0];
		}
		$i = 1;
		foreach($keys as $key) {
			echo 'No.'.$key.' '.sprintf('%-20s', $names[$key]);
			if($i % 2 == 0) echo PHP_EOL;
			if($i % 12 == 0) echo PHP_EOL;
			$i++;
		}
		echo PHP_EOL;
	}
	$text .= $title.':'.implode(',', $keys).'|';
}
mb_convert_variables('UTF-8', APP_ENCODING, $text);
file_put_contents('data.txt', $text);

?>