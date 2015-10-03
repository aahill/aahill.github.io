var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider){
    $routeProvider
    
    .when('/welcome', {
        templateUrl : 'pages/welcome.html',
        controller : 'contentController',
    })

    .when('/about', {
        templateUrl : 'pages/about.html',
        controller : 'contentController',
    })
    .otherwise({
    	controller: 'contentController',
    	redirectTo: '/welcome'
    });
});
