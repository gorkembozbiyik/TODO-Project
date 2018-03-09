'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $localStorage) {
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
  });
