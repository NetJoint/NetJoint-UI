define(function () {
    var service_debug = true;
    var app = angular.module('webApp', ['ui.router', 'bsTable']);
    var load = function (files) {
        return {
            load: ["$q", function ($q) {
                    var delay = $q.defer();
                    require(files, function () {
                        delay.resolve();
                    });
                    return delay.promise;
                }]
        };
    }
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.register = {
            controller: $controllerProvider.register,
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
                            templateUrl: 'views/dashboard/dashboard.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/dashboard/dashboard'])
                })
                .state('table', {
                    url: '/table/table',
                    views: {
                        "content": {
                            controller: 'tableCtrl',
                            templateUrl: 'views/table/table.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/table/table'])
                })
                .state('form_create', {
                    url: '/form/create',
                    views: {
                        "content": {
                            controller: 'formCreateCtrl',
                            templateUrl: 'views/form/create.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/form/create'])
                })
                .state('form_edit', {
                    url: '/form/edit',
                    views: {
                        "content": {
                            controller: 'formEditCtrl',
                            templateUrl: 'views/form/edit.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/form/edit'])
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
                $rootScope.notify = function (message, type) {
                    //type: error, success, info
                    var humane = require('humane');
                    humane.log(message, { timeout: 3000, clickToClose: true, addnCls: 'humane-' + type });
                };                
                $rootScope.setTable = function (url, columns, toolbar) {
                    return {
                        options: {                            
                            cache: false,                            
                            striped: true,                            
                            mobileResponsive:true,
                            pageSize: 10,
                            pageList: [10, 50, 100],
                            search: true,                            
                            minimumCountColumns: 2,
                            clickToSelect: true,
                            maintainSelected: true,
                            //tools
                            showColumns: true,
                            showRefresh: true,
                            showExport: true,
                            showToggle: true,
                            //page
                            pagination: true,
                            sidePagination: 'server',                            
                            dataField: 'data',                            
                            sortName:"id",
                            sortOrder:"desc",
                            url:url,
                            columns: columns,
                            toolbar: toolbar,
                        }
                    }
                }
            })
            .factory('baseService', function ($http, $q) {
                return {
                    // 错误响应
                    errorMsg: function (error) {
                        var msg = {
                            message: '',
                            status: error.status,
                            errors: []
                        }
                        switch (error.status) {
                            case 401:
                                msg.message = '您的登录已超时，请重新登录';
                                break;
                            case 403:
                                msg.message = '您无权进行该操作';
                                break;
                            case 404:
                                msg.message = 'api地址或参数不正确';
                                break;
                            case 422:
                                msg.message = '输入参数不正确';
                                msg.errors = error.data.errors;
                                break;
                            default:
                                msg.message = error.data.message;
                        }
                        this.debug(error);
                        return msg;
                    },
                    debug: function (rs) {
                        if (service_debug) {
                            if (rs.status >= 300) {
                                console.group(rs.config.method + ' ' + rs.config.url);
                                console.warn(rs.status);
                                console.warn(rs.data);
                            } else {
                                console.groupCollapsed(rs.config.method + ' ' + rs.config.url);
                                console.info(rs.data);
                            }
                            console.groupEnd();
                        }
                    },
                    get: function (url, params) {
                        var delay = $q.defer(), that = this, settings = {};
                        if (typeof (params) != 'undefined') {
                            settings = {params: params}
                        }
                        $http.get(url, settings)
                                .then(function (result) {
                                    that.debug(result);
                                    delay.resolve(result.data);
                                }, function (error) {
                                    delay.reject(that.errorMsg(error));
                                });
                        return delay.promise;
                    },
                    post: function (url, params) {
                        var delay = $q.defer(), that = this;
                        var form_config = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            transformRequest: function (data) {
                                if (!angular.isObject(data)) {
                                    return ((data == null) ? "" : data.toString());
                                }
                                var buffer = [];
                                for (var p in data) {
                                    if (!data.hasOwnProperty(p))
                                        continue;
                                    buffer.push(encodeURIComponent(p) + "=" +
                                            encodeURIComponent((data[p] == null) ? "" : data[p]));
                                }
                                return buffer.join("&").replace(/%20/g, "+");
                            }
                        }
                        //remove last /
                        url = url.replace(/\/+$/, '');
                        $http.post(url, params, form_config)
                                .then(function (result) {
                                    that.debug(result);
                                    delay.resolve(result.data);
                                }, function (error) {
                                    delay.reject(that.errorMsg(error));
                                });
                        return delay.promise;
                    },
                    // 更新
                    put: function (url, params) {
                        var delay = $q.defer(), that = this;
                        $http.put(url, params)
                                .then(function (result) {
                                    that.debug(result);
                                    delay.resolve(result.data);
                                }, function (error) {
                                    delay.reject(that.errorMsg(error));
                                });
                        return delay.promise;
                    },
                    // 删除
                    del: function (url) {
                        var delay = $q.defer(), that = this;
                        //ie8 fix $http.delete error
                        $http['delete'](url)
                                .then(function (result) {
                                    that.debug(result);
                                    delay.resolve(result.data);
                                }, function (error) {
                                    delay.reject(that.errorMsg(error));
                                });
                        return delay.promise;
                    }
                };
            });

    return app;

})