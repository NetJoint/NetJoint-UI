define(['app'], function (app) {
   app.register 
    .factory('testService', function ($q, $http) {
        return {
            getCategory: function () {
                var delay = $q.defer();
                $http.post(resourceCategoryApi).then(function (res) {
                    delay.resolve(res.data);
                }, function (error) {
                    delay.reject({info: error.status});
                });
                return delay.promise;
            },
            search: function (params, page) {
                var delay = $q.defer();
                var url = searchCategoryApi;
                var p = {
                    categoryId: params.categoryId,
                    keyName: params.keyName,
                    flag: params.flag,
                    showCount: 10,
                    currentPage: page
                };
                $http.post(url, p).then(function (res) {
                    delay.resolve(res.data);
                }, function (error) {
                    delay.reject({info: error.status});
                });
                return delay.promise;
            },
            getDetail: function (id) {
                var params = {
                    resourceId: id
                }
                var delay = $q.defer();
                $http.post(resourcePropertyApi, params).then(function (res) {
                    console.log(res);
                    delay.resolve(res.data);
                }, function (error) {
                    delay.reject({info: error.status});
                });
                return delay.promise;
            }
        }
    });

})