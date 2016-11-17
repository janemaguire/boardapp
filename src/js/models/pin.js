angular.module('boardApp')
  .factory('Pin', Pin);

Pin.$inject = ['$resource'];
function Pin ($resource) {
  return new $resource('/boards/:boardId/pins/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
