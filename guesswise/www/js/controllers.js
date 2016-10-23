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

.controller('HomePageCtrl', function($scope, $state) {
  $scope.goToSettings = function () {
    $state.go('app.settings');
  }

  $scope.scanQRCode = function() {
    
  }

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

.controller('RestaurantCtrl', function($scope, $stateParams, $state, $location, restaurantsService) {
  $scope.goToMenu = function() {
    var restaurantId = $location.url().substring($location.url().lastIndexOf('/'));
    $state.go('app.restaurantMenu', restaurantId);
  }
})

.controller('RestaurantMenuCtrl', function($scope, $stateParams, restaurantsService) {
  $scope.restaurantMenu = restaurantsService.getRestaurantMenu($stateParams.restaurantId);
});
