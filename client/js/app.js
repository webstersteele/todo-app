todoApp = angular.module('todoApp', ['ui.router'])
  .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('todo', {
              url: '/todo/{username}',
              templateUrl: '/partials/todo.html',
              controller: 'TodoCtrl'
          })
          .state('login', {
              url: '/login',
              templateUrl: '/login.html',
              controller: 'LoginCtrl'
          });
      $urlRouterProvider
          .otherwise('login');
        }]);


  
