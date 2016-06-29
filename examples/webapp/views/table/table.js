define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                var columns = [
                    {
                        field: 'checked',
                        valign: 'middle',
                        checkbox: true
                    },
                    {
                        field: 'id',
                        title: 'ID',
                        align: 'center',
                        valign: 'middle',
                        sortable: true
                    },
                    {
                        field: 'name',
                        title: '姓名',
                        valign: 'middle',
                        sortable: true
                    }, {
                        field: 'mobile',
                        title: '手机号',
                        valign: 'middle',
                        sortable: true
                    }, {
                        field: 'id',
                        title: '操作',
                        formatter: function (value, row) {
                            return '<a href="#/table/edit/' + row.id + '" class="btn btn-success btn-sm">编 辑</a>'
                        }
                    }

                ];
                $scope.userTableCtrl = $rootScope.setTable('json/list.json', columns, '#Toolbar');
                $scope.removeUsers = function () {
                    var selected = $scope.userTableCtrl.state.selected;
                    if (selected.length == 0) {
                        return false;
                    }
                    if (confirm('确定要删除所选项吗？')) {
                        userService.remove(selected)
                                .then(function (rs) {
                                    $rootScope.notify('删除成功', 'success');
                                    $scope.userTableCtrl.call('refresh');
                                }, function (error) {
                                    $rootScope.notify(error.message, 'error');
                                });
                    }
                }
                
            })
})