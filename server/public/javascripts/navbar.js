/**
 * Created by Mothra on 9/28/15.
 */
angular.module('costumeApp')
    .directive("navBar", function(){
        return {
            restrict: 'E',
            templateUrl: '../views/navbar.html'
        }
    });