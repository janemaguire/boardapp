angular.module('boardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
  .controller('BoardsEditController', BoardsEditController)
  .controller('UserBoardsController', UserBoardsController);

//SHOW ALL BOARDS
BoardsIndexController.$inject = ['Board'];
function BoardsIndexController(Board){
  const boardsIndex = this;

  boardsIndex.all = Board.query();
}

//CREATE NEW BOARD
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

//SHOW BOARDS BY USER
UserBoardsController.$inject = ['Board', '$auth', '$state'];
function UserBoardsController(Board, $auth, $state) {
  const userBoards = this;
  userBoards.formEditVisible = false;

  const payload = $auth.getPayload();
  userBoards.all = Board.query({ user: payload._id });

  //DELETE BOARD
  function deleteBoard(board) {
    console.log('clicked!', board);
    board.$remove(() => {
      $state.reload();
    });
  }
  userBoards.delete = deleteBoard;

  function showEditForm(board) {
    userBoards.formEditVisible = true;
    userBoards.board = board;
  }

  function hideEditForm() {
    userBoards.formEditVisible = false;
  }

  userBoards.showEditForm = showEditForm;
  userBoards.hideEditForm = hideEditForm;

  function updateBoard() {
    userBoards.board.$update(() => {
      $state.reload();
    });
  }
  userBoards.updateBoard = updateBoard;
}

//SHOW BOARDS CONTROLLER
BoardsShowController.$inject = ['Board', 'Pin', '$state'];
function BoardsShowController(Board, Pin, $state) {
  const boardsShow = this;
  boardsShow.formVisible = false;
  boardsShow.formEditVisible = false;
  boardsShow.board = Board.get($state.params);

  //ADD PIN CONTROLLER
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

  //CREATE PIN
  function createPin() {
    Pin.save({ boardId: $state.params.id }, boardsShow.newPin, () => {
      boardsShow.pin = {};
      hideCreateForm();
      boardsShow.board = Board.get($state.params);
    });
  }

  //EDIT PIN CONTROLLER
  function showEditForm(pin) {
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

  //UPDATE BOARD CONTROLLER WITH EDIT PIN
  function updateBoard(updatedPin) {
    Pin.update({ id: updatedPin._id, boardId: $state.params.id }, updatedPin);
  }
  boardsShow.updateBoard = updateBoard;

}

//EDIT BOARD
BoardsEditController.$inject = ['Board', '$state'];
function BoardsEditController(Board, $state) {
  const boardsEdit = this;

  boardsEdit.board = Board.get($state.params);

  function updateBoard() {
    boardsEdit.board.$update(() => {
      $state.go('boardsShow', $state.params);
    });
  }
  boardsEdit.updateBoard = updateBoard;
}
