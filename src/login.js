// État initial
let isLoginForm = false;

// Éléments du DOM
const formHeader = document.querySelector('.form-header h1');
const switchButton = document.getElementById('switchToLogin');
const form = document.getElementById('registerForm');
const switchText = document.querySelector('.form-header h5');

function toggleForm() {
    // Ajout de l'animation de sortie
    form.classList.add('fade-out');
    formHeader.classList.add('fade');

    // Attendre la fin de l'animation de sortie
    setTimeout(() => {
        isLoginForm = !isLoginForm;
        
        if (isLoginForm) {
            formHeader.textContent = 'Ah ! Vous revoilà ';
            switchText.innerHTML = 'Pas encore de compte ? <a href="#" id="switchToRegister">Inscrivez-vous</a>';
            
            form.innerHTML = `
                <div class="form-group">
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" placeholder="Mot de passe" required>
                </div>
                <button type="submit">Se connecter</button>
            `;
            form.onsubmit = handleLogin;
        } else {
            formHeader.textContent = 'Adhérer à ©Akirrally';
            switchText.innerHTML = 'Déjà un compte ? <a href="#" id="switchToLogin">Connectez-vous</a>';
            
            form.innerHTML = `
                <div class="form-group name-row">
                    <div>
                        <input type="text" name="firstName" id="firstName" placeholder="Prénom" required>
                    </div>
                    <div>
                        <input type="text" name="lastName" id="lastName" placeholder="Nom" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" name="email" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" placeholder="Mot de passe" required>
                </div>
                <div class="form-group">
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmer le mot de passe" required>
                </div>
                <div class="form-group checkbox-group">
                    <input type="checkbox" name="terms" id="terms" required>
                    <label for="terms">J'accepte les <a href="#">termes et conditions</a> du site web</label>
                </div>
                <button type="submit">Créer un compte</button>
            `;
            form.onsubmit = handleRegister;
        }

        // Ajout de l'animation d'entrée
        form.classList.remove('fade-out');
        form.classList.add('fade-in');
        formHeader.classList.remove('fade');

        // Mise à jour du gestionnaire d'événements pour le bouton de changement
        document.getElementById(isLoginForm ? 'switchToRegister' : 'switchToLogin')
            .addEventListener('click', toggleForm);

        // Retirer la classe fade-in après l'animation
        setTimeout(() => {
            form.classList.remove('fade-in');
        }, 500);
    }, 300);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        alert('Connexion réussie !');
        this.reset();
    } else {
        alert('Email ou mot de passe incorrect !');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (!terms) {
        alert('Vous devez accepter les termes et conditions !');
        return;
    }
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas !');
        return;
    }

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        alert('Cet email est déjà utilisé !');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Inscription réussie !');
    this.reset();
}

document.getElementById('switchToLogin').addEventListener('click', toggleForm);
form.onsubmit = handleRegister; 