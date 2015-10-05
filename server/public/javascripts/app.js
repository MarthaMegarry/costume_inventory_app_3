/**
 * Created by Mothra on 9/28/15.
 */
var app = angular.module('costumeApp', ['ngRoute', 'angularFileUpload', 'xeditable']);

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
            console.log("The costumeGrid controller is firing");
            $http.get('/grid').then(function(res){
                if(res.status !== 200){
                    console.log("error error nonono");
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
        templateUrl: '../views/grid-item.html',
        controller: ['$scope', '$filter', '$http', function($scope, $filter, $http){
            console.log("gridItem Controller is firing")
            console.log($scope.costume);

            $scope.cosGender = [
                {value: "Women's", text: "Women's"},
                {value: "Men's", text: "Men's"},
                {value: "Unisex", text: "Unisex"}
            ];

            $scope.checkedOut = [
                {value: "Available", text: "Available"},
                {value: "On Hold", text: "On Hold"},
                {value: "Pulled", text: "Pulled"},
            ];

            //
            //if($scope.checkedOut == "On Hold"){
            //    $scope.css({class: "onHold"})
            //} else if ($scope.checkedOut == "Pulled"){
            //    $scope.css({class: "pulled"})
            //}


            $scope.submitChanges = function(){
                return $http({
                    url: '/grid',
                    method: 'PUT',
                    data: $scope.costume
                }).then(function(res) {
                    if (res.status = !200) {
                        console.log("Error, did not update DB");
                    }
                })
            }



        }]
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
        controller: ['$scope', '$http', 'FileUploader', function($scope, $http, FileUploader){

            //Upload when user selects file

            $scope.uploader = new FileUploader();
            $scope.uploader.url = "/grid/upload";
            $scope.uploader.onAfterAddingFile = function(item) {
                item.upload();
                item.onSuccess = function(response, status, headers) {
                    console.log("Item upload success!");
                    console.log(response);
                    $scope.form.cosPic = response;
                };

                item.onError = function(response, status, headers) {
                    console.log("Item upload failed...");
                    console.log("Response:" , response);
                    console.log("Status: " , status);
                    console.log("Headers: " , headers);
                };
            };

            //Submit the rest of the form

            $scope.submit = function(){
                $http.post('/grid', $scope.form).then(function(res) {
                    if (res.status !== 200) {
                        console.log("erroreroor nonono");
                        throw new Error('Failed to post');
                    }
                }).then(
                    console.log("Awesome you got to here!"),
                    $scope.form = null
                )
            };



        }]
    }
});
