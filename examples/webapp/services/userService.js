define(['app'], function (app) {
   app.register 
    .service('userService', function (baseService) {
        return {
            url: 'json/',
            getList: function (params) {
                    return baseService.get(this.url + 'list.json', params);
                }
        }
    });

})