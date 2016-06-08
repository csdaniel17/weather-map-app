//list of cities
var cityIds = [
  4180439,
  5128638,
  4560349,
  4726206,
  4671654,
  5809844,
  5368361,
  5391811,
  5308655,
  4684888,
  4887398,
  5391959,
  5392171,
  4164138,
  4273837,
  5746545,
  4699066,
  5419384,
  4990729
];

var cityIdList = cityIds.join(',');

//icon base url + results.weather[0].icon
var iconBase = 'http://openweathermap.org/img/w/';

//app module
var app = angular.module('app', []);

//app controller
app.controller('MapController', function($scope, $http) {
  $http({
    url:'http://api.openweathermap.org/data/2.5/group',
    params: {
      APPID: 'eac2948bfca65b78a8c5564ecf91d00e',
      id: cityIdList,
      units: 'imperial'
    }
  })
  .success(function(data) {
    $scope.weather = data;
    console.log(data);
    $scope.result = data.list;
    var result = data.list;
    var infowindows = [];
    //add markers
    var markers = result.map(function(result) {
      //image icons base
      var iconBase = 'http://openweathermap.org/img/w/';
      //get coordinates
      var position = { lat: result.coord.lat, lng: result.coord.lon };
      var marker = new google.maps.Marker({
        position: position,
        anchorPoint: new google.maps.Point(0, -15),
        title: result.name,
        map: map,
        // icon: image
        icon: {
          url: iconBase + result.weather[0].icon + '.png',
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 25)
        }
      });
      console.log(result);

      var windowContent =
        '<p><strong>' + result.name.toLowerCase() + '</strong></p>' +
        '<p>weather: ' + result.weather[0].description.toLowerCase() + '<br>' +
        'current temp: ' + result.main.temp + '°F<br>' +
        'high temp: ' + result.main.temp_max + '°F<br>' +
        'low temp: ' + result.main.temp_min + '°F<br>' +
        'pressure: ' + result.main.pressure + ' hPa<br>' +
        'humidity: ' + result.main.humidity + '%<br>' +
        'wind degree: ' + result.wind.deg + '<br>' +
        'wind speed: ' + result.wind.speed + ' mph</p>';

      var infowindow = new google.maps.InfoWindow({
        content: windowContent
      });

      function hideAllInfoWindows(){
        infowindows.forEach(function(infowindow){
          infowindow.close();
        });
      }

      marker.addListener('click', function() {
        hideAllInfoWindows();
        infowindow.open(map, marker);
      });
      infowindows.push(infowindow);

      result.infoWindowSidebar = function() {
        hideAllInfoWindows();
        infowindow.open(map, marker);
      };

      return marker;
    });
    console.log(markers);

  });

  //put map up
  var centerLatLng = {lat: 39.099727, lng: -94.578567};

  var mapOptions = {
    center: centerLatLng,
    zoom: 5
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}); //end controller
