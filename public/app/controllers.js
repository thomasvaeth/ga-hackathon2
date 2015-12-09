angular.module('SweaterCtrls', ['SweaterServices'])
.controller('SweaterCtrl', ['$scope', 'Sweater', function($scope, Sweater) {
	$scope.sweaters = [];

	Sweater.query(function success(data) {
  	var shuffleData = shuffle(data);
		$scope.sweaters = shuffleData;
	}, function error(data) {
		console.log(data);
	});

	// -> Fisher–Yates shuffle algorithm
	function shuffle(arr) {
		var m = arr.length, t, i;
		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = arr[m];
			arr[m] = arr[i];
			arr[i] = t;
		}
		return arr;
	}
}])
.controller('SweaterNewCtrl', [
	'$scope',
	'$location',
	'Sweater',
	function($scope, $location, Sweater) {
		$scope.createSweater = function() {
			var params = {
				name: $scope.name,
				gender: $scope.gender,
				holiday: $scope.holiday,
				picture: $scope.picture,
				price: $scope.price,
				link: $scope.link
			}

			var newSweater = new Sweater(params);
			newSweater.$save();
			$location.path('/');
		}
}])
.controller('SweaterDeleteCtrl', [
	'$location', 
	'$routeParams', 
	'Sweater', 
	function($location, $routeParams, Sweater) {
		Sweater.remove({id:$routeParams.id}, function success(data) {
			$location.path('/');
		}, function error(data) {
			console.log(data);
		});
	}
])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
	$scope.logout = function() {
		Auth.removeToken();
	};
}])
.controller('LoginCtrl', [
	'$scope',
	'$http',
	'$location',
	'Auth',
	function($scope, $http, $location, Auth) {
		$scope.user = {
			email: "",
			password: ""
		};

		$scope.adminLogin = function() {
			$http.post('/api/auth', $scope.user).then(function success(res) {
				Auth.saveToken(res.data.token);
				$location.path('/');
			}, function error(res) {
				console.log(res.data);
			});
		};
}]);