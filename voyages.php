<?php
include 'config.php';
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des voyages - Waygo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f8fa;
            padding: 40px;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        table {
            width: 90%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px 15px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

<h1>🌍 Liste des voyages Waygo</h1>

<?php
$sql = "SELECT voyages.id, users.nom AS utilisateur, destination, date_depart, date_retour, budget, description
        FROM voyages
        JOIN users ON voyages.utilisateur_id = users.id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>
            <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Destination</th>
                <th>Date de départ</th>
                <th>Date de retour</th>
                <th>Budget (€)</th>
                <th>Description</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['utilisateur']}</td>
                <td>{$row['destination']}</td>
                <td>{$row['date_depart']}</td>
                <td>{$row['date_retour']}</td>
                <td>{$row['budget']}</td>
                <td>{$row['description']}</td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "<p style='text-align:center;'>Aucun voyage enregistré pour le moment.</p>";
}
?>

</body>
</html>
