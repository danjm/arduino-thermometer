'use strict';

angular.module('arduinoThermometer', [
  'ui.router',
  'ngJustGage'
]).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('temp', {
        url: '/',
        templateUrl: 'temp.html',
        controller: 'TempCtrl'
    });
});