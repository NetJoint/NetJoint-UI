define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                $rootScope.title = '表格';
                $scope.loaded = {
                    users: false
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
                var data = [
        {"id": 1, "name": "张一", "mobile": 13485728901},
        {"id": 2, "name": "王二", "mobile": 13485728902},
        {"id": 3, "name": "李三", "mobile": 13485728903},
        {"id": 4, "name": "刘四", "mobile": 13485728904}
    ];
                $scope.userTableCtrl = $rootScope.setTable('json/list.json', data,columns);
            })
})