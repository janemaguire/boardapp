angular.module('boardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
  .controller('BoardsEditController', BoardsEditController);

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

BoardsShowController.$inject = ['Board', 'Pin', '$state'];
function BoardsShowController(Board, Pin, $state) {
  const boardsShow = this;
  boardsShow.formVisible = false;
  boardsShow.board = Board.get($state.params);

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

  boardsShow.delete = deleteBoard;

  //PIN CONTROLLER
  boardsShow.newPin = {};

  function showForm() {
    boardsShow.formVisible = true;
  }

  function hideForm() {
    boardsShow.formVisible = false;
    boardsShow.newPin = {};
  }

  boardsShow.showForm = showForm;
  boardsShow.hideForm = hideForm;

  function createPin() {
    boardsShow.pin.boardId = $state.params.id;
    Pin.save(boardsShow.pin, () => {
      hideForm();
      boardsShow.board = Board.get($state.params);
      console.log(boardsShow.pin);
    });
  }

  function showPin() {
    console.log('clicked!');
  }

  boardsShow.createPin = createPin;
  boardsShow.showPin = showPin;
}

BoardsEditController.$inject = ['Board', '$state'];
function BoardsEditController(Board, $state) {
  const boardsEdit = this;

  boardsEdit.board = Board.get($state.params);

  function updateBoard() {
    boardsEdit.board.$update(() => {
      $state.go('boardsShow', $state.params);
    });
  }
  boardsEdit.update = updateBoard;
}
