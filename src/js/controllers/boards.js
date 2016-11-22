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

  boardsIndex.queryString = '';

  function filter(board) {
    const regex = new RegExp(boardsIndex.queryString, 'i');
    return regex.test(board.title) || regex.test(board.tags);
  }

  boardsIndex.filter = filter;
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
  userBoards.currentBoard;
  userBoards.showDeleteForm = false;

  const payload = $auth.getPayload();
  userBoards.all = Board.query({ user: payload._id });

  function showEditForm(board) {
    userBoards.currentBoard = board;
    userBoards.formEditVisible = true;
  }

  function hideEditForm() {
    console.log('clicked hide form!');
    userBoards.formEditVisible = false;
  }

  function showDeleteForm() {
    // userBoards.currentBoard = board;
    console.log('clicked show delete form!');
    // userBoards.showDeleteForm = true;
  }

  function hideDeleteForm() {
    console.log('clicked delete form!');
    userBoards.showDeleteForm = false;
  }


  function updateBoard(currentBoard) {
    Board.update({ id: currentBoard._id, boardId: $state.params.id }, currentBoard);
    console.log('Why?');
  }

  userBoards.showEditForm = showEditForm;
  userBoards.hideEditForm = hideEditForm;
  userBoards.updateBoard = updateBoard;
  userBoards.showDeleteForm = showDeleteForm;
  userBoards.hideDeleteForm = hideDeleteForm;

  //DELETE BOARD
  function deleteBoard(deletedBoard) {
    console.log('clciked delete', deletedBoard);
    console.log('clicked!', deletedBoard);
    deletedBoard.$remove(() => {
      $state.reload();
    });
  }
  userBoards.delete = deleteBoard;
}

//SHOW BOARDS CONTROLLER
BoardsShowController.$inject = ['Board', 'Pin', '$state', '$auth'];
function BoardsShowController(Board, Pin, $state, $auth) {
  const boardsShow = this;
  boardsShow.formVisible = false;
  boardsShow.formEditVisible = false;
  boardsShow.board = Board.get($state.params);
  // boardsShow.showDeleteForm = false;

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

  //SHOW COPY FORM
  function showCopyForm(pin) {
    boardsShow.copyPin = pin;
    delete boardsShow.copyPin._id;

    const payload = $auth.getPayload();
    boardsShow.all = Board.query({ user: payload._id });

    console.log('clicked', boardsShow.all);
    boardsShow.formCopyVisible = true;
  }

  boardsShow.showCopyForm = showCopyForm;

  function copyPinToBoard(board) {
    Pin.save({ boardId: board._id }, boardsShow.copyPin, () => {
      $state.reload();
    });
  }

  boardsShow.copyPinToBoard = copyPinToBoard;

  function hideCopyForm() {
    boardsShow.formCopyVisible = false;
  }

  boardsShow.hideCopyForm = hideCopyForm;

  //EDIT PIN CONTROLLER
  function showEditForm(pin) {
    boardsShow.formEditVisible = true;
    boardsShow.currentPin = pin;
  }

  function hideEditForm() {
    boardsShow.formEditVisible = false;
  }

  function deletePin(pin) {
    console.log('delete me', pin);
    Pin.remove({ id: pin._id, boardId: $state.params.id }, () => {
      $state.reload();
      // $state.go('boardsShow', { id: board._id });
    });
  }

  boardsShow.deletePin = deletePin;

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
      console.log('clicked');
      $state.go('boardsShow', $state.params);
    });
  }
  boardsEdit.updateBoard = updateBoard;
}
