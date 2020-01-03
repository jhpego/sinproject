angular.module('starter.services', [])
    .service('$myapp', function ($http) {
        var _this = this;

        this.Settings = null;

        this.User = {
            id: 4
        }


        this.GetSettings = function (after) {
            if (_this.Settings != null) {
                console.log("Config OK: ", _this.Settings);
                after();
                return;
            }   
            $http.get('config.json').then(function (response) {                
                _this.Settings = response.data;
                console.log("Config retrieved: ", _this.Settings);
                after();
            }, function (response) {
                console.warn("Config not found!");
            })
        }

    })


    .service('$ads', function ($http, $myapp) {
        var _this = this;

        this.FetchAd = function ($myscope) {
            $myapp.GetSettings(function () {
                $http.get($myapp.Settings.server + '/api/ads/' + $myscope.MyAd.id).then(function (response) {
                    $myscope.MyAd = response.data[0];
                    console.log("My Ad: ", $myscope.MyAd);
                })
            })
        }

        this.UpdateAd = function ($myscope) {
            $myapp.GetSettings(function () {
                $http.post($myapp.Settings.server + '/api/ads/' + $myscope.MyAd.id, $myscope.MyAd).then(function (response) {
                    //$myscope.CurrAd = response.data[0];
                    console.log("updated ad: " + $myscope.id )
                })
            })
        }

        this.FetchMyAds = function ($myscope) {
            $myapp.GetSettings(function () {
                $http.get($myapp.Settings.server + '/api/ads/user/' + $myapp.User.id).then(function (response) {
                    $myscope.MyAds = response.data;
                })
            })
        }

        this.FetchAllAds = function ($myscope) {
            $myapp.GetSettings(function () {
                $http.get($myapp.Settings.server + '/api/ads/').then(function (response) {
                    $myscope.AllAds = response.data;
                })
            })
        }
});