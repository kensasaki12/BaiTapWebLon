document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Reset thông báo lỗi
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Mật khẩu nhập lại không khớp.';
        errorMessage.style.display = 'block';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        errorMessage.textContent = 'Email không hợp lệ.';
        errorMessage.style.display = 'block';
        return;
    }

    // Lưu thông tin vào localStorage
    localStorage.setItem(username, JSON.stringify({
        email: email,
        password: password
    }));

    window.location.href = 'login.html';
});
