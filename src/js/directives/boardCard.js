angular.module('boardApp')
  .directive('boardCard', boardCard);

boardCard.$inject = ['youtubeService'];
function boardCard(youtubeService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/boardCard.html',
    scope: {
      board: '='
    },
    link($scope) {
      $scope.images = $scope.board.pins.map((pin) => {
        if(pin.type === 'image') return pin.link;
        if(pin.type === 'youtube') return `http://i3.ytimg.com/vi/${youtubeService.getCode(pin.link)}/hqdefault.jpg`;
      }).slice(0,3);
    }
  };
}
