var app = angular.module('SweaterApp', ['ngRoute', 'SweaterServices', 'SweaterCtrls']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/sweaters.html',
		controller:  'SweaterCtrl'
	})
	.when('/sweaters/new', {
		templateUrl: 'app/views/new.html',
		controller: 'SweaterNewCtrl'
	})
	.when('/sweaters/delete/:id', {
		templateUrl: 'app/views/sweaters.html',
		controller: 'SweaterDeleteCtrl'
	})
	.when('/admin', {
		templateUrl: 'app/views/adminLogin.html',
		controller: 'LoginCtrl'
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}])
.run(['$rootScope', 'Auth', function($rootScope, Auth) {
	$rootScope.isLoggedIn = function() {
		return Auth.isLoggedIn.apply(Auth);
	}
}]);