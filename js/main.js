/*--------------------------------------------------------------*/
/*-- JS Document --*/
/*--------------------------------------------------------------*/
(function($) {
    
$(document).bind("mobileinit", function(){
        $.mobile.autoInitializePage = false;
        $(window).bind('orientationchange', nav_bar._orientationHandler);
    });
    var nav_bar = {
        button: ".navbar-toggle",
        data:'target',
        main:"#main",
        is_load: false,
        target: false,
        isShowData:'isShow',
        isBlock: false,
        settings: {
                height: document,
                main: false,
                width: false,
                speed: 300,
                left: false
        },
        init: function(){
                nav_bar.bind();

                nav_bar.target =  $(nav_bar.getButton().data(nav_bar.data));
                var b =  nav_bar.settings.speed;
                nav_bar.setSpeed(0);
                nav_bar.hide();
                nav_bar.setSpeed(b);

        },
        bind: function(){
                $(nav_bar.button).click(nav_bar.click);

        },
        _orientationHandler: function(){
                nav_bar.target =  $(nav_bar.getButton().data(nav_bar.data));
                var b =  nav_bar.settings.speed;
                nav_bar.setSpeed(0);
                if(nav_bar.isShow()){
                        nav_bar.getButton().trigger('click');
                }
                nav_bar.setSpeed(b);
        },
        setSpeed: function(settings){
                 nav_bar.settings.speed = settings;
        },
        isShow: function(){
                return nav_bar.target.data(nav_bar.isShowData);
        },
        getMain: function(){
                return $(nav_bar.main);
        },
        getButton: function(){
                return $(nav_bar.button);
        },
        animate: function(margin,target_left,callback){

                if(margin > 0){
                        margin = "-"+margin;
                }
                margin = margin+"px";

                nav_bar.getMain().animate({"margin-left": margin},
                nav_bar.settings.speed,function(){
                         nav_bar.isBlock = false;
                });
                nav_bar.target.show().animate({
                        'right': target_left
                },nav_bar.settings.speed,function(){
                        nav_bar.isBlock = false;
                        if($.isFunction(callback)){
                                callback();
                        }
                });
        },
        show: function(){
                 nav_bar.target.data(nav_bar.isShowData,true);
                 nav_bar.target.hide().css({
                         'height': nav_bar.target.height(),
                         'right': "-"+nav_bar.settings.width+"px",
                         'width': nav_bar.settings.width
                 });
                nav_bar.animate(nav_bar.settings.width,  0);
                $('#main').addClass('mobile-nav');
                $('#header').css( 'position', 'static' );
                $('#main').css({
                         'height' : nav_bar.target.height(),
                         'overflow' : 'hidden'
                });
        },
        hide: function(){
                nav_bar.target.removeData(nav_bar.isShowData);
                nav_bar.animate(0,"-"+nav_bar.settings.width+"px",function(){
                        nav_bar.target.hide()
                        .css({height: 0,'left': nav_bar.settings.left, 'width': 0})
                        .removeAttr('style');
                         nav_bar.target.data('show-init',false);
                         $('#main').removeAttr('style').removeClass('mobile-nav');
                });
        },
        /* Show */
        swipeLeft: function(e){
                e.preventDefault();
                if(nav_bar.getButton().is(':visible')){
                        nav_bar.target = $(nav_bar.getButton().data(nav_bar.data));
                        if(nav_bar.target && !nav_bar.isShow()){
                                nav_bar.initAnimate();
                                nav_bar.show();
                        }
                }
                nav_bar.isBlock = false;
        },
        /* Hide */
        swipeRight: function(e){
                e.preventDefault();
                if(nav_bar.getButton().is(':visible')){
                        nav_bar.target = $(nav_bar.getButton().data(nav_bar.data));
                        if(nav_bar.target && nav_bar.isShow()){
                                nav_bar.initAnimate();
                                nav_bar.hide();
                        }
                }
                 nav_bar.isBlock = false;
        },
        initAnimate: function(){
                        nav_bar.settings.width = nav_bar.target.width();
                        nav_bar.settings.main  = nav_bar.getMain().width();
                        nav_bar.settings.left  = nav_bar.target.offset().left;
                        return this;
        },
        click: function(e){
                nav_bar.target = $($(this).data(nav_bar.data));
                if(nav_bar.target){
                        if(nav_bar.initAnimate().isShow()){
                                nav_bar.hide();
                        }else{
                                nav_bar.show();
                        }
                }
                e.preventDefault();
                return false;
        }
    };                                                                              
    
    $(document).ready(function() {
    
        nav_bar.init();  
    
        $('#back-to-top').hide(); 
        
        $('.visitors li').equalHeights();
        
        function carousel_pagin() {
            var pagin_width = $(".slider").find(".owl-pagination").width();
            var main_slider_width = $(".main-slider").find(".owl-controls").width();
            var pagin_main_width = $(".main-slider").find(".owl-pagination").width();
            $(".slider").find(".owl-prev").css({
                marginRight: pagin_width/2 + 16
            });
            $(".slider").find(".owl-next").css({
                marginLeft: pagin_width/2 + 16
            });
            $(".main-slider").find(".owl-pagination").css({
                marginLeft: main_slider_width/2 - (pagin_main_width/2 + 10)
            });
        }
        /*------------------------------------------------------*/
        /*---- Placeholder IE9 -----*/
        /*------------------------------------------------------*/ 
                
        $('input, textarea').placeholder();    
                        
        /*------------------------------------------------------*/
        /*---- Window Resize -----*/
        /*------------------------------------------------------*/
        $( window ).resize(function() {

            $('.benefits li').css('height','auto');
            $('.benefits li').equalHeights();
            
            carousel_pagin();
            setTimeout(carousel_pagin, 50);                          

        });
        
        /*------------------------------------------------------*/
        /*---- Window Scroll -----*/
        /*------------------------------------------------------*/
        
        $(window).scroll(function(){
             if ($(this).scrollTop() > 60) {
                $('.main-slider').addClass('small-margin');
                $('#back-to-top').fadeIn();
                $('.header-info').addClass('header-info-hover');
                $('.header-menu').addClass('fixed-header');
            } else {
                $('.main-slider').removeClass('small-margin');
	            $('#back-to-top').fadeOut();
                $('.header-info').removeClass('header-info-hover');
                $('.header-menu').removeClass('fixed-header');
            }
            carousel_pagin(); 
        });
        
        /*------------------------------------------------------*/
        /*---- Back to Top -----*/
        /*------------------------------------------------------*/ 
                
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('body,html').animate({
                    scrollTop: 0
            }, 1000);
            return false;
        });
        
        /*------------------------------------------------------*/
        /*---- DropDown-menu -----*/
        /*------------------------------------------------------*/
        
        $(".dropdown").hover( 
            function() { $(this).children('.dropdown-content').stop(true, true).slideDown(); },
            function() { $(this).children('.dropdown-content').stop(true, true).hide(); }
        );
        $('.dropdown').mouseover( function(){
            if (!($(this).hasClass('dropdown-hover'))) { $(this).addClass('dropdown-hover') }    
        });
        $('.dropdown').mouseout( function(){
            if ($(this).hasClass('dropdown-hover')) { $(this).removeClass('dropdown-hover') }    
        });
        $('.dropdown').click(function() {
            if ($(this).hasClass('dropdown-hover')) { 
                $(this).removeClass('dropdown-hover'); 
            } else {
                $(this).addClass('dropdown-hover');
            }
            if ($(this).children('.dropdown-content').is(":hidden")) {
                $(this).children('.dropdown-content').slideDown("slow");
            } else {
                $(this).children('.dropdown-content').slideUp("slow");
            }
        }); 
        $('.search-dropdown-link').click(function() { 
            $(this).parent('.search-dropdown').toggleClass('search-hover');   
            if ($(this).parent('.search-dropdown').children('.dropdown-content').is(":hidden")) {
                $(this).parent('.search-dropdown').children('.dropdown-content').slideDown("slow");
            } else {
                $(this).parent('.search-dropdown').children('.dropdown-content').slideUp("slow");
            }
        });
        $('.dropdown-mobile-menu').click(function() {   
            if ($(this).parent('.dropdown-mobile-link').children('.dropdown-content').is(":hidden")) {
                $(this).parent('.dropdown-mobile-link').children('.dropdown-content').slideDown("slow");
            } else {
                $(this).parent('.dropdown-mobile-link').children('.dropdown-content').slideUp("slow");
            }
        });
        
        /*------------------------------------------------------*/
        /*---- owlCarousel -----*/
        /*------------------------------------------------------*/
        
        var owl = $("#owl-demo");
        
        owl.owlCarousel({
            autoPlay: 4000,
            items : 4, //4 items above 1000px browser width
            itemsDesktop : [1170,4], //4 items between 1170px and 768px
            itemsDesktopSmall : [767,3], // betweem 767px and 401px
            itemsTablet: [600,3], //2 items between 400 and 0
            itemsMobile: [400,2], //2 items between 400 and 0
            pagination: true,
            navigation: true,
            navigationText: ["<i class='demo-icon icon-left-open-mini'></i>","<i class='demo-icon icon-right-open-mini'></i>"]
        });
        
        $("#main-slider").owlCarousel({
            autoPlay: false, 
            navigation : true,
            slideSpeed : 500,
            paginationSpeed : 600,
            singleItem: true,
            navigationText: ["<i class='demo-icon icon-left-open-mini'></i>","<i class='demo-icon icon-right-open-mini'></i>"]        
        });
        
        carousel_pagin();
    });
     
    
    

    $.fn.equalHeights = function() {
        var maxHeight = 0,
        $this = $(this);
    
        $this.each( function() {
            var height = $(this).innerHeight();
    
            if ( height > maxHeight ) { maxHeight = height; }
        });
    
        return $this.css('height', maxHeight);
    };
    // auto-initialize plugin
    $('[data-equal]').each(function(){
        var $this = $(this),
        target = $this.data('equal');
        $this.find(target).equalHeights();
    });
     
})(jQuery);
    
    