'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('todoApp', [
    'ngRoute',
    'ngStorage'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', ["$scope", "$localStorage", function ($scope, $localStorage) {
	$scope.editState = false;
	$scope.editIndex = -1;	
		
	$scope.storage = $localStorage.$default({
		todos: [
			{title:'Görkem', content: 'Bozbıyık', marked: false},
			{title:'Example1', content: 'Example Content 1', marked: false},
			{title:'Example2', content: 'Example Content 2', marked: true},
			{title:'Angular JS Project', content: 'TODO List with Angular JS', marked: true},
			{title:'THE', content: 'END', marked: false}
		],
		countActiveTodos: 3
	});
	
	$scope.add = function() {
		if( $scope.title.length !== 0 ){
			if( $scope.content.length !== 0 ){
				$scope.storage.todos.push({title: $scope.title, content: $scope.content, marked: false});
				$scope.storage.countActiveTodos++;
			}
			else{
				$scope.storage.todos.push({title: $scope.title, content: 'Empty Content', marked: false});
				$scope.storage.countActiveTodos++;
			}
		}
    };
	
	$scope.remove = function(index) {
        if( !$scope.storage.todos[index].marked ){
			$scope.storage.countActiveTodos--;
		}
		$scope.storage.todos.splice(index,1);
		$scope.clear();
    };
	
	$scope.edit = function() {
        if( $scope.editIndex >= 0 && $scope.editIndex < $scope.storage.todos.length ){
			$scope.storage.todos[$scope.editIndex].title = $scope.title;
			$scope.storage.todos[$scope.editIndex].content = $scope.content;
		}
    };
	
	$scope.toggleMarked = function(index) {
		if( $scope.storage.todos[index].marked ){
			$scope.storage.countActiveTodos++;
		}
		else{
			$scope.storage.countActiveTodos--;
		}
        $scope.storage.todos[index].marked = !$scope.storage.todos[index].marked;
		$scope.clear();
    };
	
	$scope.handleEdit = function(index) {
		$scope.editState = true;
		$scope.editIndex = index;
        $scope.title = $scope.storage.todos[index].title;
		$scope.content = $scope.storage.todos[index].content;
    };
	
	$scope.clear = function() {
		$scope.editState = false;
		$scope.editIndex = -1;
        $scope.title = '';
		$scope.content = '';
    };
	
	$scope.removeAllDone = function(i) {
		if( i >= 0 && i < $scope.storage.todos.length ){
			if( $scope.storage.todos[i].marked ){
				$scope.remove(i);
				$scope.removeAllDone(i); // continue from the SAME index as a recursive function
			}
			else{
				$scope.removeAllDone(i+1); // continue from the NEXT index as a recursive function
			}
		}
    };
  }]);

angular.module('todoApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div ng-controller=\"MainCtrl\"> <div class=\"info\"> <h1 ng-if=\"storage.countActiveTodos === 0\"> You have nothing to do </h1> <h1 ng-if=\"storage.countActiveTodos !== 0\"> You have {{storage.countActiveTodos}} {{storage.countActiveTodos === 1 ? 'thing' : 'things'}} to do </h1> <button ng-click=\"removeAllDone(0)\" ng-disabled=\"!(storage.todos.length - storage.countActiveTodos > 0)\">REMOVE ALL DONE</button> </div> <div class=\"main\"> <input type=\"text\" ng-model=\"title\" ng-init=\"title=''\" ng-value=\"title\"> <label class=\"tooltip-label\">Title</label> <input type=\"text\" ng-model=\"content\" ng-init=\"content=''\" ng-value=\"content\"> <label class=\"tooltip-label\">Content</label> <button ng-click=\"editState ? edit() : add()\">{{ editState ? 'EDIT' : 'ADD' }}</button> <button ng-click=\"clear()\">CANCEL</button> </div> <div class=\"list\"> <ol ng-repeat=\"todo in storage.todos | orderBy: 'index'\"> <h3>{{$index+1}}</h3> <label class=\"tooltip-label-title\">Title</label> <label ng-class=\"{'marked': todo.marked}\">{{todo.title}}</label> <label class=\"tooltip-label-content\">Content</label> <label ng-class=\"{'marked': todo.marked}\">{{todo.content}}</label> <div class=\"float-right\"> <button ng-click=\"toggleMarked($index)\">{{todo.marked ? 'UNMARK' : 'MARK AS DONE'}}</button> <button ng-click=\"handleEdit($index)\" ng-disabled=\"todo.marked\">EDIT</button> <button ng-click=\"remove($index)\">REMOVE</button> </div> </ol> </div> </div>"
  );

}]);
