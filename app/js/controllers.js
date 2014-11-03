'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['userServices']);

phonecatControllers.controller('RootCtrl', 
  ['$scope', '$route', '$routeParams', '$location', 'userService',
  function($scope, $route, $routeParams, $location, userService) {
    console.log('RootCtrl');
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    this.userService = userService;

    $scope.rootController = this;
}]);

phonecatControllers.controller('LandingCtrl', ['userService',
  function(userService) {
    this.welcome = 'Hello World';
  }]);

phonecatControllers.controller('PhoneListCtrl', ['Phone', 'userService',
  function(Phone, userService) {
    console.log('PhoneListCtrl');
    this.phones = Phone.query();
    this.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone', 'userService',
  function($scope, $routeParams, Phone, userService) {
      console.log('PhoneDetailCtrl');
      
      this.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
      }
      
      this.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
                              $scope.mainImageUrl = phone.images[0];
                            });

  }]);


