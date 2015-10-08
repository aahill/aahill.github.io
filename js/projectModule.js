var projectModule = angular.module('projectModule',['ngAnimate','ngRoute','app']);

projectModule.config(function($routeProvider){
	$routeProvider
	.when('/poly',{
		templateUrl: 'pages/poly.html',
		controller: 'polyController'
	});

});