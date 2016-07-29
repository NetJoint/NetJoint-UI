define(function () {
    var service_debug = true;
    var app = angular.module('webApp', ['ui.router']);
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
                            gender: 1,
                            birthday: '2000-7-7',
                            like: {football: true, pingpong: true}
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
                        idField: 'id',
                        dataField: 'data',
                        sortName: "id",
                        sortOrder: "desc",
                        url: url,
                        columns: columns,
                        toolbar: toolbar,
                        //editable
                        editableEmptytext: '未填写',
                        editableMethod: "PUT",
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
            .directive('bsTableControl', function ($timeout) {
                var CONTAINER_SELECTOR = '.bootstrap-table';
                var SCROLLABLE_SELECTOR = '.fixed-table-body';
                var SEARCH_SELECTOR = '.search input';
                var bsTables = {};
                function getBsTable(el) {
                    var result;
                    $.each(bsTables, function (id, bsTable) {
                        if (!bsTable.$el.closest(CONTAINER_SELECTOR).has(el).length)
                            return;
                        result = bsTable;
                        return true;
                    });
                    return result;
                }

                $(window).resize(function () {
                    $.each(bsTables, function (id, bsTable) {
                        bsTable.$el.bootstrapTable('resetView');
                    });
                });
                $(document)
                        .on('post-header.bs.table', CONTAINER_SELECTOR + ' table', function (evt) { // bootstrap-table calls .off('scroll') in initHeader so reattach here
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            bsTable.$el
                                    .closest(CONTAINER_SELECTOR)
                                    .find(SCROLLABLE_SELECTOR)
                                    .on('scroll', function () {
                                        var state = bsTable.$s.bsTableControl.state;
                                        bsTable.$s.$applyAsync(function () {
                                            state.scroll = bsTable.$el.bootstrapTable('getScrollPosition');
                                        });
                                    });
                        })
                        .on('sort.bs.table', CONTAINER_SELECTOR + ' table', function (evt, sortName, sortOrder) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            bsTable.$s.$applyAsync(function () {
                                state.sortName = sortName;
                                state.sortOrder = sortOrder;
                            });
                        })
                        .on('page-change.bs.table', CONTAINER_SELECTOR + ' table', function (evt, pageNumber, pageSize) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            bsTable.$s.$applyAsync(function () {
                                state.pageNumber = pageNumber;
                                state.pageSize = pageSize;
                            });
                        })
                        .on('search.bs.table', CONTAINER_SELECTOR + ' table', function (evt, searchText) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            bsTable.$s.$applyAsync(function () {
                                state.searchText = searchText;
                            });
                        })
                        .on('load-success.bs.table load-error.bs.table', CONTAINER_SELECTOR + ' table', function (evt) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            bsTable.$s.$applyAsync(function () {
                                state.selected = [];
                            });
                        })
                        .on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', CONTAINER_SELECTOR + ' table', function (evt) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            var selected = [];
                            $.map(bsTable.$el.bootstrapTable('getSelections'), function (row) {
                                selected.push(row.id);
                            });
                            bsTable.$s.$applyAsync(function () {
                                state.selected = selected;
                            });
                        })
                        .on('focus blur', CONTAINER_SELECTOR + ' ' + SEARCH_SELECTOR, function (evt) {
                            var bsTable = getBsTable(evt.target);
                            if (!bsTable)
                                return;
                            var state = bsTable.$s.bsTableControl.state;
                            bsTable.$s.$applyAsync(function () {
                                state.searchHasFocus = $(evt.target).is(':focus');
                            });
                        });

                return {
                    restrict: 'EA',
                    scope: {bsTableControl: '='},
                    link: function ($s, el) {
                        $el = $(el);
                        if (!$s.$applyAsync) {
                            $s.$applyAsync = function (expr) {
                                var scope = this;
                                $timeout(function () {
                                    scope.$eval(expr);
                                }, 20);
                            }
                        }
                        $s.bsTableControl.$el = $el;
                        $s.bsTableControl.call = function (method, params) {
                            $el.bootstrapTable(method, params);
                        }
                        var bsTable = bsTables[$s.$id] = {$s: $s, $el: $el};
                        $s.instantiated = false;
                        $s.$watch('bsTableControl.options', function (options) {
                            if (!options)
                                options = $s.bsTableControl.options = {};
                            var state = $s.bsTableControl.state || {};

                            if ($s.instantiated)
                                $el.bootstrapTable('destroy');
                            $el.bootstrapTable(angular.extend(angular.copy(options), state));
                            $s.instantiated = true;

                            // Update the UI for state that isn't settable via options
                            if ('scroll' in state)
                                $el.bootstrapTable('scrollTo', state.scroll);
                            if ('searchHasFocus' in state)
                                $el.closest(CONTAINER_SELECTOR).find(SEARCH_SELECTOR).focus(); // $el gets detached so have to recompute whole chain
                        }, true);
                        $s.$watch('bsTableControl.state', function (state) {
                            if (!state)
                                state = $s.bsTableControl.state = {};
                            $el.trigger('directive-updated.bs.table', [state]);
                        }, true);
                        $s.$on('$destroy', function () {
                            delete bsTables[$s.$id];
                        });
                    }
                };
            });

    return app;

})