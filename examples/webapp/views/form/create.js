define(['app'], function (app) {
    app.register
            .controller('formCreateCtrl', function ($scope, $rootScope, $state, $stateParams, userService) {
                $('#userForm').validate();
                $scope.form = {
                    user: $stateParams.user
                }
                $scope.submit = function () {                   
                    //表单校验                    
                    if(!$('#userForm').validate('checkAll')){
                        return false;
                    }
                    userService.create($scope.form.user)
                            .then(function (rs) {
                                $rootScope.notify('添加成功', 'success');
                            }, function (error) {
                                $rootScope.notify(error.message, 'error');
                            });
                };
            })
})