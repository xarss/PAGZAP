<?php
$servername = "192.168.0.16";
$username = "root";
$password = ""; 
$database = 'pagzap';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
