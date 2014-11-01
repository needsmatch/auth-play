'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['userServices']);

phonecatControllers.controller('RootCtrl', 
  ['$scope', '$route', '$routeParams', '$location', 'userService',
  function($scope, $route, $routeParams, $location, userService) {
    console.log('RootCtrl');
    this.user = userService.user;
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    this.login = function(user) {
      userService.login(user);
      console.log('ng logging in user: ' + user.username );
    };

    this.logout = function(user) {
      console.log('ng logging out user: ' + user.username );
      userService.logout(user);
    };

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

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone', 'userServices',
  function($scope, $routeParams, Phone, userService) {
      console.log('PhoneDetailCtrl');
      
      this.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
      }
      
      this.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
                              $scope.mainImageUrl = phone.images[0];
                            });

  }]);


