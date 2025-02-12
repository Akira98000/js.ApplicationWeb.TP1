function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginButton = document.querySelector('.button-perso');

    if (currentUser) {
        loginButton.textContent = `Déconnecter ${currentUser.firstName}`;
        loginButton.style.border = '2px solid #ff4444';
        loginButton.addEventListener('click', handleLogout);
    } else {
        loginButton.textContent = 'Se connecter';
        loginButton.href = 'src/login.html';
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Vérifier le statut d'authentification au chargement de la page
document.addEventListener('DOMContentLoaded', checkAuthStatus); 