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

BoardsShowController.$inject = ['Board', '$state'];
function BoardsShowController(Board, $state) {
  const boardsShow = this;

  boardsShow.board = Board.get($state.params);

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

  boardsShow.delete = deleteBoard;
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
