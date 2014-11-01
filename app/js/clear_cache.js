
var phonecatApp = angular.module('phonecatApp');

phonecatApp.run(function($rootScope, $templateCache) {
	$rootScope.$on('$viewContentLoaded', function() {
		console.log('clearing template cache');
      	$templateCache.removeAll();
   });
});