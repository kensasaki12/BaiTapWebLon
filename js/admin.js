// admin.js
$(document).ready(function() {
    // Toggle sidebar
    $('#sidebarToggle').click(function() {
        $('body').toggleClass('sidebar-toggled');
        $('.sidebar').toggleClass('toggled');
    });

    // Khởi tạo DataTable
    $('.data-table').DataTable({
        responsive: true,
        dom: '<"top"lf>rt<"bottom"ip>',
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json'
        }
    });

    // Xử lý thống kê
    updateStats();
    
    // Chart.js cho biểu đồ
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
            datasets: [{
                label: 'Doanh thu (triệu)',
                data: [120, 190, 170, 220, 250, 300],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
});

function updateStats() {
    $.get('/api/admin/stats', function(data) {
        $('#totalOrders').text(data.totalOrders);
        $('#totalRevenue').text(data.totalRevenue.toLocaleString() + '₫');
        $('#totalProducts').text(data.totalProducts);
        $('#totalCustomers').text(data.totalCustomers);
    });
}