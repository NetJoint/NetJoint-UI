define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                $rootScope.title = '表格';
                $scope.loaded = {
                    users: false
                }
                $scope.loadUsers = function (tableState) {
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
                $scope.loadUsers();
            })
})