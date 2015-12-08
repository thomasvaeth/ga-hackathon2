var app = angular.module('SweaterApp', ['ngRoute', 'SweaterServices', 'SweaterCtrls']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/sweaters.html',
		controller:  'SweaterCtrl'
	})
	.when('/about', {
		templateUrl: 'app/views/about.html'
	})
	.when('/sweaters/new', {
		templateUrl: 'app/views/new.html',
		controller: 'SweaterNewCtrl'
	})
	.when('/sweaters/delete/:id', {
		templateUrl: 'app/views/show.html',
		controller: 'SweaterDeleteCtrl'
	})
	.when('/sweaters/:id', {
		templateUrl: 'app/views/show.html',
		controller: 'SweaterShowCtrl'
	})
	.when('/login', {
		templateUrl: 'app/views/userLogin.html',
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'app/views/userLogin.html',
		controller: 'SignupCtrl'
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