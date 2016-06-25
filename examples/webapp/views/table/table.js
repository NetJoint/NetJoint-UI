define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                $rootScope.title = '表格';                
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
                    }, {
                        field: 'id',
                        title: '操作',                        
                        formatter:function(value,row){
                            return '<a href="#/form/edit/'+row.id+'" class="btn btn-success">编辑</a>'
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
                                    $rootScope.notify('删除成功','success');
                                    $scope.userTableCtrl.call('refresh');
                                }, function (error) {
                                    $rootScope.notify(error.message,'error');
                                });
                    }
                }                
            })
})