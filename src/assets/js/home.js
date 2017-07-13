/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.enableScroll = false;
    };
    //init
    controller.prototype.init = function(){
        var self = this;
        self.bindEvent();
    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;

        // simple slide
        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            loop: false,

            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        })

    };

    //calculate all img size
    controller.prototype.calculateImgSize = function(){
        for(var i=0;i<$('img').length;i++){
            $('img').eq(i).css({
                'width':$('img')[i].naturalWidth/100 + 'rem',
                'height':$('img')[i].naturalHeight/100 + 'rem'
            });
        };
    };



    $(document).ready(function(){

        var newFollow = new controller();
            newFollow.init();
            //newFollow.calculateImgSize();

        //var u = navigator.userAgent,
        //    app = navigator.appVersion;
        //
        //if (!!u.match(/AppleWebKit.*Mobile.*/)) {
        //    //mobile
        //    $('.showonpc').remove();
        //    var newFollow = new controller();
        //    newFollow.init();
        //
        //    document.body.addEventListener('touchmove', function(evt) {
        //        //In this case, the default behavior is scrolling the body, which
        //        //would result in an overflow.  Since we don't want that, we preventDefault.
        //        if(!evt._isScroller) {
        //            evt.preventDefault();
        //        }
        //    });
        //    Common.overscroll(document.querySelector('.terms-pop .pcontent'));
        //} else {
        //    //pc
        //    $('.loading').remove();
        //    $('.mod-orient-layer').remove();
        //    $('.wrapper').remove();
        //
        //}


    });

})();