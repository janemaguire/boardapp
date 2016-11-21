angular.module('boardApp')
  .directive('youtube', youtube);

function youtube() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      link: '@',
      width: '@',
      height: '@'
    },
    template: '<iframe width="{{ width }}" height="{{ height }}" src="{{ src }}" frameborder="0" allowfullscreen></iframe>',
    link($scope) {
      $scope.src = `https://www.youtube.com/embed/${$scope.link.split('/').splice(-1)[0]}`;
    }
  };
}
