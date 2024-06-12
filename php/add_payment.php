<?php
session_start();

include "connect.php";
include "util.php";

$json = json_decode($_POST["payload"], true);

$id = $json["userId"];

$name       = $json["name"];
$type       = $json["type"];
$reference  = $json["reference"];
$value      = $json["value"];
$due        = $json["due"];
$occurences = $json["occurences"];

$response = array();

try {
    $name       = $conn->real_escape_string($name);
    $type       = $conn->real_escape_string($type);
    $reference  = $conn->real_escape_string($reference);
    $value      = $conn->real_escape_string($value);
    $due        = $conn->real_escape_string($due);
    $occurences = $conn->real_escape_string($occurences);

    $sql = "INSERT INTO Payments (userId, name, type, reference, value, due, occurrences) VALUES ('$id', '$name', '$type', '$reference', '$value', '$due', '$occurences');";
    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Registro inserido com sucesso.";
    } else {
        $response['success'] = false;
        $response['message'] = $conn->error;
    }
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();