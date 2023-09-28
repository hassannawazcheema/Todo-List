function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordBtn = document.getElementById('showPasswordBtn');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = 'Show';
    }
}

document.getElementById('showPasswordBtn').addEventListener('click', togglePasswordVisibility);

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'user1234') {
        window.location.href = 'Todo.html';

    }
    else {
        alert('Login failed. Please check your Email or Password.');
    }
});
