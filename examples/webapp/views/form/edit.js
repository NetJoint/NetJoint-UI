define(['app'], function (app) {
    app.register
            .controller('formEditCtrl', function ($scope, baseService) {
                $scope.user ={
                    name:'张仨啊'
                }
                $scope.users = [];
                baseService.getList('json/list.json', {}).then(
                        function(rs){
                            $scope.users = rs.data;
                        },
                        function(){
                            alert('失败');
                        }
                        );
            })
})