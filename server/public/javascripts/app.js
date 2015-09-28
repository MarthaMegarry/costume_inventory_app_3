/**
 * Created by Mothra on 9/28/15.
 */
var app = angular.module('costumeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $routeProvider.when('/',
        {
            templateUrl: '/views/home.html'
        }).when('/costumes',
        {
            templateUrl: '/views/costumes.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);

