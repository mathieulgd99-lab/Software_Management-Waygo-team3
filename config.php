<?php

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "waygo_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}

?>
