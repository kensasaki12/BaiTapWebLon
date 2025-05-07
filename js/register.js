document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const errorMessage = document.getElementById('error-message');


    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    if (!username || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'Vui lòng điền đầy đủ thông tin.';
        errorMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Mật khẩu nhập lại không khớp.';
        errorMessage.style.display = 'block';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Email không hợp lệ.';
        errorMessage.style.display = 'block';
        return;
    }

    if (localStorage.getItem(username)) {
        errorMessage.textContent = 'Tên đăng nhập đã tồn tại.';
        errorMessage.style.display = 'block';
        return;
    }

    localStorage.setItem(username, JSON.stringify({
        email: email,
        password: password
    }));

  
    window.location.href = 'login.html';
});
