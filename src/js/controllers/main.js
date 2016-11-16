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
}
