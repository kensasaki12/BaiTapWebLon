// orders.js
$(document).ready(function() {
    // Khởi tạo DataTable
    $('#ordersTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json'
        },
        columnDefs: [
            { orderable: false, targets: [5] } // Tắt sắp xếp cho cột hành động
        ]
    });

    // Xử lý xem chi tiết đơn hàng
    $('.view-order-btn').click(function() {
        const orderId = $(this).data('order-id');
        window.location.href = `order-detail.html?id=${orderId}`;
    });
});