define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                $rootScope.title = '表格';
                $scope.message = {
                    error: '',
                    success: '',
                }
                var columns = [
                    {
                        field: 'checked',
                        checkbox: true
                    },
                    {
                        field: 'id',
                        title: 'ID',
                        align: 'center',
                        valign: 'bottom',
                        sortable: true
                    },
                    {
                        field: 'name',
                        title: '姓名',
                        align: 'center',
                        valign: 'middle',
                        sortable: true
                    }, {
                        field: 'mobile',
                        title: '手机号',
                        align: 'left',
                        valign: 'top',
                        sortable: true
                    }

                ];
                $scope.userTableCtrl = $rootScope.setTable('json/list.json', columns, '#Toolbar');
                $scope.removeUsers = function () {
                    var selected = $scope.userTableCtrl.state.selected;
                    if (selected.length == 0) {
                        return false;
                    }
                    if (confirm('确定要删除所选项吗？')) {
                        $scope.clearMsg();
                        userService.remove(selected)
                                .then(function (rs) {
                                    $scope.message.success = '删除成功';
                                    $scope.userTableCtrl.call('refresh');
                                }, function (error) {
                                    console.log(error);
                                    $scope.message.error = error.message;
                                });
                    }
                }
                $scope.clearMsg = function () {
                    $scope.message = {
                        error: '',
                        success: '',
                    }
                }
            })
})