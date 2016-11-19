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
   .state('menu', {
     url: '/menu',
     templateUrl: '/templates/menu.html'
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
   .state('userBoards', {
     url: '/boards/me',
     templateUrl: '/templates/userBoards.html',
     controller: 'UserBoardsController as userBoards'
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
   })
   .state('pinsShow', {
     url: '/pins/:id',
     templateUrl: '/templates/pinsShow.html',
     controller: 'PinsShowController as pinsShow'
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

  $authProvider.instagram({
    clientId: '64171eadf0914dd7bf7839bc034e42e0'
  });
}
