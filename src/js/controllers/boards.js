angular.module('boardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
  .controller('BoardsEditController', BoardsEditController)
  .controller('UserBoardsController', UserBoardsController);

BoardsIndexController.$inject = ['Board'];
function BoardsIndexController(Board){
  const boardsIndex = this;

  boardsIndex.all = Board.query();
}

BoardsNewController.$inject = ['Board', '$state'];
function BoardsNewController(Board, $state) {
  const boardsNew = this;

  boardsNew.board = {};

  function create() {
    Board.save(boardsNew.board, (board) => {
      $state.go('boardsShow', { id: board._id });
    });
  }

  boardsNew.create = create;
}

UserBoardsController.$inject = ['Board', '$auth'];
function UserBoardsController(Board, $auth) {
  const userBoards = this;

  const payload = $auth.getPayload();
  userBoards.all = Board.query({ user: payload._id });
}

BoardsShowController.$inject = ['Board', 'Pin', '$state'];
function BoardsShowController(Board, Pin, $state) {
  const boardsShow = this;
  boardsShow.formVisible = false;
  boardsShow.formEditVisible = false;
  boardsShow.board = Board.get($state.params);

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

  boardsShow.delete = deleteBoard;

  //PIN CONTROLLER
  boardsShow.newPin = {};

  function showCreateForm() {
    boardsShow.formVisible = true;
  }

  function hideCreateForm() {
    boardsShow.formVisible = false;
    boardsShow.newPin = {};
  }

  boardsShow.showCreateForm = showCreateForm;
  boardsShow.hideCreateForm = hideCreateForm;

  function createPin() {
    Pin.save({ boardId: $state.params.id }, boardsShow.newPin, () => {
      boardsShow.pin = {};
      hideCreateForm();
      boardsShow.board = Board.get($state.params);
    });
  }

  function showEditForm(pin) {
    // console.log('TRUE!');
    // console.log('this: ',boardsShow.board.pins);
    boardsShow.formEditVisible = true;
    boardsShow.currentPin = pin;
  }

  function hideEditForm() {
    boardsShow.formEditVisible = false;
  }

  PinsEditController.$inject = ['Pin', '$state'];
  function PinsEditController(Pin, $state) {
    const pinsEdit = this;

    pinsEdit.pin = Pin.get($state.params);

    function updatePin() {
      Pin.save({ boardId: $state.params.id }, boardsShow.currentPin, () => {
        $state.go('pinsShow', $state.params);
      });
    }
    pinsEdit.updatePin = updatePin;
    hideEditForm();
  }

  function showPin(pin) {
    console.log('clicked!', pin);

    showEditForm(pin);
  }

  boardsShow.showEditForm = showEditForm;
  boardsShow.hideEditForm = hideEditForm;
  boardsShow.createPin = createPin;
  boardsShow.showPin = showPin;

  function updateBoard(updatedPin) {
    Pin.update({ id: updatedPin._id, boardId: $state.params.id }, updatedPin);
  }
  boardsShow.updateBoard = updateBoard;

}

BoardsEditController.$inject = ['Board', '$state'];
function BoardsEditController(Board, $state) {
  const boardsEdit = this;

  boardsEdit.board = Board.get($state.params);

  function updateBoard() {
    console.log('Running?');
    boardsEdit.board.$update(() => {
      $state.go('boardsShow', $state.params);
    });
  }
  boardsEdit.updateBoard = updateBoard;
}
