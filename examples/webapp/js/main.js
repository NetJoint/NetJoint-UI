require.config({
    paths: {
        'angular': '../lib/angular/angular.min',
        'uiRouter': '../lib/angular-ui-router/angular-ui-router.min',        
        "netjoint-ui": "../../../dist/js/netjoint-ui.min",
    },
    shim: {
        'uiRouter': {
            deps: ['angular']
        },
        'app': {
            deps: ['netjoint-ui','angular','uiRouter']
        }
    }
});
require(['app'], function () {
    angular.bootstrap(document, ['webApp']);
});