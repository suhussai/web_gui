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
  });

} (angular.module('app')) );
