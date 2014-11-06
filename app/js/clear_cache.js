
var nmo = angular.module('nmo');

nmo.run(function($rootScope, $templateCache) {
	$rootScope.$on('$viewContentLoaded', function(data) {
		console.log('loaded template: ');
      	//$templateCache.removeAll();
   });
});