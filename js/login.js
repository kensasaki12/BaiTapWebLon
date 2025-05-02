document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorElement = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;

            // Kiểm tra dữ liệu đầu vào
            if (!username || !password) {
                showError('Vui lòng nhập đầy đủ thông tin');
                return;
            }

            try {
                const userData = JSON.parse(localStorage.getItem(username));

                if (userData && userData.password === password) {
                    // Lưu thông tin đăng nhập
                    sessionStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        name: userData.name || username
                    }));

                    // Chuyển hướng về trang chủ
                    window.location.href = '../html/index.html';
                } else {
                    showError('Tên đăng nhập hoặc mật khẩu không đúng');
                }
            } catch (e) {
                console.error("Lỗi:", e);
                showError('Đã xảy ra lỗi khi đăng nhập');
            }s
        });
    }

    function showError(message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');

            setTimeout(() => {
                errorElement.classList.add('d-none');
            }, 5000);
        } else {
            alert(message);
        }
    }
});