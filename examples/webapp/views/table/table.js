define(['app'], function (app) {
    app.register
            .controller('tableCtrl', function ($scope, $rootScope, userService) {
                $scope.loading = {
                    user: false
                }
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
                        sortable: true,
                        editable:true
                    }, {
                        field: 'mobile',
                        title: '手机号',
                        valign: 'middle',
                        sortable: true,
                        editable:true
                    }, {
                        field: 'birthday',
                        title: '出生日期',
                        valign: 'middle',
                        sortable: true,
                        editable: true
                    }, {
                        field: 'state',
                        title: '状态',
                        valign: 'middle',
                        sortable: true,
                        editable: true,
                        editableType: 'select',
                        editableMode: 'popover',
                        editableSource: 'json/select.json',
                    }, {
                        field: 'like',
                        title: '喜欢',
                        valign: 'middle',
                        editable: true,
                        editableType: 'select2',
                        editableMode: 'popover',
                        editableSource: 'json/select2.json',
//                        editableSelect2: {
//                            width: 200,
//                            placeholder: 'Select country',
//                            allowClear: true,
//                            ajax: {
//                                url: 'json/select2.json',
//                                dataType: 'json',
//                                data: function (term, page) {
//                                    console.log(term);
//                                    return { query: term };
//                                },
//                                results: function (data, page) {
//                                    console.log(data);
//                                    return { results: data };
//                                }
//                            },
//                        }
                    }, {
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
                    $rootScope.confirm('确定要删除所选项吗？', function (rs) {
                        if(rs){
                            userService.remove(selected)
                                .then(function (rs) {
                                    $rootScope.notify('删除成功', 'success');
                                    $scope.userTableCtrl.call('refresh');
                                }, function (error) {
                                    $rootScope.notify(error.message, 'error');
                                });
                        }                        
                    })
                        ;
                }

            })
})