require.config({
    paths: {
        'angular': '../lib/angular/angular.min',
        'uiRouter': '../lib/angular-ui-router/angular-ui-router.min',        
        "netjoint-ui": "../../../dist/js/netjoint-ui",
    },
    shim: {
        'uiRouter': {
            deps: ['angular']
        },
        'app': {
            deps: ['angular','uiRouter','netjoint-ui']
        }
    }
});
require(['app'], function () {
    angular.bootstrap(document, ['webApp']);
});