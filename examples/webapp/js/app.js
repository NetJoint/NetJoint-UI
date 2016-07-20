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
                    title: '控制面板',
                    views: {
                        "content": {
                            controller: 'dashboardCtrl',
                            templateUrl: 'views/dashboard/dashboard.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/dashboard/dashboard'])
                })
                .state('table', {
                    url: '/table',
                    title: '用户列表',
                    views: {
                        "content": {
                            controller: 'tableCtrl',
                            templateUrl: 'views/table/table.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/table/table'])
                })
                .state('table.create', {
                    parene: 'table',
                    url: '/create',
                    title: '添加新用户',
                    params: {
                        subtitle: '',
                        user: {}
                    },
                    views: {
                        "content": {
                            controller: 'formCreateCtrl',
                            templateUrl: 'views/form/create.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/form/create'])
                })
                .state('table.edit', {
                    parene: 'table',
                    url: '/edit/{id}',
                    title: '编辑用户信息',
                    params: {
                        subtitle: '',
                        user: {
                            number: '111111',
                            name: '张一',
                            mobile: '13485728901',
                            gender:1,
                            birthday: '2000-7-7',
                            like: {football:true, pingpong:true}
                        }
                    },
                    views: {
                        "content": {
                            controller: 'formEditCtrl',
                            templateUrl: 'views/form/edit.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/form/edit'])
                })
                .state('form_create', {
                    url: '/form/create',
                    title: '添加表单示例',
                    params: {
                        subtitle: '',
                        user: {}
                    },
                    views: {
                        "content": {
                            controller: 'formCreateCtrl',
                            templateUrl: 'views/form/create.html'
                        }
                    },
                    resolve: load(['../services/userService', '../views/form/create'])
                })
                .state('form_edit', {
                    url: '/form/edit/{id}',
                    title: '修改表单示例',
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
            .directive('ngInput', function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, element, attrs, ctrl) {
                        var el = $(element);
                        el.bind('change', function () {
                            element.triggerHandler('input');
                        });
                    }
                }
            })
            .run(function ($rootScope) {
                // 回退按钮
                $rootScope.goBack = function () {
                    window.history.back();
                };
                // 消息通知
                $rootScope.notify = function (message, type) {
                    //type: error, success, info
                    var humane = require('humane');
                    humane.log(message, {timeout: 3000, clickToClose: true, addnCls: 'humane-' + type});
                };
                $rootScope.alert = function (message) {
                    var bootbox = require('bootbox');
                    bootbox.alert(
                            {
                                size: 'small',
                                message: message
                            }
                    );
                };
                $rootScope.prompt = function (message, callback) {
                    var bootbox = require('bootbox');
                    bootbox.prompt(
                            {
                                size: 'small',
                                message: message,
                                callback: callback
                            }
                    );
                };
                $rootScope.confirm = function (message, callback) {
                    var bootbox = require('bootbox');
                    bootbox.confirm(
                            {
                                size: 'small',
                                message: message,
                                callback: callback
                            }
                    );
                };
                $rootScope.dialog = function (options) {
                    var bootbox = require('bootbox');
                    bootbox.dialog(options);
                };
                // 状态变化时刷新title
                $rootScope.$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            $rootScope.title = toState.title;
                        });                
                // bootstrap-table初始化设置        
                $rootScope.setTable = function (url, columns, toolbar, options) {
                    var defaults = {
                            cache: false,
                            striped: true,
                            mobileResponsive: true,
                            pageSize: 10,
                            pageList: [10, 50, 100],
                            search: true,
                            minimumCountColumns: 2,
                            clickToSelect: false,
                            maintainSelected: true,
                            //tools
                            showColumns: true,
                            showRefresh: true,
                            showExport: true,
                            showToggle: true,
                            //page
                            pagination: true,
                            sidePagination: 'server',
                            idField:'id',
                            dataField: 'data',
                            sortName: "id",
                            sortOrder: "desc",
                            url: url,
                            columns: columns,
                            toolbar: toolbar,
                            //editable
                            editableEmptytext : '未填写',
                            editableMethod:  "PUT",
                            editableUrl: url
                        }                            
                    options = $.extend({}, defaults, options);                    
                    return {
                        options: options
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