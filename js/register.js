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


document.getElementById('show-password').addEventListener('change', function() {
    const type = this.checked ? 'text' : 'password';
    document.getElementById('register-password').type = type;
    document.getElementById('register-confirm-password').type = type;
});


function validateField(fieldId, errorId, validationFn) {
    const value = document.getElementById(fieldId).value.trim();
    const errorElement = document.getElementById(errorId);
    const { isValid, message } = validationFn(value);

    if (!isValid) {
        errorElement.textContent = message;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}


const validations = {
    username: (value) => {
        if (!value) return { isValid: false, message: 'Vui lòng nhập tên đăng nhập.' };
        if (localStorage.getItem(value)) return { isValid: false, message: 'Tên đăng nhập đã tồn tại.' };
        return { isValid: true, message: '' };
    },
    email: (value) => {
        if (!value) return { isValid: false, message: 'Vui lòng nhập email.' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { isValid: false, message: 'Email không hợp lệ.' };
        return { isValid: true, message: '' };
    },
    password: (value) => {
        if (!value) return { isValid: false, message: 'Vui lòng nhập mật khẩu.' };
        if (value.length < 6 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
            return { isValid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự, gồm chữ và số.' };
        }
        return { isValid: true, message: '' };
    },
    confirmPassword: (value) => {
        const password = document.getElementById('register-password').value;
        if (!value) return { isValid: false, message: 'Vui lòng nhập lại mật khẩu.' };
        if (value !== password) return { isValid: false, message: 'Mật khẩu nhập lại không khớp.' };
        return { isValid: true, message: '' };
    },
    captcha: (value) => {
        if (value && value.toUpperCase() !== captchaCode) {
            return { isValid: false, message: 'Mã xác nhận không đúng.' };
        }
        return { isValid: true, message: '' };
    }
};


document.getElementById('register-username').addEventListener('blur', function() {
    validateField('register-username', 'error-username', validations.username);
});

document.getElementById('register-email').addEventListener('blur', function() {
    validateField('register-email', 'error-email', validations.email);
});

document.getElementById('register-password').addEventListener('blur', function() {
    validateField('register-password', 'error-password', validations.password);

    validateField('register-confirm-password', 'error-confirm-password', validations.confirmPassword);
});

document.getElementById('register-confirm-password').addEventListener('blur', function() {
    validateField('register-confirm-password', 'error-confirm-password', validations.confirmPassword);
});

document.getElementById('captcha-input').addEventListener('blur', function() {
    validateField('captcha-input', 'error-captcha', validations.captcha);
});


document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();


    const isUsernameValid = validateField('register-username', 'error-username', validations.username);
    const isEmailValid = validateField('register-email', 'error-email', validations.email);
    const isPasswordValid = validateField('register-password', 'error-password', validations.password);
    const isConfirmPasswordValid = validateField('register-confirm-password', 'error-confirm-password', validations.confirmPassword);
    const isCaptchaValid = validateField('captcha-input', 'error-captcha', validations.captcha);

    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isCaptchaValid) {
        return;
    }


    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;


    localStorage.setItem(username, JSON.stringify({
        email: email,
        password: password
    }));


    window.location.href = 'login.html';
});
