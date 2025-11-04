<?php
class Utilisateur {
    protected int $idUtilisateur;
    protected string $nom;
    protected string $email;
    protected string $motDePasse;
    protected string $role;

    public function __construct($id, $nom, $email, $motDePasse, $role = "utilisateur") {
        $this->idUtilisateur = $id;
        $this->nom = $nom;
        $this->email = $email;
        $this->motDePasse = $motDePasse;
        $this->role = $role;
    }

    public function seConnecter() {
        echo "{$this->nom} est connecté.";
    }

    public function seDeconnecter() {
        echo "{$this->nom} est déconnecté.";
    }

    public function mettreAJourProfil($nouveauNom, $nouvelEmail) {
        $this->nom = $nouveauNom;
        $this->email = $nouvelEmail;
    }

    public function getId() { return $this->idUtilisateur; }
    public function getNom() { return $this->nom; }
    public function getEmail() { return $this->email; }
}
?>
