angular.module('boardApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html'
    })
    .state('login', {
      
    });

  $urlRouterProvider.otherwise('/');
}
