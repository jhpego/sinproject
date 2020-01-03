angular.module('starter.controllers', ['starter.services'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $myapp) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

    //Browse All Ads
    .controller('AllAdsCtrl', function ($scope, $ads) {

        $ads.FetchAllAds( $scope );

    })

    //List My ads
    .controller('MyAdsCtrl', function ($scope, $ads) {

        $ads.FetchMyAds($scope);
    })


    //Update/Edit my Ad
    .controller('MyAdCtrl', function ($scope, $stateParams, $ads) {

        $scope.MyAd = { id: $stateParams.ad_id };
        $ads.FetchAd($scope);

        $scope.UpdateAd = function () {
            $ads.UpdateAd($scope)
        }

})

    .controller('OtherCtrl', function ($scope, $stateParams) {
        console.log("other controller", $stateParams, $scope)
});