'use strict';

/* Directives */
var app = angular.module('phonecatApp');


app.directive('authCheck', ['$rootScope', 'userService', '$location'
				, function($rootScope, userService, $location) {
    return {
      restrict: 'C',
      link: function($rootScope, elem, attrs) {
       
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){

			console.log('Verifying login on route change');
			if (!nextRoute.access.isPublic && !userService.user.isLoggedIn) {
				// need to go to root view (where Login is available)
				if (nextRoute.templateUrl !== 'partials/root.html') {
					console.log('triggering redirect due to missing auth');
					$location.path('/');
				}
			}
		});
      }
    }
  }]);
