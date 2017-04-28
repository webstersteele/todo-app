todoApp.controller('TodoCtrl', function($rootScope, $scope, todosFactory) {
 
  $scope.todos = [];
  $scope.isEditable = [];
 
  // get all Todos on Load
  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
  });
 
  // Save a Todo to the server
  $scope.save = function($event) {
    if ($event.which == 13 && $scope.todoInput) {
 
      todosFactory.saveTodo({
        "todo": $scope.todoInput,
        "isCompleted": false,
        "priority": 0
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.todoInput = '';
    }
  };

  $scope.incrementPriority = function(todo, event, _id, index){
      todo.priority+=1;
      updateStatus(event, _id, index);
  };

    $scope.decreasePriority = function(todo, event, _id, index){
        if(todo.priority >= 1){
            todo.priority-=1;
        }else{
            todo.priority = 0;
        }
        updateStatus(event, _id, index);
    };
 
  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.todos[i];
    todosFactory.updateTodo({
      _id: _id,
      isCompleted: cbk,
      todo: _t.todo,
      priority: _t.priority
    }).then(function(data) {
      if (data.data.ok) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };
 
  // Update the edited Todo
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.todos[i];
      todosFactory.updateTodo({
        _id: _t._id,
        todo: $event.target.value.trim(),
        isCompleted: _t.isCompleted,
        priority: _t.priority
      }).then(function(data) {
        if (data.data.ok) {
          _t.todo = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };
 
  // Delete a Todo
  $scope.delete = function(i) {
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };
 
});

todoApp.controller('LoginCtrl', function($rootScope, $scope, todosFactory) {
    // Save a Todo to the server
    $scope.save = function($event) {
        if ($scope.username && $scope.password) {

            todosFactory.saveTodo({
                "username": $scope.username,
                "todoList": {
                    "todo": "sample",
                    "isCompleted": false
                }
            }).then(function(data) {
                $scope.todos.push(data.data);
            });
            $scope.todoInput = '';
        }
    };
});