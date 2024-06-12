<?php
session_start();

include "connect.php";
include "util.php";

$json = json_decode($_POST["payload"], true);

$username = $json["username"];
$email    = $json["email"];
$phoneNum = $json["phoneNumber"];
$pass     = $json["hashedPass"];

$response = array();
$response['log'] = "";

try {
    $id       = generateUniqueId($conn);
    $username = $conn->real_escape_string($username);
    $email    = $conn->real_escape_string($email);
    $phoneNum = $conn->real_escape_string($phoneNum);
    $pass     = $conn->real_escape_string($pass);

    $result = $conn->query("SELECT * FROM Users WHERE username = '$username'");
    if ($result->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = "This username is already in use";

        header('Content-Type: application/json');
        echo json_encode($response);

        $conn->close();
        return;
    }

    $result = $conn->query("SELECT * FROM Users WHERE email = '$email'");
    if ($result->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = "There is already an account with this email";

        header('Content-Type: application/json');
        echo json_encode($response);

        $conn->close();
        return;
    }

    $result = $conn->query("SELECT * FROM Users WHERE phoneNumber = '$phoneNum'");
    if ($result->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = "There is already an account with this phone number";

        header('Content-Type: application/json');
        echo json_encode($response);

        $conn->close();
        return;
    }

    $sql = "INSERT INTO Users VALUES ('$id', '$username', '$email', '$phoneNum', '$pass', '1')";
    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Registro inserido com sucesso.";

        $_SESSION["user_id"] = $id;
    } else {
        $response['success'] = false;
        $response['message'] = $conn->error;
    }
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "An unexpected error occurred";
    $response['log'] = $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();