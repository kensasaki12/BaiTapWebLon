// 404.js
$(document).ready(function() {
    // Đếm ngược về trang chủ
    let count = 5;
    const countdown = setInterval(function() {
        $('#countdown').text(count);
        count--;
        if (count < 0) {
            clearInterval(countdown);
            window.location.href = '../index.html';
        }
    }, 1000);

    // Thêm hiệu ứng cho nút
    $('.btn-home').hover(
        function() {
            $(this).find('i').addClass('fa-bounce');
        },
        function() {
            $(this).find('i').removeClass('fa-bounce');
        }
    );
});