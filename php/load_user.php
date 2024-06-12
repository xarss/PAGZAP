<?php
session_start();

include "connect.php";

$response = array();

if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];

    try {
        $user = $conn->query("SELECT * from Users where id = '$user_id'")->fetch_assoc();
    } catch (Exception $e) {
        $response["user"] = "";
        $response["message"] = $e->getMessage();
        $response["success"] = false;

        echo json_encode($response);

        exit();
    }

    $response["success"] = true;
    $response["user"]    = $user;
    $response["message"] = "Login successfull";
} else {
    $response["user"]    = null;
    $response["success"] = false;
    $response["message"] = "Not logged in";
}

echo json_encode($response);