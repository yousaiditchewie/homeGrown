var request  = require('request');
var key      = process.env.GOOGLEKEY || "AIzaSyBhD2pFWRxAHNe5myIMujAcACm-nOYR3YI";
var secret   = process.env.GOOGLESECRET;
var placeUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/output?";

// 1. make http request to lookup location/return lat+lon
function lookupAddress(zipCode) {
  var geoUrl   = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${key}`;

  request(geoUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return (JSON.parse(body).results[0].geometry.location) // Show the HTML for the Google homepage.
    }
  })
};
// lookupAddress(90042); // { lat: 34.1175895, lng: -118.188329 }


// 2. make http request to search places by lat+lon
function lookupPlace(lat, long) {

}
