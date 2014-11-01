'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'userServices'
]);

phonecatApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing',
        access: { isPublic: true}
      }).
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl',
        controllerAs: 'phoneList',
        access: { isPublic: false}
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl',
        controllerAs: 'phoneDetail',
        access: { isPublic: false}
      }).
      otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  }]);
