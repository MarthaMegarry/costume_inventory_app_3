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

app.directive("sortBar", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/sort-bar.html'
    }
});

app.directive("costumeGrid", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/grid.html',
        controller: ['$scope', '$http', function($scope, $http){
            console.log("The controller is firing");
            $http.get('/grid').then(function(res){
                if(res.status !== 200){
                    console.log("erroreroor nonono");
                    throw new Error('Failed to fetch costumes from the API');
                    }
                $scope.costume = {};
                $scope.costumes = res.data;
                console.log(res.data);
                return res.data;
                })
            }],
        controllerAs: "grid"
    }
});

app.directive("gridItem", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/grid-item.html'
    }
});

app.directive("checkOut", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/check-out.html'
    }
});

app.directive("showStatus", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/show-status.html'
    }
});

app.directive("costumeForm", function(){
    return {
        restrict: 'E',
        templateUrl: '../views/costume-form.html',
        controller: ['$scope', '$http', function($scope, $http){
            $scope.submit = function(){
                $http.post('/grid', $scope.form).then(function(res) {
                    if (res.status !== 200) {
                        console.log("erroreroor nonono");
                        throw new Error('Failed to post');
                    }
                })
            }
        }]
    }
});
