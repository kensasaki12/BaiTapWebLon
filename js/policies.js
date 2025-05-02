// policies.js
$(document).ready(function() {
    // Mở rộng accordion mặc định
    $('#warrantyCollapse').addClass('show');
    
    // Lưu trạng thái accordion vào localStorage
    $('.accordion-button').click(function() {
        const policyId = $(this).attr('data-bs-target').replace('#', '');
        localStorage.setItem('lastOpenedPolicy', policyId);
    });
    
    // Khôi phục trạng thái accordion
    const lastOpened = localStorage.getItem('lastOpenedPolicy');
    if (lastOpened) {
        $('.accordion-collapse').removeClass('show');
        $(`#${lastOpened}`).addClass('show');
    }
});