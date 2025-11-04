<?php
class Transaction {
    private int $idTransaction;
    private float $montant;
    private DateTime $date;
    private string $type;
    private int $idCompte;

    public function __construct($idTransaction, $montant, $type, $idCompte) {
        $this->idTransaction = $idTransaction;
        $this->montant = $montant;
        $this->type = $type;
        $this->idCompte = $idCompte;
        $this->date = new DateTime();
    }

    public function effectuer() {
        echo "Transaction {$this->idTransaction} de {$this->montant}€ effectuée.";
    }

    public function annuler() {
        echo "Transaction {$this->idTransaction} annulée.";
    }
}
?>
