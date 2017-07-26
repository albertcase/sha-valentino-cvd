/*All the api collection*/
Api = {
    //is fill form
    isStock:function(callback){
        //Common.msgBox.add('loading...');
        $.ajax({
            url:'/api/stock',
            type:'POST',
            dataType:'json',
            success:function(data){
                //Common.msgBox.remove();
                return callback(data);
                //status=1 有库存
            }
        });
        //return callback({
        //    status:1,
        //    msg:'follow'
        //})

    },


};