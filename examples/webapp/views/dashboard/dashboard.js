define(['app'], function (app) {
    app.register
            .controller('dashboardCtrl', function ($scope, $rootScope, userService, $timeout) {
                $rootScope.title = '控制面板';
                $scope.loaded = {
                    users: false
                }
                $scope.loadUsers = function () {
                    var params = [];
                    userService.getList(params)
                            .then(function (rs) {
                                $scope.users = rs.data;                                
                                if ($scope.users.length > 0) {
                                    $scope.message = '';
                                } else {
                                    $scope.message = '没有匹配的数据';
                                }
                                $scope.loaded.users = true;
                            }, function (error) {
                                $scope.message = error.message;
                                $scope.users = [];
                                $scope.loaded.users = true;
                            });
                };
                $timeout($scope.loadUsers,1000);
            })
})