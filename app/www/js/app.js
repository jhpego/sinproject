// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])



.run(function ($ionicPlatform) {

    //on every refresh page
    /*
    $myapp.GetSettings();
    console.log("after settings: ", $myapp.Settings)
    */


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    
  });


})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

      .state('app.ads', {
      cache: false,
      url: '/ads',
      views: {
        'menuContent': {
            templateUrl: 'templates/ads.html',
            controller: 'AllAdsCtrl'
        }
      }
    })
      .state('app.myads', {
        cache: false,
        url: '/myads',
      views: {
        'menuContent': {
          templateUrl: 'templates/myads.html',
          controller: 'MyAdsCtrl'
        }
      }
    })

      .state('app.config', {
          url: '/config',
          views: {
              'menuContent': {
                  templateUrl: 'templates/config.html',
                  controller: 'OtherCtrl'
              }
          }
      })

      .state('app.profile', {
          url: '/profile',
          views: {
              'menuContent': {
                  templateUrl: 'templates/profile.html',
                  controller: 'OtherCtrl'
              }
          }
      })


      .state('app.ad', {
        cache: false,
        url: '/myads/:ad_id',
        views: {
          'menuContent': {
            templateUrl: 'templates/myad.html',
            controller: 'MyAdCtrl'
          }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/ads');




});
