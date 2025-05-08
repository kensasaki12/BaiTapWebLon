function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('captcha-code').textContent = code;
  return code;
}

let captchaCode = generateCaptcha();

document.getElementById('show-password').addEventListener('change', function () {
  const type = this.checked ? 'text' : 'password';
  document.getElementById('register-password').type = type;
  document.getElementById('register-confirm-password').type = type;
});

document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  const captchaInput = document.getElementById('captcha-input').value.trim();

  const errUsername = document.getElementById('error-username');
  const errEmail = document.getElementById('error-email');
  const errPassword = document.getElementById('error-password');
  const errConfirmPassword = document.getElementById('error-confirm-password');
  const errCaptcha = document.getElementById('error-captcha');

  errUsername.textContent = '';
  errEmail.textContent = '';
  errPassword.textContent = '';
  errConfirmPassword.textContent = '';
  errCaptcha.textContent = '';

  let hasError = false;

  if (!username) {
    errUsername.textContent = 'Vui lòng nhập tên đăng nhập.';
    hasError = true;
  }

  if (!email) {
    errEmail.textContent = 'Vui lòng nhập email.';
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEmail.textContent = 'Email không hợp lệ.';
    hasError = true;
  }

  if (!password) {
    errPassword.textContent = 'Vui lòng nhập mật khẩu.';
    hasError = true;
  } else if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    errPassword.textContent = 'Mật khẩu phải có ít nhất 6 ký tự, gồm chữ và số.';
    hasError = true;
  }

  if (!confirmPassword) {
    errConfirmPassword.textContent = 'Vui lòng nhập lại mật khẩu.';
    hasError = true;
  } else if (password !== confirmPassword) {
    errConfirmPassword.textContent = 'Mật khẩu nhập lại không khớp.';
    hasError = true;
  }

  if (!captchaInput || captchaInput.toUpperCase() !== captchaCode) {
    errCaptcha.textContent = 'Mã xác nhận không đúng.';
    hasError = true;
    captchaCode = generateCaptcha(); 
  }

  if (localStorage.getItem(username)) {
    errUsername.textContent = 'Tên đăng nhập đã tồn tại.';
    hasError = true;
  }

  if (hasError) return;

  localStorage.setItem(username, JSON.stringify({
    email: email,
    password: password
  }));

  window.location.href = 'login.html';
});
