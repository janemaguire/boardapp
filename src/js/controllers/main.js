angular.module('boardApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;
  main.isLoggedIn = $auth.isAuthenticated;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('login');
      });
  }
  main.logout = logout;

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if(!$auth.isAuthenticated() && toState.name !== 'login' && toState.name !== 'register') {
      e.preventDefault();
      $state.go('login');
    }
  });
}
