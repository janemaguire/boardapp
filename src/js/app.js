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
