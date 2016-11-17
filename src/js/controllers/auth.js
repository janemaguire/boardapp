angular.module('boardApp')
    .controller('RegisterController', RegisterController)
    .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('test');
      });
  }

  register.submit = submit;

}
LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $state.go('test');
      });
  }

  function authenticate(service) {
    $auth.authenticate(service)
    .then(() => {
      $state.go('test');
      console.log('Is this running');
    });
  }

  login.submit = submit;
  login.authenticate = authenticate;

}
