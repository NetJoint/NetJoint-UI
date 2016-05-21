define(function () {
    var app = angular.module('webApp', ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
            //得到$controllerProvider的引用
            controller: $controllerProvider.register,
            //同样的，这里也可以保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            service: $provide.service
        };
        $stateProvider
                .state('dashboard', {
                    url: '/',
                    views: {
                        "content": {
                            controller: 'dashboardCtrl',
                            templateUrl: 'app/views/dashboard/dashboard.html'
                        }
                    },
                    resolve: {
                        loadCtrl: ["$q", function ($q) {
                                var delay = $q.defer();
                                require([
                                    '../app/views/dashboard/dashboard'
                                ], function () {
                                    delay.resolve();
                                });
                                return delay.promise;
                            }]
                    }
                })
                .state('form', {
                    url: '/form',
                    views: {
                        "content": {
                            controller: 'formCtrl',
                            templateUrl: 'app/views/form/form.html'
                        }
                    },
                    resolve: {
                        loadCtrl: ["$q", function ($q) {
                                var delay = $q.defer();
                                require([
                                    '../app/views/form/form'
                                ], function () {
                                    delay.resolve();
                                });
                                return delay.promise;
                            }]
                    }
                })
        $urlRouterProvider.otherwise('/');
    })
            .directive('ngFocus', function () {
                var FOCUS_CLASS = "ng-focused";
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, element, attrs, ctrl) {
                        ctrl.$focused = false;
                        element.bind('focus', function (evt) {
                            element.addClass(FOCUS_CLASS);
                            scope.$apply(function () {
                                ctrl.$focused = true;
                            });
                        }).bind('blur', function (evt) {
                            element.removeClass(FOCUS_CLASS);
                            scope.$apply(function () {
                                ctrl.$focused = false;
                            });
                        });
                    }
                }
            })
            .run(function ($rootScope) {
                // 回退按钮
                $rootScope.goBack = function () {
                    window.history.back();
                };
            })
            .factory('baseService', function ($http, $q) {
                return {
                    // 获取列表
                    getList: function (url, params) {
                        var delay = $q.defer();
                        $http.get(url, {params: params})
                                .then(function (result) {
                                    delay.resolve(result.data);
                                }, function (errinfo) {
                                    var msg = {
                                        message: '',
                                        errors: []
                                    }
                                    switch (errinfo.status) {
                                        case 401:
                                            msg.message = '您的登录已超时，请重新登录';
                                            break;
                                        case 403:
                                            msg.message = '您无权进行该操作';
                                            break;
                                        default:
                                            msg.message = errinfo.data.message;
                                    }
                                    delay.reject(msg);
                                });
                        return delay.promise;
                    },
                    // 获取详情
                    getDetail: function (url, params) {
                        var delay = $q.defer();
                        $http.get(url, {params: params})
                                .then(function (result) {
                                    delay.resolve(result);
                                }, function (errinfo) {
                                    delay.reject(errinfo);
                                });
                        return delay.promise;
                    },
                    // 创建
                    post: function (url, params) {
                        var delay = $q.defer();
                        $http.post(url, params, form_config)
                                .then(function (result) {
                                    delay.resolve();
                                }, function (errinfo) {
                                    delay.reject(errinfo);
                                });
                        return delay.promise;
                    },
                    // 更新
                    put: function (url, params) {
                        var delay = $q.defer();
                        $http.put(url, params)
                                .then(function (result) {
                                    delay.resolve(result);
                                }, function (errinfo) {
                                    delay.reject(errinfo);
                                });
                        return delay.promise;
                    },
                    // 删除
                    delete: function (url) {
                        var delay = $q.defer();
                        $http.delete(url)
                                .then(function (result) {
                                    delay.resolve();
                                }, function (errinfo) {
                                    delay.reject(errinfo);
                                });
                        return delay.promise;
                    }
                };
            });

    return app;

})