'use strict';

function toggleMenu() {
    var btn = $( '.toggle-menu-btn' ),
        overlay = $( '.menu-overlay' );

    if ( ! btn.length || ! overlay.length ) {
        return;
    }

    btn.on( 'click', function() {
        $( this ).addClass( 'actice' );
        $( document.body ).addClass( 'mobile-open' );
    } );

    overlay.on( 'click', function() {
        btn.removeClass( 'actice' );
        $( document.body ).removeClass( 'mobile-open' );
    } );
}

(function($) {
    $( document ).ready( function() {
        toggleMenu();
    } );

    $(document.body).on('click', '.sidebar-menu ul a', function(e) {
        e.preventDefault();
        var t = $(this);
        // Go to url if not have sub-menu.
        if (!t.siblings().length) {
            window.location.href = t.prop('href');
        }
        if (t.next().hasClass('show')) {
            t.next().removeClass('show');
            t.next().slideUp(200);
        } else {
            t.parent().parent().find('li .sub-menu').removeClass('show');
            t.parent().parent().find('li .sub-menu').slideUp(200);
            t.next().toggleClass('show');
            t.next().slideToggle(200);
        }
    });
})(jQuery);