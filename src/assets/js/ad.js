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
                loop: false,

                // If we need pagination
                pagination: '.swiper-pagination',

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
        }

        //Show rule pop
        $('.show-rule').on('touchstart', function(){
            var tpl = '<h3 class="title">活动细则与条款</h3>'+
                '<div class="rule-content"><p>配送与提货<br>您可在订单中选择快递配送或到店自取的方式获取商品。</p>'+
                '<p>快 递<br>配送费用: 免费<br>配送时间: 免费配送服务的运送时间为发货日起1-5天。</p>'+
                '<p>寄货目的地与运费<br>在此网站的订单只能配送至中国大陆地区。</p>'+
                '<p>到店自取<br>线上支付完成后，前往所选择的线下店铺提取商品，提取时须出示本人身份证件及订单确认码。线下店铺将电话确认相关取货信息，如需他人代理提取，需提前告知店铺代理人姓名及身份证件信息。</p></div>';
            Common.popBox.add('pop-rules',tpl);
        });

        /*
         * For buy button
         * if has stock, generate redirect url
         * if not stock, disabled the button
         * */
        $('.btn-buy').on('touchstart', function(){
            Api.isStock(function(data){
                if(data.status==1){
                    self.generateRedirectUrl();
                }else{
                    $('.btn-buy').addClass('disabled');
                }
            });

        });

        //    btn-follow
        $('.btn-follow').on('touchstart', function(){
            //go second page and show qrcode img
            //Common.gotoPin(1);
            self.qrcodePopup();
        });

    };

    // generate qrcode image
    controller.prototype.generateQrcode = function(){
        var curHmsr = Common.getParameterByName('hmsr');
        var qrImg = new Image();
        qrImg.onload = function(){
            $('.qrcode').html('<img src="'+qrImg.src+'">');
        };
        mapFollow.forEach(function(item){
            if(item.hmsr == curHmsr){
                qrImg.src = item.src;
            }
        });

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
        var curHmsr = Common.getParameterByName('hmsr');
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
    };

    // the follow qrcode popup
    controller.prototype.followPopup = function(){
        var curHmsr = Common.getParameterByName('hmsr');
        var qrImg = new Image();
        qrImg.onload = function(){
            $('.qrcode').html('<img src="'+qrImg.src+'">');
            var tpl = '<div class="logo"><img src="/src/dist/images/logo.png" alt=""></div><p class="text">关注Valentino官方微信<br>为您提供最新品牌信息和专属服务</p><div class="qrcode"><img src="'+qrImg.src+'"></div>';
            Common.popBox.add('follow-popup',tpl);
        };
        mapFollow.forEach(function(item){
            if(item.hmsr == curHmsr){
                qrImg.src = item.src;
            }
        });

    };



    $(document).ready(function(){

        var newFollow = new controller();
        newFollow.init();

    });

})();