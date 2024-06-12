<?php
session_start();

include "connect.php";
include "util.php";

$json = json_decode($_POST["payload"], true);

$id         = $json["id"];
$name       = $json["name"];
$type       = $json["type"];
$reference  = $json["reference"];
$value      = $json["value"];
$due        = $json["due"];
$occurences = $json["occurences"];

$response = array();

try {
    $id         = $conn->real_escape_string($id);
    $name       = $conn->real_escape_string($name);
    $type       = $conn->real_escape_string($type);
    $reference  = $conn->real_escape_string($reference);
    $value      = $conn->real_escape_string($value);
    $due        = $conn->real_escape_string($due);
    $occurences = $conn->real_escape_string($occurences);

    $sql = "UPDATE Payments set name = '$name', type = '$type', reference = '$reference', value = '$value', due = '$due', occurrences = '$occurences' where id = '$id';";
    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Registro atualizado com sucesso.";
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