// about.js
$(document).ready(function() {
    // Hiệu ứng cho team member
    $('.team-member').hover(
        function() {
            $(this).find('img').addClass('shadow-lg');
        },
        function() {
            $(this).find('img').removeClass('shadow-lg');
        }
    );

    // Counter animation
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});