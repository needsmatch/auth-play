'use strict';

/* Controllers */

var nmo = angular.module('nmo');

nmo.controller('HomeCtrl', ['userService',
  function(userService) {
    this.welcome = userService.user.username;
  }]);

nmo.controller('SplashCtrl', ['userService',
  function(userService) {
  }]);

nmo.controller('AppCtrl', ['userService',
  function(userService) {

    var detailURL = "";
    function getDetails(detailID) {
      detailURL = "partials/detail" + detailID + ".html";
    };

    this.detailURL = detailURL;
    getDetails(1);
   
  }]);

nmo.controller('DetailsCtrl', ['userService',
  function(userService) {
  }]);


nmo.controller('appNavCtrl', ['userService', 
  function(userService) {
    this.userService = userService;
  }]);
