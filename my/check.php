<?php

require('cli-common.php');

$CATEGORY_ARRAY = array(
	1 => '发型',
	2 => '连衣裙',
	3 => '外套',
	4 => '上装',
	5 => '下装',
	6 => '袜子',
	7 => '鞋子',
	8 => '饰品',
	9 => '妆容',
	10 => '萤光之灵',
);
$content = file_get_contents('data.txt');
mb_convert_variables(APP_ENCODING, 'UTF-8', $CATEGORY_ARRAY, $content);

if($argc > 1) {
	// $match = array_filter($CATEGORY_ARRAY, function($value) use (&$argv) {
	// 	return $value[0] == $argv[1];
	// });
	if(!isset($CATEGORY_ARRAY[$argv[1]])) {
		throw new Exception('Unable to get category');
	}
	define(SELECT_CATEGORY_ID, $argv[1]);
}

$output = '';
$num = 1;
$sections = explode('|', $content);
foreach($sections as $section) {
	if(empty($section)) continue;
	list($title, $data) = explode(':', $section);
	$keys = explode(',', $data);
	sort($keys, SORT_NUMERIC);
	echo $num.'. '.$title.' ('.count($keys).')'.PHP_EOL;
	if($title == $CATEGORY_ARRAY[SELECT_CATEGORY_ID]) {
		$names = array();
		if(($fp = fopen('../nikkistats/raw/full.csv', 'r')) !== FALSE) {
			while(($data = fgetcsv($fp, 1024, ',')) !== FALSE) {
				mb_convert_variables(APP_ENCODING, 'UTF-8', $data);
				if(empty($data[0]) || substr($data[0], 0, strlen(SELECT_CATEGORY_ID)) != SELECT_CATEGORY_ID) continue;
				$names[$data[0]] = $data[1];
			}
		}
		$i = 1;
		foreach($keys as $key) {
			$idx = SELECT_CATEGORY_ID.sprintf('%04s', $key);
			echo sprintf('%-30s', 'No.'.$key.' '.$names[$idx]);
			if($i % 2 == 0) echo PHP_EOL;
			if($i % 12 == 0) echo PHP_EOL;
			$i++;
		}
		echo PHP_EOL;
	}
	$output .= $title.':'.implode(',', $keys).'|';
	$num++;
}
mb_convert_variables('UTF-8', APP_ENCODING, $output);
file_put_contents('data.txt', $output);

?>