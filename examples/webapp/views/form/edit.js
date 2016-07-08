define(['app'], function (app) {
    app.register
            .controller('formEditCtrl', function ($scope, $rootScope, userService,$stateParams) {
                $('#userForm').validate();
                $scope.form = {
                    user: $stateParams.user
                }                
                $scope.submit = function () {
                    //表单校验                    
                    if(!$('#userForm').validate('checkAll')){
                        return false;
                    }
                    userService.update($scope.form.user)
                            .then(function (rs) {
                                $rootScope.notify('保存成功', 'success');
                            }, function (error) {
                                $rootScope.notify(error.message, 'error');
                            });
                };
                $scope.check =  function (obj, value) {
                    console.log(this);
                };
            })
})