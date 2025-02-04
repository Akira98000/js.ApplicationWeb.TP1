let isLoginForm = false;

const formHeader = document.querySelector('.form-header h1');
const switchButton = document.getElementById('switchToLogin');
const form = document.getElementById('registerForm');
const switchText = document.querySelector('.form-header h5');

function toggleForm() {
    form.classList.add('fade-out');
    formHeader.classList.add('fade');

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

        form.classList.remove('fade-out');
        form.classList.add('fade-in');
        formHeader.classList.remove('fade');

        document.getElementById(isLoginForm ? 'switchToRegister' : 'switchToLogin')
            .addEventListener('click', toggleForm);

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
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.reset();
        window.location.href = '/index.html';
    } else {
        form.innerHTML = `
            <div class="form-group">
                <p class="error-message">Email ou mot de passe incorrect !</p>
                <input type="email" name="email" id="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" name="password" id="password" placeholder="Mot de passe" required>
            </div>
            <button type="submit">Se connecter</button>
        `;
        form.onsubmit = handleLogin;
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

    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    if (!terms) {
        const termsGroup = document.querySelector('.checkbox-group');
        termsGroup.insertAdjacentHTML('beforebegin', '<p class="error-message">Vous devez accepter les termes et conditions !</p>');
        return;
    }

    if (password !== confirmPassword) {
        const passwordInput = document.getElementById('password');
        passwordInput.insertAdjacentHTML('beforebegin', '<p class="error-message">Les mots de passe ne correspondent pas !</p>');
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
        const emailInput = document.getElementById('email');
        emailInput.insertAdjacentHTML('beforebegin', '<p class="error-message">Cet email est déjà utilisé !</p>');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    form.innerHTML = `
        <p style="color: green; text-align: center;">Inscription réussie ! Redirection...</p>
    `;
    
    setTimeout(() => {
        toggleForm(); 
    }, 2000);
}

document.getElementById('switchToLogin').addEventListener('click', toggleForm);
form.onsubmit = handleRegister; 