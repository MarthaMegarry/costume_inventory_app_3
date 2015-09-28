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

app.directive("navBar", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/navbar.html'
    }
});

app.directive("costumeGrid", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/grid.html'
    }
});

app.directive("gridItem", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/grid-item.html'
    }
});

app.directive("costumeForm", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/costume-form.html'
    }
});
