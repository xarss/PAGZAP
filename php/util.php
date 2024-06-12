<?php
function generateUniqueId($conn) {
    $digits = '123456789';
    $length = 6;
    $id = '';

    do {
        $id = '';
        for ($i = 0; $i < $length; $i++) {
            $id .= $digits[rand(0, strlen($digits) - 1)];
        }
        
        $stmt = $conn->query("SELECT id FROM Users WHERE id = '$id'");
    } while ($stmt->num_rows > 0);

    return $id;
}