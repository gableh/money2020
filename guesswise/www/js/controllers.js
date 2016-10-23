angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
  $scope.logout = function() {
    $state.go('login');
  }
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.LogIn = function(user) {
    if(user.username == 'kowshik') {
      user.username = '';
      user.password = '';
      $state.go('app.home');
    } else {
      user.username = '';
      user.password = '';
      console.log('---- wrong username');
    }
  };
})

.controller('NewUserCtrl', function($scope, $state) {
  $scope.CreateUser = function() {
    $state.go('app.home');
    console.log('---welcome');
  }
})

.controller('HomePageCtrl', function($scope, $state, $cordovaCamera, $ionicPlatform) {
  $scope.goToSettings = function () {
    $state.go('app.settings');
  }
  // wait for ondeviceready, or use $ionicPlatform.ready() if you're using Ionic Framework 1
  $scope.takePicture = function (options) {
    var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
   };
  $scope.goToHistory = function() {
    $state.go('app.History');
  }
})

.controller('PaymentsCtrl', function($scope, $state) {

})
.controller('HistoryCtrl', function($scope, paymentHistoryService) {
  $scope.payments = paymentHistoryService.getPaymentHistory();
})

.controller('SettingsCtrl', function($scope, paymentHistoryService) {
})

.controller('RestaurantsCtrl', function($scope, restaurantsService) {
  $scope.restaurants = restaurantsService.getRestaurants();
})

.controller('RestaurantCtrl', function($scope, $stateParams, $state, $ionicPopup, restaurantsService) {
  $scope.goToMenu = function() {
    var restaurantId = $stateParams.restaurantId - 1;
    $state.go('app.restaurantMenu', {'restaurantId' : restaurantId});
  }

  $scope.goToReview = function() {
    $state.go('app.review');
  }

  $scope.callWaiter = function() {
    $ionicPopup.alert({
      title: 'Confirmed',
      template: 'A waiter will be with you in a short while!'
    })
  }
})

.controller('RestaurantMenuCtrl', function($scope, $stateParams, restaurantsService) {
  console.log($stateParams);
  $scope.restaurantMenu = restaurantsService.getRestaurantMenu($stateParams.restaurantId);
})

.controller('ReviewCtrl', function($scope, $state, $ionicPopup){
  $scope.submitReview = function(){
    $ionicPopup.alert({
      title: 'Confirmed',
      template: 'Thank you for submitting your review!'
    });
    $state.go('app.single')
  }
});
