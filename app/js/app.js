'use strict';

/* App Module */

var nmo = angular.module('nmo', [
  'ui.router',
  'ngRoute',
  'userServices'
]);

// makes it so we don't need the # in the URLs
nmo.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// configures the states
nmo.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('loading', {
        url: '/',
        templateUrl: 'partials/loading.html',
        isPublic: true
      })
      .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        isPublic: true
      })
      .state('app', {
        abstract: true,
        templateUrl: 'partials/app/app.html',
         controller: 'AppCtrl',
         controllerAs: 'app',
         isPublic: false
      })
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'appNav@app': { templateUrl: "partials/app/app.nav.html",
                          controller: "appNavCtrl",
                          controllerAs: "nav",
                          isPublic: false
                          }
         ,'appContent@app': { templateUrl: 'partials/app/app.content.html',
                              isPublic: false
                            }
        }
      })
      .state('app.dashboard.profile', {
        url: "/profile",
        templateUrl: "partials/app/app.profile.html",
        isPublic: false
      })
      .state('app.dashboard.need', {
        url: "/need",
        templateUrl: 'partials/app/app.need.html',
        isPublic: false
      })
  }]);

nmo.run(['$rootScope', 'userService', '$state', function($rootScope, userService, $state){

    $rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
                console.log('$stateChangeStart from <' + fromState.name + '> to <' + toState.name + '> for <' + userService.user.username + '>');

                if (!toState.isPublic && !userService.user.isLoggedIn) {

                  event.preventDefault();

                  console.log('$stateChangeStart prevented - not authorized');

                  $state.transitionTo('home');

                }

        });

    // $rootScopes
    //     .$on('$stateChangeSuccess',
    //         function(event, toState, toParams, fromState, fromParams){ 
    //             console.log("State Change: State change success!");
    //     });

    // $rootScope
    //     .$on('$stateChangeError',
    //         function(event, toState, toParams, fromState, fromParams){ 
    //             console.log("State Change: Error!");
    //     });

    // $rootScope
    //     .$on('$stateNotFound',
    //         function(event, toState, toParams, fromState, fromParams){ 
    //             console.log("State Change: State not found!");
    //     });

    // $rootScope
    //     .$on('$viewContentLoading',
    //         function(event, viewConfig){ 
    //             console.log("View Load: the view is loaded, and DOM rendered!");
    //     });

    // $rootScope
    //     .$on('$viewcontentLoaded',
    //         function(event, viewConfig){ 
    //             console.log("View Load: the view is loaded, and DOM rendered!");
    //     });

}]);



