// change-password.js
$(document).ready(function() {
    // Toggle hiển thị mật khẩu
    $('.toggle-password').click(function() {
        const input = $(this).siblings('input');
        const icon = $(this).find('i');
        
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    // Kiểm tra độ mạnh mật khẩu
    $('#newPassword').on('input', function() {
        const password = $(this).val();
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        
        updateStrengthIndicator(strength);
    });
    
    // Xử lý form
    $('#changePasswordForm').submit(function(e) {
        e.preventDefault();
        
        const currentPass = $('#currentPassword').val();
        const newPass = $('#newPassword').val();
        const confirmPass = $('#confirmPassword').val();
        
        // Validate
        if (newPass !== confirmPass) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        
        if (newPass.length < 8) {
            alert('Mật khẩu phải có ít nhất 8 ký tự!');
            return;
        }
        
        // Giả lập gửi yêu cầu
        simulateChangePassword(currentPass, newPass);
    });
});

function updateStrengthIndicator(strength) {
    const $indicator = $('.password-strength-bar');
    let width = strength * 20;
    let color = 'bg-danger';
    
    if (strength >= 4) color = 'bg-success';
    else if (strength >= 2) color = 'bg-warning';
    
    $indicator.css('width', width + '%').removeClass('bg-danger bg-warning bg-success').addClass(color);
}

function simulateChangePassword(currentPass, newPass) {
    // Giả lập delay call API
    setTimeout(() => {
        // Giả sử mật khẩu hiện tại là "lobeo123"
        if (currentPass === 'lobeo123') {
            alert('Đổi mật khẩu thành công!');
            $('#changePasswordForm')[0].reset();
            $('.password-strength-bar').css('width', '0%');
        } else {
            alert('Mật khẩu hiện tại không đúng!');
        }
    }, 1000);
}