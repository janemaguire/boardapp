angular.module('boardApp')
  .factory('Board', Board);

Board.$inject = ['$resource'];
function Board ($resource) {
  return new $resource('/boards/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
