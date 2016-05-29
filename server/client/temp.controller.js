angular
	.module('arduinoThermometer')
	.controller('TempCtrl', function($http, $scope) {
		$scope.temperature = 0;
		
		$scope.getTemperature = function (address) {
			$http.get('http://localhost:3000/geocoordinates?address=' + address).then(
				function (res) {
					$scope.location = res.data.location;
					$scope.temperature = res.data.temperature;
				},
				function (err) {
					console.info('err', err);
				}
			);
		};
	})
;