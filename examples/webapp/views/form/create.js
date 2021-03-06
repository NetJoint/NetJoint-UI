define(['app'], function (app) {
    app.register
            .controller('formCreateCtrl', function ($scope, $rootScope, $state, $stateParams, userService, $timeout) {
                $scope.form = {
                    user:{
                        province:'安徽省',
                        city:'合肥市'
                    }
                }                
                $timeout(function () {
                    $("[data-toggle='cropupload']").cropupload();
                    $("[data-toggle='videoupload']").videoupload();
                }, 500);
                $('#userForm').validate();
                $('#icon').fontIconPicker({
                    source:    'json/icons.json',                 
                    hasSearch: true
                });
                $('#cxSelect').cxSelect({
                    url: 'json/city.min.json',
                    selects: ['province', 'city', 'district']
                  });
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