<?php
session_start();

include "connect.php";

$json = json_decode($_POST["payload"], true);

$userdata = $json['userdata'];
$pass     = $json['hashedPass'];

$response = array();

$userdata = $conn->real_escape_string($userdata);
$pass = $conn->real_escape_string($pass);

$sql = "SELECT * FROM Users WHERE email='$userdata' or username='$userdata'";
$result = $conn->query($sql);

if ($result -> num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($pass === $row['hashedPassword']) {
        $response['success'] = true;
        $response['message'] = "Login successful.";

        $_SESSION["user_id"] = $row["id"];
    } else {
        $response['success'] = false;
        $response['message'] = "Incorrect password.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "User or Email not found.";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
