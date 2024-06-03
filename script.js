document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }

    function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (localStorage.getItem(username)) {
            document.getElementById('registerMessage').innerText = 'Username already exists!';
        } else {
            localStorage.setItem(username, password);
            document.getElementById('registerMessage').innerText = 'Registration successful!';
        }
    }

    function loginUser(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const storedPassword = localStorage.getItem(username);

        if (storedPassword && storedPassword === password) {
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'secured_page.html';
        } else {
            document.getElementById('loginMessage').innerText = 'Invalid username or password!';
        }
    }

    function logoutUser() {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    }

    function checkAccess() {
        const user = sessionStorage.getItem('loggedInUser');
        if (!user) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('securedMessage').innerText = `Welcome, ${user}!`;
        }
    }

    if (document.body.contains(document.getElementById('securedMessage'))) {
        checkAccess();
    }
});
