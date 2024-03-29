angular.module('threefourths.controllers', ['angular-progress-arc'])

.controller('DashCtrl', function ($scope) {

})

.controller('TimerCtrl', function ($scope, $interval, $timeout) {
    $scope.timersize = "300"; //todo - adjust based on screen size, user optn
    //    $scope.Ttotal = 60;
    //    $scope.Tcurrent = 10;

    $scope.calcPosition = function ($scope) {
        return $scope.timerposition = $scope.Tcurrent / $scope.Ttotal;
    };

    $scope.timerrunning = false;
    $scope.startTimer = function () {
        $scope.timerrunning = true;
    };
    $scope.stopTimer = function () {
        $scope.timerrunning = false;
    };

})

.controller('SettingsCtrl', function ($scope, $ionicPlatform, $cordovaDevice, $cordovaEmailComposer, $cordovaToast) {
    $scope.timeupSettings = [
        {
            text: "Vibrate",
            checked: false
        },
        {
            text: "Beep",
            checked: true
        },
        {
            text: "Automatically start next timer",
            checked: true
        }];
    $scope.miscSettings = [
        {
            text: "Keep device awake",
            checked: true
        },
        {
            text: "Show status on lock screen",
            checked: true
        }];
    $ionicPlatform.ready(function () {
        //get device info with $cordovaDevice
        var device = $cordovaDevice.getDevice();
        $scope.cordova = device.cordova;
        $scope.model = device.model;
        $scope.platform = device.platform;
        $scope.version = device.version;
    });

    $scope.sendEmail = function (type) {
        console.log('clicked email');
        $cordovaEmailComposer.isAvailable().then(function () {
            // is available
            switch (type) {
            case 'social':
                var email = {
                    subject: ['Check out the Threefourths app'],
                    body: ["Hey, check out the Threefourths app! It's really great for getting productive and staying productive!"]
                };
                break;
            case 'help':
                var email = {
                    to: ['Jeremy@threefourths.me'],
                    subject: ['Problem with Threefourths app'],
                    body: ['My device specs are as follows: '.concat($scope.model, ', ', $scope.platform, ' ', $scope.version)]
                };
                break;
            };
            $cordovaEmailComposer.open(email).then(null, function () {
                console.log('email dismissed');
            });

        }, function () {
            // not available
            console.log('email not available');
            // TODO: Send a toast "Looks like you need to set up email first!"
        });
    };

    $scope.showToast = function (msg, duration, position) {
        //all strings; duration = short or long; position = top, center, or bottom
        $cordovaToast.show(msg, duration, position).then(function (success) {
            // successful
            console.log('Toast Success :D');
        }, function (error) {
            // error
            console.log('Toast failed :/');
        });

    };


})