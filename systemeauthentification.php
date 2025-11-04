<?php
require_once 'Utilisateur.php';

class SystemeAuthentification {
    private array $utilisateurs = [];

    public function ajouterUtilisateur(Utilisateur $user) {
        $this->utilisateurs[] = $user;
    }

    public function verifierIdentifiants($email, $motDePasse) {
        foreach ($this->utilisateurs as $user) {
            if ($user->getEmail() === $email) {
                echo "Authentification réussie pour {$user->getNom()}";
                return $user;
            }
        }
        echo "Email ou mot de passe incorrect.";
        return null;
    }

    public function creerSession(Utilisateur $user) {
        session_start();
        $_SESSION['utilisateur'] = $user->getId();
        echo "Session créée pour {$user->getNom()}";
    }

    public function detruireSession() {
        session_start();
        session_destroy();
        echo "Session détruite.";
    }
}
?>
