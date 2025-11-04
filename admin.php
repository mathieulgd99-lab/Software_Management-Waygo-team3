<?php
require_once 'Utilisateur.php';

class Admin extends Utilisateur {
    private int $niveauAcces;

    public function __construct($id, $nom, $email, $motDePasse, $niveauAcces = 1) {
        parent::__construct($id, $nom, $email, $motDePasse, "admin");
        $this->niveauAcces = $niveauAcces;
    }

    public function gererUtilisateurs() {
        echo "L'administrateur {$this->nom} gère les utilisateurs.";
    }

    public function supprimerCompte($compteId) {
        echo "Compte $compteId supprimé par l'administrateur {$this->nom}.";
    }

    public function ajouterDonnees($donnees) {
        echo "Ajout de données par {$this->nom}.";
    }
}
?>
