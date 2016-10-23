// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic.native'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // side menu
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // login state
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // new user state
  .state('new-user', {
    url: '/new-user',
    templateUrl: 'templates/new-user.html',
    controller: 'NewUserCtrl'
  })

  // app home page state
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomePageCtrl'
      }
    }
  })

  // app settings state
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  // history of payments state
  .state('app.History', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })

  // payment process state
  .state('app.PaymentProcess', {
    url: '/payments',
    views: {
      'menuContent': {
        templateUrl: 'templates/payments.html',
        controller: 'PaymentsCtrl'
      }
    }
  })

  // list of restaurants state
  .state('app.restaurants', {
    url: '/restaurants',
    views: {
      'menuContent': {
        templateUrl: 'templates/restaurants.html',
        controller: 'RestaurantsCtrl'
      }
    }
  })

  // single restaurant landing page state
  .state('app.single', {
    url: '/restaurants/:restaurantId',
    views: {
      'menuContent': {
        templateUrl: 'templates/restaurant-landing-page.html',
        controller: 'RestaurantCtrl'
      }
    }
  })

  // menu of single restaurant state
  .state('app.restaurantMenu', {
    url: '/restaurants/menu',
    views: {
      'menuContent': {
        templateUrl: 'templates/restaurant-menu.html',
        controller: 'RestaurantMenuCtrl'
      }
    },
    params: {
      'restaurantId' : 0
    }
  })

  .state('app.review', {
    url: '/restaurants/, review',
    views: {
      'menuContent': {
        templateUrl: 'templates/review.html',
        controller: 'ReviewCtrl'
      }
    }
  })

  .state('app.confirmation', {
    url: '/restaurants/confirm-order',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirm-order.html',
        controller: 'ConfirmOrderCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.service('restaurantsService', function($http) {
   // entire restaurant menu
   var restaurantMenu;
   $http({
    method: 'GET',
    url: 'https://guesswiseserver.appspot.com/_ah/api/clover/v1/items'
  }).success(function(data) {
    console.log(data);
    var deserialized = JSON.parse(data.message);
    console.log(deserialized.elements);
    restaurantMenu = deserialized.elements;

  }).error(function(error) {
    console.log(error);
  })

  var restaurants = [
  {'title':'Chipotle', 'id': 1, restaurantMenu}]

  var getRestaurants = function() {
    return 'Chipotle';
  }
  var getMenuItems = function(){
    return restaurantMenu;
  };

  var getItem = function(itemName) {
    for (var i=0; i<restaurantMenu.length; i++) {
      if (restaurantMenu[i].name == itemName) {
        return restaurantMenu[i];
      }
    }
  }

  var setQuantity = function(itemName, quantity) {
    for (var i=0; i<restaurantMenu.length; i++) {
      if (restaurantMenu[i].name == itemName) {
        restaurantMenu.quantity = quantity;
      }
    }
  }

  var getItemId = function(itemName){
    for (var i=0; i<restaurantMenu.length; i++) {
      if (restaurantMenu[i].name == 'itemName') {
        return restaurantMenu[i].id;
      }
    }
  }

  var changeQuantity = function(number, itemName) {
    for (var i=0; i<restaurantMenu.length; i++) {
      if (restaurantMenu[i].name == 'itemName') {
        restaurantMenu[i].quantity += number;
      }
    }
  }

  var getRestaurantMenu = function(restaurantId) {
    return restaurants[restaurantId].menu;
  };

  return {
    getRestaurants: getRestaurants,
    getRestaurantMenu: getRestaurantMenu,
    getMenuItems: getMenuItems,
    getItemId: getItemId,
  };
})

.service('paymentHistoryService', function() {
  var payments = ['$10', '$11', '$12'];

  var getPaymentHistory = function() {
    return payments;
  }

  return {
    getPaymentHistory: getPaymentHistory
  };
});
