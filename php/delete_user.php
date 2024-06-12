<?php
include "connect.php";

$id = $_POST["id"];

try {
    $conn->query("UPDATE Payments     SET active = 0 WHERE userId = '$id'");
    $conn->query("UPDATE UserSettings SET active = 0 WHERE userId = '$id'");
    $conn->query("UPDATE User         SET active = 0 WHERE Id     = '$id'");
} catch (mysqli_sql_exception $e) { 
    echo $e->getMessage();
}

$conn->close();
