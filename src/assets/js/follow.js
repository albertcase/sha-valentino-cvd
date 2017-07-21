/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var curHmsr = Common.getParameterByName('hmsr');
    var qrImg = new Image();
    qrImg.onload = function(){
        $('.qrcode').html('<img src="'+qrImg.src+'">');
    };
    console.log(123);
    mapFollow.forEach(function(item){
        if(item.hmsr == curHmsr){
            qrImg.src = item.src;
        }else{
            qrImg.src = mapFollow[0].src;
        }
    });

})();