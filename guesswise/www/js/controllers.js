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

.controller('HomePageCtrl', function($scope, $state, $cordovaCamera, $ionicPlatform, $cordovaBarcodeScanner) {
  $scope.goToSettings = function () {
    $state.go('app.settings');
  }
  // wait for ondeviceready, or use $ionicPlatform.ready() if you're using Ionic Framework 1
  $scope.takePicture = function (options) {
    $cordovaBarcodeScanner
    .scan()
    .then(function(result) {
      var id = result.text;
      alert('success!');
      $state.go('app.single', {restaurantId: result.text});
    }, function(error) {
        // An error occurred
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

.controller('RestaurantCtrl', function($scope, $stateParams, $state, $ionicPopup, restaurantsService, $http, $rootScope) {
  $scope.goToMenu = function() {
    $http({
      method: 'GET',
      url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/order?tableId=1'
    }).success(function(data) {
      console.log(data);
      var deserialized = JSON.parse(data.message);
      console.log(deserialized.elements);
      $rootScope.orderId = deserialized.id;
      console.log($rootScope.orderId);
    }).error(function(error) {
    console.log(error);
  })
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

  $scope.openOrder = function() {
    $http({
      method: 'GET',
      url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/order?tableId=1'
    }).success(function(data) {
      console.log(data);
      var deserialized = JSON.parse(data.message);
      console.log(deserialized.elements);
      $rootScope.orderId = deserialized.id;
      console.log($rootScope.orderId);
    }).error(function(error) {
    console.log(error);
  })
  }
})

.controller('RestaurantMenuCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, restaurantsService, $http) {
 $scope.restaurantMenu = restaurantsService.getMenuItems();

 $scope.updateQuantity = function(item) {
  restaurantsService.setQuantity(item.name, item.quantity);
}

$scope.addToOrder = function() {
 $scope.orderMenu = [];

 if($scope.restaurantMenu.length > 0) {
  for(var i =0; i<$scope.restaurantMenu.length; i++) {
  if($scope.restaurantMenu[i].quantity > 0) {
    $scope.orderMenu.push({"price": $scope.restaurantMenu[i]['price'],
      "quantity": $scope.restaurantMenu[i]['quantity'],
      "id": $scope.restaurantMenu[i]['id'],
      "name": $scope.restaurantMenu[i]['name']});
  }
 }
} else {
  $ionicPopup.alert({
    title: 'Ooops!',
    template: 'Please choose a dish!'
  })
}
console.log($scope.orderMenu);

$http({
  method: 'POST',
  url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/orders/edit_order?tableId=1',
  data: {
    'lineItems': $scope.orderMenu,
    'tableId': 1, 
  }
})
$state.go('app.confirmation');
}
})

.controller('ReviewCtrl', function($scope, $state, $ionicPopup){
  $scope.submitReview = function(){
    $ionicPopup.alert({
      title: 'Confirmed',
      template: 'Thank you for submitting your review!'
    });
    $state.go('app.single')
  }
})

.controller('ConfirmOrderCtrl', function($scope, $state, $ionicPopup, $timeout, restaurantsService, $http, $rootScope) {
  $scope.restaurantMenu = restaurantsService.getMenuItems();
  $scope.orderMenu = [];
  $scope.totalCost = 0;
  for(var i =0; i<$scope.restaurantMenu.length; i++) {
    if($scope.restaurantMenu[i].quantity > 0) {
      $scope.orderMenu.push($scope.restaurantMenu[i]);
      $scope.totalCost += $scope.restaurantMenu[i]['price'] * $scope.restaurantMenu[i]['quantity'];
    }
  }

  $scope.placeOrder = function() {
    var myPopup = $ionicPopup.alert({
      template: '<center><ion-spinner icon="lines"></ion-spinner> <br> <p>Your order is being placed</p><center>'
    });
    $timeout(function() {
      myPopup.close();
    }, 3000);
    console.log('------ reaching');
    var data ='';
    var response='';
    console.log($rootScope.orderId);
    console.log($scope.orderMenu[0]['id']);

    var data=[];

    for(var i =0; i<$scope.orderMenu.length; i++) {
      for(var j=0; j<$scope.orderMenu[i]['quantity']; j++) {
        data.push($scope.orderMenu[i]['id']);
      }
    }
     $http({
       method: 'GET',
       url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/orders/confirm_order?orderId=' + $rootScope.orderId
     })
  }

  $scope.payOrder = function() {
    var myPopup = $ionicPopup.alert({
      template: '<center><p>Payment Successful!</p><center>'
    });
    $timeout(function() {
      myPopup.close();
    }, 3000);
    $http({
      method: 'GET',
      url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/pay?orderId=' + $rootScope.orderId

    })
  }
});
