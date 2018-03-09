'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('editState should be false', function () {
    expect(scope.editState).toBe(false);
  });
  
  it('editIndex should be -1', function () {
    expect(scope.editIndex).toBe(-1);
  });
  
  it('storage should be defined', function () {
    expect(scope.storage).toBeDefined();
  });
  
  it('countActiveTodos should be greater and equal than 0', function () {
    expect(scope.storage.countActiveTodos).not.toBeLessThan(0);
  });
  
  it('countActiveTodos should be equal to number of active todos', function () {
    var tempCount = 0;
    for(var i = 0; i < scope.storage.todos.length; i++){
      if( !scope.storage.todos[i].marked ){
        tempCount++;
      }
    }
    expect(scope.storage.countActiveTodos).toBe(tempCount);
  });
});
