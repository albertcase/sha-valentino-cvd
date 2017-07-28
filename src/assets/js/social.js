/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.browserVersion = 'web';
    };
    //init
    controller.prototype.init = function(){
        var self = this;
        Common.gotoPin(0);
        self.bindEvent();
    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;

        // simple slide
        if(navigator.userAgent.toLocaleLowerCase().indexOf('mobile')>-1){
            var mySwiper = new Swiper ('.swiper-container', {
                // Optional parameters
                loop: true,
                //loopedSlides:2,
                //loopAdditionalSlides:1,

                // If we need pagination
                pagination: '.swiper-pagination',

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            mySwiper.on('slideChangeStart', function(e){
                if(e.activeIndex == 4){  //if current slide is video slide
                    $('.swiper-pagination').addClass('hide');
                }else{
                    $('.swiper-pagination').removeClass('hide');
                }
            });
        }

        //Show rule pop
        $('.show-rule').on('touchstart', function(){
            var tpl = '<h3 class="title">活动细则与条款</h3><div class="rule-content">'+$('.rule-text').html()+'</div>';
            Common.popBox.add('pop-rules',tpl);
        });

        /*
         * hide default play video button, add custom play button, if play, the button hide,if pause, the button show
         */
        if(navigator.userAgent.indexOf('iPhone')>-1){
            //console.log('iPhone');
            $('.btn-play').addClass('hide');
        }
        //var video = document.getElementById('myvideo');
        $('.btn-play').on('click', function(){

            //not iphone
            if(!(navigator.userAgent.indexOf('iPhone')>-1)){
                $(this).parent().find('video')[0].play();
            }
        });
        //video.addEventListener('play', function(){
        //    //not iphone
        //    if(!(navigator.userAgent.indexOf('iPhone')>-1)){
        //        $('.btn-play').addClass('hide');
        //    }
        //
        //})
        //video.addEventListener('pause', function(){
        //
        //    if(!(navigator.userAgent.indexOf('iPhone')>-1)){
        //        $('.btn-play').removeClass('hide');
        //    }
        //});

        // for buy button
        $('.btn-buy').on('touchstart click', function(){
            //go second page and show qrcode img
            Common.gotoPin(1);
            self.generateQrcode();
        });
    };

    // generate qrcode image
    controller.prototype.generateQrcode = function(){
        var curHmsr = Common.getParameterByName('hmsr') || 'default';
        var qrImg = new Image();
        qrImg.onload = function(){
            $('.qrcode').html('<img src="'+qrImg.src+'">');
        };
        mapFollow.forEach(function(item){
            if(item.hmsr == curHmsr){
                qrImg.src = item.src;
            }
        });
        qrImg.src = qrImg.src || mapFollow[0].src;

    };



    $(document).ready(function(){

        var newFollow = new controller();
            newFollow.init();

    });

})();