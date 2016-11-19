angular.module('boardApp')
  // .controller('PinsIndexController', PinsIndexController)
  .controller('PinsShowController', PinsShowController)
  .controller('PinsEditController', PinsEditController);

// PinsIndexController.$inject = ['Pin'];
// function PinsIndexController(Pin){
//   const pinsIndex = this;
//
//   pinsIndex.all = Pin.query();
// }

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

// PinsEditController.$inject = ['Pin', '$state'];
// function PinsEditController(Pin, $state) {
//   const pinsEdit = this;
//
//   pinsEdit.pin = Pin.get($state.params);
//
//   function updatePin() {
//     Pin.save({ boardId: $state.params.id }, boardsShow.currentPin, () => {
//       $state.go('pinsShow', $state.params);
//     });
//   }
//
//   pinsEdit.updatePin = updatePin;
//   hideEditForm();
// }

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
