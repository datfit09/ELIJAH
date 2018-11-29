'use strict';

// An/hien menu tren mobile.
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

// Co dinh menu khi cuon trang.
function navFixed() {
    var nav       = jQuery( '.topnav' ),
        navOffset = nav.offset().top;

    jQuery( window ).on( 'scroll', function() {
        var y = jQuery( this ).scrollTop();

        if ( y >= navOffset ) {
            nav.addClass( 'active' );
        } else {
            nav.removeClass( 'active' );
        }
    } );
}

// Di chuyen den section voi link tuong ung.
function navScroll() {
    jQuery( '.menu' ).on( 'click', 'a', function( e ) {
        e.preventDefault();

        // Dat bien.
        var t      = jQuery( this ), // Gan chinh no = gia tri `t`,
            target = t.attr( 'href' ); // Lay gia tri trong thuoc tinh `href`.

        // Neu la `#` thi return, khong lam gi ca.
        if ( '#' === target ) {
            return;
        }
        
        // Neu la nut Home thi cuon len tren dau.
        if ( '#home' === target ) {
            target = document.body;
        }

        // Thay trang thai active cua nut menu. Click vao nut nao nut ay la active.
        t.parent().addClass( 'active' ).siblings().removeClass( 'active' );

        // Cuon den section co ID tuong ung.
        jQuery( document.documentElement, document.body ).stop().animate( {
            scrollTop: jQuery( target ).offset().top
        }, 500 );

        return false;
    } );
}

// Isotope gallery.
function gallery() {
    var iso = $( '.portfolio-content' ).isotope({
        itemSelector: '.por-item',
        layoutMode: 'fitRows'
    });

    var btn = jQuery( '.portfolio-button' );
    btn.on( 'click', function( e ) {
        e.preventDefault();

        var t      = jQuery( this ),
            data   = t.attr( 'data-filter' ),
            output = '';

        t.addClass( 'active' ).siblings().removeClass( 'active' );

        if ( '*' !== data ) {
            output = '.' + data;
        }

        iso.isotope({
            filter: output
        });
    } );
}

(function($) {
    $( document ).ready( function() {
        jQuery( window ).on( 'load', function() {
            navFixed();
            gallery();
        } );

        toggleMenu();
        navScroll();
    } );

    // Menu tren mobile.
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