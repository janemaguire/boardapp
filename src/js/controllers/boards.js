angular.module('boardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsFollowingController', BoardsFollowingController)
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

//SHOW FOLLOW BOARDS
BoardsFollowingController.$inject = ['Board', '$auth'];
function BoardsFollowingController(Board, $auth) {
  const boardsFollowing = this;
  const payload = $auth.getPayload();

  boardsFollowing.all = Board.query({ followedBy: payload._id });
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
  userBoards.deleteVerificationVisible = false;
  userBoards.currentBoard;
  userBoards.deleteBoard;

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

  function updateBoard(currentBoard) {
    Board.update({ id: currentBoard._id, boardId: $state.params.id }, currentBoard);
  }

  //SHOW DELETE VERIFICATION
  function showDeleteVerification(board) {
    userBoards.deleteBoard = board;
    console.log('clicked', userBoards.deleteBoard);
    userBoards.deleteVerificationVisible = true;
  }

  //HIDE DELETE VERIFICATION
  function hideDeleteVerification() {
    userBoards.deleteVerificationVisible = false;
  }

  //DELETE BOARD
  function deleteBoard() {
    console.log('DELETED!', userBoards.deleteBoard);
    userBoards.deleteBoard.$remove(() => {
      $state.reload();
    });
  }

  userBoards.delete = deleteBoard;
  userBoards.showDeleteVerification = showDeleteVerification;
  userBoards.showEditForm = showEditForm;
  userBoards.hideEditForm = hideEditForm;
  userBoards.updateBoard = updateBoard;
  userBoards.hideDeleteVerification = hideDeleteVerification;
}

//SHOW BOARDS CONTROLLER
BoardsShowController.$inject = ['Board', 'Pin', '$state', '$auth'];
function BoardsShowController(Board, Pin, $state, $auth) {
  const boardsShow = this;
  const payload = $auth.getPayload();
  const userId = payload._id ;
  boardsShow.following = false;
  boardsShow.isOwnBoard = false;
  boardsShow.formVisible = false;
  boardsShow.formEditVisible = false;
  boardsShow.showPinContent = false;
  boardsShow.board = Board.get($state.params, () => {
    if(boardsShow.board.followedBy.indexOf(userId)>-1) {
      boardsShow.following = true;
    }
    if(boardsShow.board.user._id === userId) {
      boardsShow.isOwnBoard = true;
      console.log(true);
    }
  });

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
    boardsShow.pinContentVisible = false;
  }

  function hideEditForm() {
    boardsShow.formEditVisible = false;
  }

  function showPinContent(pin) {
    boardsShow.currentPin = pin;
    console.log('clicked!', pin);
    boardsShow.pinContentVisible = true;
  }

  function hidePinContent() {
    boardsShow.pinContentVisible = false;
  }

  function showPin(pin) {
    console.log('clicked!', pin);
    showEditForm(pin);
  }

  function deletePin(pin) {
    console.log('delete me', pin);
    Pin.remove({ id: pin._id, boardId: $state.params.id }, () => {
      $state.reload();
      // $state.go('boardsShow', { id: board._id });
    });
  }

  boardsShow.deletePin = deletePin;

  //UPDATE BOARD CONTROLLER WITH EDIT PIN
  function updateBoard(updatedPin) {
    Pin.update({ id: updatedPin._id, boardId: $state.params.id }, updatedPin);
  }

  //FOLLOW BOARD
  function followBoard() {
    boardsShow.board.followedBy.push(userId);

    boardsShow.board.$update((board) => {
      console.log('succes, followed board:', board);
      boardsShow.following = true;
    });
  }

  //UN-FOLLOW BOARD
  function unfollowBoard() {
    const index = boardsShow.board.followedBy.indexOf(userId);
    boardsShow.board.followedBy.splice(index,1);

    boardsShow.board.$update((board) => {
      console.log('succes, unfollowed board:', board);
      boardsShow.following = false;
    });
  }

  boardsShow.unfollowBoard = unfollowBoard;
  boardsShow.followBoard = followBoard;
  boardsShow.updateBoard = updateBoard;
  boardsShow.showEditForm = showEditForm;
  boardsShow.hideEditForm = hideEditForm;
  boardsShow.createPin = createPin;
  boardsShow.showPin = showPin;
  boardsShow.showPinContent = showPinContent;
  boardsShow.hidePinContent = hidePinContent;

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
