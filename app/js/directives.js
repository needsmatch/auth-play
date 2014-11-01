'use strict';

/* Directives */
// var securityDirectives = angular.module('securityDirectives',[]);

// securityDirectives.directive('checkUser', ['$rootScope', '$location', function ($root, $location) {
// 	return {
// 		link: function (scope, elem, attrs, ctrl) {
// 			$root.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
// 				if (!nextRoute.access.isPublic && !$root.isLoggedIn) {
// 					// need to go to root view (where Login is available)
// 					if (!next.templateUrl === 'partials/root.html') {
// 						$location.path('/');
// 					}
// 				}
// 			});
// 		}
// 	}
// }]);