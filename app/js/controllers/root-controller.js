'use strict';

/* Root Controller */

var nmo = angular.module('nmo');

nmo.controller('RootCtrl', 
  ['$scope', '$state', 'userService',
  function($scope, $state , userService) {

    // Initialize isReRequest - used when checking permissions
    // so we don't end up in an endless loop of permissions checking
    // when the user is logged in but inadequately set up for permissions
    var isReRequest = false
  
    function onLogin(user) {
      $state.transitionTo('app.dashboard');
    }

    function onLogout() {
      $state.transitionTo('home');
    }

    function onRefreshUser(user) {
      $scope.$apply();
    }

    function onInadequatePermissions() {
      $state.transitionTo('home');
    }

    function onNotAuthorized() {
      $state.transitionTo('home');
    }

    // Initialize the Authentication Service that underpins the user features
    // give it the callback that should be used when the status changes.
    var config = {
      onLogin: onLogin,
      onLogout: onLogout,
      onRefreshUser: onRefreshUser,
      onNotAuthorized: onNotAuthorized,
      onInadequatePermissions: onInadequatePermissions,
      requiredPermissions: ['public_profile']
    }

    userService.init(config);

    this.$state = $state;
    this.userService = userService;
}]);