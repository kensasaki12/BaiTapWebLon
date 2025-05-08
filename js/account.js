
$(document).ready(function() {
    $('#accountForm').submit(function(e) {
        e.preventDefault();
   
        const phone = $('#phone').val();
        if (!/^(0|\+84)\d{9,10}$/.test(phone)) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }

        $.ajax({
            url: '/api/update-profile',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert('Cập nhật thông tin thành công!');
            },
            error: function() {
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            }
        });
    });

    $('.list-group-item').click(function() {
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });
});
