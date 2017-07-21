<?php
session_start();
require_once dirname(__FILE__) . "/core/bootstrap.php";
Core::Response();
// echo 'xxxxx';
// fastcgi_finish_request();
// sleep(5);
// file_put_contents('b.txt', 'albertshen');