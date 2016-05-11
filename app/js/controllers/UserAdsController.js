'use strict';

app.controller('UserAdsController', function ($scope, userService, notifyService, pageSize) {

    $scope.adsParams = {
        'startPage': 1,
        'pageSize': pageSize
    };

    $scope.reloadUserAds = function () {
        userService.getUserAds($scope.adsParams,
            function success(data) {
                $scope.userAds = data;
                //console.log(data);
            },
            function error(err) {
                notifyService.showError("Cannot load your ads", err);
            }
        );
    };

    $scope.reloadUserAds();

    $scope.deactivateAd = function (ad) {
        userService.deactivateAd(ad.id,
            function success(data) {
                notifyService.showInfo("ad deactivated");
                ad.status = "Inactive"
            },
            function error(err) {
                notifyService.showError("Cannot deactivate your add", err);
            }
        );
    };

    $scope.publishAgainAd = function (ad) {
        userService.publishAgainAd(ad.id,
            function success(data) {
                notifyService.showInfo("ad published again");
                ad.status = "WaitingApproval"
            },
            function error(err) {
                notifyService.showError("Cannot republish your add", err);
            }
        );
    };


    // This event is sent by RightSideBarController when the current status is changed
    $scope.$on("statusSelectionChanged", function (event, selectedStatus) {
        $scope.adsParams.status = selectedStatus;
        $scope.adsParams.startPage = 1;

        $scope.reloadUserAds();
    });
});