angular.module('SweaterServices', ['ngResource'])
.factory('Sweater', ['$resource', function($resource) {
	return $resource('/api/sweaters/:id');
}])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage["secretsweaters-token"] = token;
		},
		getToken: function(token) {
			return $window.localStorage["secretsweaters-token"];
		},
		removeToken: function(token) {
			$window.localStorage.removeItem("secretsweaters-token");
		},
		isLoggedIn: function() {
			var token = this.getToken();
			return token ? true : false;
		}
	}
}])
.factory("AuthInterceptor", ["Auth", function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = "Bearer "+token;
			}
			return config;
		}
	};
}]);