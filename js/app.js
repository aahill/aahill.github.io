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
    .when('/projects', {
    	templateUrl : 'pages/projects.html',
    	controller : 'contentController'
    })
    .when('/contact', {
        templateUrl : 'pages/contact.html',
        controller : 'contentController'
    })
    .when('/template', {
        tempalteUrl : 'pages/projects.html',
        controller : 'contentController'
    })
    .otherwise({
    	controller: 'contentController',
    	redirectTo: '/welcome'
    });
});
