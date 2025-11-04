<?php
include 'config.php';

echo "<h2>Test de connexion MySQL :</h2>";

if ($conn) {
    echo "\nConnexion réussie à la base de données Waygo.";
} else {
    echo "Échec de la connexion.";
}
?>
