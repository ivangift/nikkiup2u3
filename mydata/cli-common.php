<?php

if(substr(PHP_OS, 0, 3) == 'WIN') {
	$output = exec('chcp');
	if(!preg_match('/\d+$/', $output, $match)) {
		throw new Exception('Unable to get codepage');
	}
	mb_internal_encoding('CP'.$match[0]);
}
else {
	$output = exec('locale charmap');
	mb_internal_encoding($output);
}
define('APP_ENCODING', mb_internal_encoding());

function exceptionHandler($e) {
	echo $e->getMessage();
}
set_exception_handler('exceptionHandler');

?>