var express = require('express');
var router = express.Router();
var _ = require('lodash');
var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
var request = require('request');

var weatherUrl = function (longitude, latitude) {
	var baseApi = 'http://api.wunderground.com/api/8fc24b145de3dac9/conditions/q/';
	baseApi+=latitude;
	baseApi+=',';
	baseApi+=longitude;
	baseApi+='.json';
	return baseApi;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
	var expressResponse = res;
	geocoder.geocode(req.query.address, function(err, geoCodeResponse) {
		console.info('geoCodeResponse', geoCodeResponse);
		var location = geoCodeResponse[0].formattedAddress;
		request(weatherUrl(geoCodeResponse[0].longitude, geoCodeResponse[0].latitude), function (error, weatherResponse, body) {
			var conditions = JSON.parse(body).current_observation;
		  	if (!error && weatherResponse.statusCode == 200) {
				// console.log(conditions);
			}
			// expressResponse.render('geocoordinates', {
			// 	temperature: conditions.temp_c,
			// 	location: conditions.display_location.city
			// });
			expressResponse.send({
				temperature: conditions.temp_c,
				location: location
			});
	    })
	});
	// console.log(req.query);
});

module.exports = router;
