define(['app'], function (app) {
   app.register 
    .service('userService', function (baseService) {
        return {
            url: 'json/',
            getList: function (params) {
                    return baseService.get(this.url + 'list.json', params);
                },
            remove: function (id) {
                    if(typeof(id) =="object"){
                        id = id.join(',');
                    }
//                    return baseService.del(this.url + id);
                    return baseService.get(this.url + 'success.json');
                }
                
        }
    });

})