/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
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

})();