'use strict';

app.controller('HomeController',
    function ($scope, $rootScope, adsService, notifyService, pageSize) {
        adsService.getAds(null, function success(data) {
            $scope.adsParams = {
                'startPage': 1,
                'pageSize': pageSize
            };

            $scope.reloadAds = function () {
                adsService.getAds($scope.adsParams,
                    function success(data) {
                        $scope.ads = data
                    },
                    function error(err) {
                        notifyService.showError("Cannot load ads", err);
                    }
                );
            };
            $scope.reloadAds();
        });

        // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("categorySelectionChanged", function (event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;

            $scope.reloadAds();
        });

        // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("townSelectionChanged", function (event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;

            $scope.reloadAds();
        });
    });