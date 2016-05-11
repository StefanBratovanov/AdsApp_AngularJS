'use strict';
app.controller('UserDeleteAdController',
    function ($scope, $routeParams, $location, userService, notifyService) {

        function getUserAd(id) {
            userService.getUserAdById(id,
                function success(data) {
                    $scope.adData = data;
                    //$scope.adData.status = "WaitingApproval";
                },
                function error(err) {
                    notifyService.showError("Cannot load user ad", err);
                }
            );
        }

        getUserAd($routeParams.id);

        $scope.deleteAd = function (adData) {
            userService.deleteAd(adData.id,
                function success() {
                    notifyService.showInfo("Ad deleted.");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Delete ad failed", err);
                }
            );
        };
    }
);