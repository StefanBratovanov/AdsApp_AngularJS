'use strict';
app.controller('UserEditAdController',
    function ($scope, $routeParams, $location, townsService, categoriesService, userService, notifyService) {

        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        //$scope.adData = {};

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


        $scope.editAd = function (adData) {
            userService.editAd(adData,
                function success() {
                    notifyService.showInfo("Advertisement submitted for approval. Once approved, it will be published.");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Edit ad failed", err);
                }
            );
        };

        $scope.fileSelected = function (fileInputField) {
            $scope.deleteImg();
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.deleteImg = function () {
            delete $scope.adData.imageDataUrl;
            $scope.adData.changeImage = true;
        }
    }
);