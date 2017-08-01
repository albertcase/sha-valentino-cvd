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

        /*
        * If there's no stock, disabled the btn
        * */
        Api.isStock(function(data){
            if(!(data.status == 1)){
                $('.btn-buy').addClass('disabled');
                //$('.panel').addClass('sellout');
            }
        });
    };

    //Bind Event
    controller.prototype.bindEvent = function(){
        var self = this;

        // simple slide
        if(navigator.userAgent.toLocaleLowerCase().indexOf('mobile')>-1){
            var mySwiper = new Swiper ('.swiper-container', {
                // Optional parameters
                loop: true,

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
         * For iphone, we use default video tag and action
         * For others, main is for andriod, we will fix video z-index hight bug with rewrite the video html,
         * but when close popup in video area, the video will play, so add a overlay and then remove when close the popup
         * */
        $('.btn-follow').on('touchstart', function(){
            //go second page and show qrcode img
            //Common.gotoPin(1);
            var videoHtml = '<video class="myvideo" poster="/src/dist/images/poster.jpg"><br><source src="/src/media/video.mp4"><br></video><div class="btn-play"></div><div class="video-overlay"></div>';
            if(!(navigator.userAgent.indexOf('iPhone')>-1)){
                $('.showvideo').html(videoHtml);
            }
            self.qrcodePopup();
        });

        $('body').on('touchstart', '#qrcode-popup', function(e){
            //console.log($('#this'));
            if(e.target.className.indexOf('popup') > -1 || e.target.className.indexOf('btn-close') > -1){
                //$('.popup').remove();
                $('#qrcode-popup').remove();
                var aaa = setTimeout(function(){
                    $('.video-overlay').remove();
                    clearTimeout(aaa);
                },200);
            }
        });

        /*
         * hide default play video button, add custom play button, if play, the button hide,if pause, the button show
         */
        if(navigator.userAgent.indexOf('iPhone')>-1){
            //console.log('iPhone');
            $('.btn-play').addClass('hide');
        }
        //var video = document.getElementById('myvideo');
        $('.showvideo').on('click', '.btn-play', function(){

            //not iphone
            if(!(navigator.userAgent.indexOf('iPhone')>-1)){
                $(this).parent().find('video')[0].play();
            }
        });

        /*
         * Imitate the checkbox function, default value is false(not selected)
         * */
        var isagree = false;
        $('#isagree').on('touchstart', function(){
            if(isagree){
                isagree = false;
                $('#isagree').removeClass('yes');
            }else{
                isagree = true;
                $('#isagree').addClass('yes');
            }
        });

        /*
         * For buy button
         * if has stock, generate redirect url
         * if not stock, disabled the button
         * */
        $('.btn-buy').on('touchstart', function(){
            if(!$('.btn-buy').hasClass('disabled')){
                if(isagree){
                    self.generateRedirectUrl();
                }else{
                    var tpl = '<h3 class="title">提示</h3><p class="des">请阅读并勾选“细则与条款”</p><div class="btn-close btn-close-ok">OK</div>';
                    Common.popBox.add('alert-pop',tpl);
                }
            }

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

    /*
     * Generate url with hmsr and timestamp
     * */
    controller.prototype.generateRedirectUrl = function(url){
        //var url = url;
        console.log('generateRedirectUrl');
        var curHmsr = Common.getParameterByName('hmsr');
        var timestamp=Math.round(new Date().getTime()/1000);
        var redirectUrl = encodeURI('https://wechatshop.valentinoworld.com/static/flow.html?src='+curHmsr+'&t='+timestamp+'&scope=snsapi_base');
        var fullUrl = 'http://valentinowechat.samesamechina.com/v1/wx/web/oauth2/authorize?redirect_uri='+redirectUrl;
        window.location.href = fullUrl;
    };

    // the follow qrcode popup
    controller.prototype.qrcodePopup = function(){
        var curHmsr = Common.getParameterByName('hmsr') || 'default';
        var qrImg = new Image();
        qrImg.onload = function(){
            $('.qrcode').html('<img src="'+qrImg.src+'">');
            var tpl = '<div class="qrcode"><img src="'+qrImg.src+'"></div><p class="text">关注Valentino官方微信<br>为您提供最新品牌信息和专属服务</p>';
            Common.popBox.add('qrcode-popup',tpl);
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