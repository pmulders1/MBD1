(function (global) {
    "use strict";
 
    function onDeviceReady () {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        $(document).on("pageshow","#vangpokemon",function(){
            loadMapsApi();
        });
    }
 
    function onOnline () {
        loadMapsApi();
    }
 
    function onResume () {
        loadMapsApi();
    }
 
    function loadMapsApi () {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAD70kWnbzT-W2SixDKpJRcN5S8PMwfgFc&libraries=places&callback=onMapsApiLoaded');
    }
    
    var infowindow;
    var map;
    
    global.onMapsApiLoaded = function () {
        // Maps API loaded and ready to be used.
        var denbosch = {lat: 51.6891047, lng: 5.30264};
        map = new google.maps.Map(document.getElementById("map-canvas"), {
            center: denbosch,
            zoom: 15
        });
        
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: denbosch,
                radius: 5000,
                type: ['school']
            }, callback);
        }

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('hi');
                for (var i = 0; i < geoCachingController.model.caches.length; i++) {
                    createMarker(geoCachingController.model.caches[i]);
                }
            }
        }

        function createMarker(place) {
           console.log(place);
            var marker = new google.maps.Marker({
                map: map,
                icon: 'http://orig12.deviantart.net/32d7/f/2011/257/9/d/pokeball_icon__by_kurisutikyo-d49v0cn.gif',
                position: new google.maps.LatLng( place.lat, place.long),
            });

            google.maps.event.addListener(marker, 'click', function() {

            infowindow.setContent('<div><strong>' + capitalizeFirstLetter(place.pokemonModel.name) + '</strong></div>');
            infowindow.open(map, this);
            });
        };
        
        document.addEventListener("deviceready", onDeviceReady, false);
})(window);