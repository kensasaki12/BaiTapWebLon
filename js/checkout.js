document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thanh toán thành công!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
});