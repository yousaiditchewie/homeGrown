(function(){
  'use strict';

  angular
    .module('homeGrownApp')
    .config(AppRoutes);

  AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('homePage', {
        url: '/',
        templateUrl: '/templates/home.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
  }
})();
