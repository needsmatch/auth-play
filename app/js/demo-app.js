var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/app/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'partials/demo/demo-frame.html',
            resolve: {
                data: function() {
                    return {value: 'frame'};
                }
            }   

        })

        .state('app.home', {
            url: '/home',
            templateUrl: 'partials/demo/demo-home.html', 
            resolve: {
                data: function() {
                    return {value: 'home'};
                }
            }   
        })
        
        // nested list with custom controller
        .state('app.home.list', {
            url: '/list',
            templateUrl: 'partials/demo/demo-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            },
            resolve: {
                data: function() {
                    return {value: 'list'};
                }
            }   
        })
        
        // nested list with just some random string data
        .state('app.home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('app.about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partials/demo/demo-about.html' },
                'columnOne@app.about': { template: 'Look I am a column!' },
                'columnTwo@app.about': { 
                    templateUrl: 'partials/demo/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});