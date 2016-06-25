define(['app'], function (app) {
    app.register
            .controller('formEditCtrl', function ($scope, userService,$stateParams) {
                $scope.user ={}
                $scope.id = $stateParams.id;
            })
})