(function(){
  angular.module('homeGrownApp', ['ui.router'])
         .config(function($httpProvider) {
          $httpProvider.interceptors.push('authInterceptor');
         })
         .run(['authService', function(authService){
           if (authService.isLoggedIn()) authService.setUser();
         }]);
})();
