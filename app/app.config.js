(function(module) {
  module.config(function($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise('/');

    // setup routing
    $stateProvider
      // landing page
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .state('motorTest', {
        url: '/motorTest',
        templateUrl: 'app/motorTest/motorTest.html',
        controller: 'rosController',
        controllerAs: 'rosControl'
      })
  });

} (angular.module('app')) );
