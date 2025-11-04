<?php
require_once 'classes/Utilisateur.php';
require_once 'classes/Admin.php';
require_once 'classes/Compte.php';
require_once 'classes/Transaction.php';
require_once 'classes/SystemeAuthentification.php';

$auth = new SystemeAuthentification();

// Création d’utilisateurs
$user1 = new Utilisateur(1, "Lucas", "lucas@mail.com", "1234");
$admin = new Admin(2, "Admin", "admin@mail.com", "adminpass", 2);

$auth->ajouterUtilisateur($user1);
$auth->ajouterUtilisateur($admin);

$auth->verifierIdentifiants("lucas@mail.com", "1234");

// Création de compte et transactions
$compte = new Compte(101, "voyage", $user1->getId(), 500);
$compte->crediter(200);
$compte->afficherSolde();

$transaction = new Transaction(1, 150, "débit", 101);
$transaction->effectuer();
?>
