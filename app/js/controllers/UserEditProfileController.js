'use strict';

app.controller('UserEditProfileController',
    function ($scope, $location, $rootScope, authService, townsService, notifyService) {
        //$rootScope.pageTitle = "Edit profile";

        $scope.towns = townsService.getTowns();

        $scope.getUserProfile = function () {
            authService.getUserProfile(function success(data) {
                    $scope.userData = data;
                    //console.log(data);
                },
                function error(err) {
                    notifyService.showError("Cannot load your profile", err);
                }
            );
        };

        $scope.getUserProfile();

        $scope.updateProfile = function (userData) {
            authService.editUser(userData,
                function success() {
                    notifyService.showInfo("User profile updated successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Update failed", err);
                }
            );
        };

        $scope.changePassword = function (passData) {
            authService.changePass(passData,
                function success() {
                    notifyService.showInfo("User password changed successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User password change failed", err);
                }
            );
        };
    }
);
