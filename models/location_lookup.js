var request  = require('request');
var key      = process.env.GOOGLEKEY || "AIzaSyBhD2pFWRxAHNe5myIMujAcACm-nOYR3YI";
var secret   = process.env.GOOGLESECRET;

// store response from google geo in memory to use in #2
var lat;
var lng;

// #1. make http request to lookup location/return lat+lon
function suggestLocation(zipCode) {
  var geoUrl   = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${key}`;

  request(geoUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      lat = JSON.parse(body).results[0].geometry.location.lat;
      lng = JSON.parse(body).results[0].geometry.location.lng;
      lookupPlace(lat, lng);
    }
  })
};

// #2. make http request to search places by lat+lon
function lookupPlace(lat, lng) {
  var placeUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=600&type=park&key=${key}`;
  request(placeUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body).results);
    }
  })
};

// lookupPlace(34.1175895, -118.188329);
// 1933 South Broadway Los Angeles, CA 90007
suggestLocation('4770 York Blvd Los Angeles, CA 90042');

