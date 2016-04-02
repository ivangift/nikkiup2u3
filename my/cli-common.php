<?php

$encoding = exec('locale charmap 2>&1', $output, $retval);
if($retval) {
	$output = exec('chcp');
	if(!preg_match('/\d+$/', $output, $match)) {
		throw new Exception('Unable to get codepage');
	}
	$encoding = 'CP'.$match[0];
}
mb_internal_encoding($encoding);
define('APP_ENCODING', mb_internal_encoding());

function inputMask($prompt) {
	exec('stty --version 2>&1', $output, $retval);
	// no stty, try powershell
	if($retval) {
		$password = exec('powershell -Command $passwd = read-host "'.$prompt.'" -AsSecureString ; [System.Runtime.InteropServices.marshal]::PtrToStringAuto([System.Runtime.InteropServices.marshal]::SecureStringToBSTR($passwd))');
	}
	// use stty
	else {
		echo $prompt.': ';
		exec('stty -echo');
		$password = fgets(STDIN);
		exec('stty echo');
	}
	return rtrim($password);
}

function exceptionHandler($e) {
	echo $e->getMessage();
}
set_exception_handler('exceptionHandler');

?>