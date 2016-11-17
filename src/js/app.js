angular
 .module('boardApp', ['ngResource', 'ui.router', 'satellizer'])
 .config(Router)
 .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
   .state('register', {
     url: '/register',
     templateUrl: '/templates/register.html',
     controller: 'RegisterController as register'
   })
   .state('login', {
     url: '/login',
     templateUrl: '/templates/login.html',
     controller: 'LoginController as login'
   })
   .state('test', {
     url: '/test',
     templateUrl: '/templates/test.html'
   })
   .state('boardsIndex', {
     url: '/boards',
     templateUrl: '/templates/boardsIndex.html',
     controller: 'BoardsIndexController as boardsIndex'
   })
   .state('boardsNew', {
     url: '/boards/new',
     templateUrl: '/templates/boardsNew.html',
     controller: 'BoardsNewController as boardsNew'
   })
   .state('boardsShow', {
     url: '/boards/:id',
     templateUrl: '/templates/boardsShow.html',
     controller: 'BoardsShowController as boardsShow'
   })
   .state('boardsEdit', {
     url: '/boards/:id/edit',
     templateUrl: '/templates/boardsEdit.html',
     controller: 'BoardsEditController as boardsEdit'
   });
  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.tokenPrefix = '';
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.facebook({
    clientId: '592951794244851'
  });
}
