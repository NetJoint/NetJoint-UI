require.config({
    paths: {
        'angular': '../../node_modules/angular/angular.min',
        'uiRouter': '../../node_modules/angular-ui-router/release/angular-ui-router',        
        "netjoint-ui": "../../dist/js/netjoint-ui",
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