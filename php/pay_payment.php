<?php
session_start();

include "connect.php";
include "util.php";

$id = $_POST["paymentId"];

$response = array();

try {
    $id = $conn->real_escape_string($id);

    $sql = "UPDATE Payments set paid = 1 where id = '$id';";
    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Registro atualizado (pago) com sucesso.";
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