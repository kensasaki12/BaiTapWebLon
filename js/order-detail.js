// order-detail.js
$(document).ready(function() {
    // Lấy ID đơn hàng từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if (!orderId) {
        window.location.href = 'orders.html';
        return;
    }

    // Load chi tiết đơn hàng
    loadOrderDetails(orderId);
    
    // Xử lý nút in hóa đơn
    $('#printInvoice').click(function() {
        window.print();
    });
    
    // Xử lý đặt lại
    $('#reorderBtn').click(function() {
        if (confirm('Bạn muốn đặt lại đơn hàng này?')) {
            // Logic đặt lại
            alert('Đã thêm sản phẩm vào giỏ hàng!');
            window.location.href = '../cart.html';
        }
    });
});

function loadOrderDetails(orderId) {
    // Giả lập API
    const mockOrder = {
        id: orderId,
        date: '2025-06-15',
        status: 'Đã giao',
        total: 450000000,
        items: [
            { name: 'Máy tiện CNC T-1000', quantity: 1, price: 450000000 }
        ],
        shippingAddress: {
            name: 'Nguyễn Văn A',
            address: 'Số 1, đường ABC, Hà Nội',
            phone: '0987654321'
        },
        note: 'Giao hàng giờ hành chính',
        deliveryDate: '2025-06-20'
    };

    // Hiển thị thông tin đơn hàng
    $('#orderId').text(mockOrder.id);
    $('#orderDate').text(new Date(mockOrder.date).toLocaleDateString());
    $('#orderStatus').text(mockOrder.status);
    $('#orderTotal').text(mockOrder.total.toLocaleString() + '₫');
    
    // Hiển thị sản phẩm
    const $items = $('#orderItems');
    $items.empty(); // Xóa dữ liệu mẫu
    
    mockOrder.items.forEach(item => {
        $items.append(`
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toLocaleString()}₫</td>
                <td>${(item.quantity * item.price).toLocaleString()}₫</td>
            </tr>
        `);
    });
    
    // Hiển thị địa chỉ
    $('.card-body p:first').html(`<strong>${mockOrder.shippingAddress.name}</strong>`);
    $('.card-body p:nth(1)').text(mockOrder.shippingAddress.address);
    $('.card-body p:nth(2)').text(`Điện thoại: ${mockOrder.shippingAddress.phone}`);
    
    // Hiển thị thông tin bổ sung
    $('.card-body p:contains("Ghi chú")').html(`<strong>Ghi chú:</strong> ${mockOrder.note}`);
    $('.card-body p:contains("Ngày giao")').html(`<strong>Ngày giao:</strong> ${new Date(mockOrder.deliveryDate).toLocaleDateString()}`);
}