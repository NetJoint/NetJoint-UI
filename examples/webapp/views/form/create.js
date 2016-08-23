define(['app'], function (app) {
    app.register
            .controller('formCreateCtrl', function ($scope, $rootScope, $state, $stateParams, userService,$timeout) {
                $scope.form = {
                    user: $stateParams.user
                }
                $scope.form.user.avatar = 'img/no_avatar.png,img/no_avatar.png';
                $timeout(function(){
                    $("[data-toggle='cropupload']").cropupload();
                },1000);
                $('#userForm').validate();
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
                $('#good_at').select2({
                    ajax: {
                        url: "json/select2.json",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            return {
                                query: params.term,
                                page: params.page,
                                per_page: 20
                            };
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data,
                                pagination: {
                                    more: (params.page * 20) < data.total_count
                                }
                            };
                        },
                        cache: true
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    }, 
                    minimumInputLength: 0
                });
            })
})