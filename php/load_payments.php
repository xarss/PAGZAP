<?php
session_start();

include "connect.php";

$response = array();

if (isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];

    try {
        $result = $conn->query("SELECT * from Payments where userId = '$user_id' and active = 1");
        if ($result->num_rows > 0) {
            $rows = [];
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $payments = $rows;
        } else {
            $payments = [];
        }
    } catch (Exception $e) {
        $response["payments"] = "";
        $response["message"]  = $e->getMessage();
        $response["success"]  = false;

        echo json_encode($response);
        exit();
    }

    $response["success"]  = true;
    $response["payments"] = $payments;
    $response["message"]  = "Success";
} else {
    $response["payments"] = null;
    $response["success"]  = false;
    $response["message"]  = "Not logged in";
}

echo json_encode($response);