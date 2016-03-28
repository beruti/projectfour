// app contains all the ui-routes
// app contains all the configuration and middleware

angular
  .module('logging', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', '/api')
  .config(MainRouter)
  // intercepting and tracking $http behaviour with authInterceptor service
  // done so with a config block - gets executed during the provider registrations and configuration phase.
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "./js/views/home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "./js/views/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "./js/views/register.html"
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "./js/views/profile.html"
      })
      .state('users', {
        url: "/users",
        templateUrl: "./js/views/users.html"
      })
      .state('chat', {
        url: "/chat",
        templateUrl: "./js/views/chat.html"
      })
      .state('contacts', {
        url: "/contacts",
        templateUrl: "./js/views/contacts.html",
        controller: "ContactsController as contacts"
      })
      .state('addcontact', {
        url: "/contact/new",
        templateUrl: "./js/views/addcontact.html",
        controller: "ContactsController as contacts"
      });

    $urlRouterProvider.otherwise("/");
  }
