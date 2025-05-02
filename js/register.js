document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Lưu thông tin vào localStorage
    localStorage.setItem(username, JSON.stringify({
        password: password,
        name: name // (nếu có)
    }));
    window.location.href = 'login.html';
});