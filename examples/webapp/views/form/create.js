define(['app'], function (app) {
    app.register
            .controller('formCreateCtrl', function ($scope, $rootScope, $state, $stateParams, userService, $timeout) {
                $scope.form = {
                    user: $stateParams.user
                }
                $scope.form.user.avatar = 'img/no_avatar.png,img/no_avatar.png';
                $timeout(function () {
                    $("[data-toggle='cropupload']").cropupload();
                }, 1000);
                $('#userForm').validate();
                $scope.submit = function () {
                    //表单校验                    
                    if (!$('#userForm').validate('checkAll')) {
                        return false;
                    }
                    userService.create($scope.form.user)
                            .then(function (rs) {
                                $rootScope.notify('添加成功', 'success');
                            }, function (error) {
                                $rootScope.notify(error.message, 'error');
                            });
                };

                $rootScope.setSelect($('#good_at'),"json/select2.json");
//                var data = [
//                    {
//                        "id": "1",
//                        "text": "足球"
//                    },
//                    {
//                        "id": "2",
//                        "text": "篮球"
//                    },
//                    {
//                        "id": "3",
//                        "text": "乒乓球"
//                    },
//                    {
//                        "id": "4",
//                        "text": "排球"
//                    }
//                ]
//                $rootScope.setSelect($('#good_at'), data);
            })
})