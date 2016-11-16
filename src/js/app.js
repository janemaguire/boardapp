angular
  .module('boardApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    // .state('usersIndex', {
    //   url: '/users',
    //   templateUrl: '/templates/usersIndex.html',
    //   controller: 'UsersIndexController as usersIndex'
    // })
    // .state('usersNew', {
    //   url: '/users/new',
    //   templateUrl: '/templates/usersNew.html',
    //   controller: 'UsersNewController as usersNew'
    // })
    // .state('usersShow', {
    //   url: '/users/:id',
    //   templateUrl: '/templates/usersShow.html',
    //   controller: 'UsersShowController as usersShow'
    // })
    // .state('usersEdit', {
    //   url: '/users/:id/edit',
    //   templateUrl: '/templates/usersEdit.html',
    //   controller: 'UsersEditController as usersEdit'
    // })
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
  $urlRouterProvider.otherwise('/users');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
