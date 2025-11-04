<?php
class Compte {
    private int $idCompte;
    private string $type;
    private DateTime $dateCreation;
    private float $solde;
    private int $idUtilisateur;

    public function __construct($idCompte, $type, $idUtilisateur, $soldeInitial = 0) {
        $this->idCompte = $idCompte;
        $this->type = $type;
        $this->dateCreation = new DateTime();
        $this->solde = $soldeInitial;
        $this->idUtilisateur = $idUtilisateur;
    }

    public function crediter(float $montant) {
        $this->solde += $montant;
    }

    public function debiter(float $montant) {
        if ($this->solde >= $montant) {
            $this->solde -= $montant;
        } else {
            echo "Solde insuffisant.";
        }
    }

    public function afficherSolde() {
        echo "Solde du compte {$this->idCompte} : {$this->solde}€";
    }

    public function getSolde() {
        return $this->solde;
    }
}
?>
