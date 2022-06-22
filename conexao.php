<?php

$host = "localhost";
$user = "root";
$pass = "123456";
$dbname = "eficienciaenergetica";
$port = "3306";

$conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $pass);