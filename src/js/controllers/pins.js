angular.module('boardApp')
  // .controller('PinsIndexController', PinsIndexController)
  .controller('PinsNewController', PinsNewController)
  .controller('PinsShowController', PinsShowController)
  .controller('PinsEditController', PinsEditController);

// PinsIndexController.$inject = ['Pin'];
// function PinsIndexController(Pin){
//   const pinsIndex = this;
//
//   pinsIndex.all = Pin.query();
// }

PinsNewController.$inject = ['Pin', '$state'];
function PinsNewController(Pin, $state) {
  const pinsNew = this;

  pinsNew.pin = {};

  function create() {
    Pin.save(pinsNew.pin, (pin) => {
      $state.go('pinsShow', { id: pin._id });
    });
  }

  pinsNew.create = create;
}

PinsShowController.$inject = ['Pin', '$state'];
function PinsShowController(Pin, $state) {
  const pinsShow = this;

  pinsShow.pin = Pin.get($state.params);

  function deletePin() {
    pinsShow.pin.$remove(() => {
      $state.go('boardsShow');
    });
  }

  pinsShow.delete = deletePin;
}

PinsEditController.$inject = ['Pin', '$state'];
function PinsEditController(Pin, $state) {
  const pinsEdit = this;

  pinsEdit.pin = Pin.get($state.params);

  function updatePin() {
    pinsEdit.pin.$update(() => {
      $state.go('pinsShow', $state.params);
    });
  }
  pinsEdit.update = updatePin;
}
