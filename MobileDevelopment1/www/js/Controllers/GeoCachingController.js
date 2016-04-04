function GeoCachingController(callback){
	var self = this;

	self.model = null;

	self.view = null;
    
	self.init = function(callback){
        // Create models and views for this controller
        self.model = new GeoCachingModel();
        self.getLocationWithPokemon(callback);
	}
    
    self.getLocationWithPokemon = function(callback){
        
        var locations = [];
        
        apiConnector.GET('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.6891047,5.30264&radius=1000&type=cafe&key=AIzaSyAD70kWnbzT-W2SixDKpJRcN5S8PMwfgFc', function(locs){
            var locations = locs;

            for(var i = 0; i < 20; i++){
                var pokeIndex = getRandomInt(0, 30)
                
                var locIndex = getRandomInt(0, locations.results.length - 1);
                self.model.AddCache(new PokemonLocation(i , locations.results[locIndex].geometry.location.lat, locations.results[locIndex].geometry.location.lng, pokedexController.model.pokemons[pokeIndex]));

                delete locations[locIndex];
            }
            
            // School even handmatig toevoegen als waypoint.
            self.model.AddCache(new PokemonLocation(self.model.caches.length, 51.688518, 5.286638, pokedexController.model.pokemons[getRandomInt(0, pokedexController.model.pokemons.length - 1)]));
            
            if(callback){
                callback();
            }
        });
        
    };
    
    $(document).on("pageshow","#vangpokemon",function(){
        $('#map-canvas').on('click', '#catchPokemon', function (event) {
            event.preventDefault();
            var index = $(this).attr('rel');
            var location;
            
            navigator.geolocation.getCurrentPosition(function(position, index){
                location = [position.coords.latitude, position.coords.longitude];
            },
            function(error)
            {
                console.log('code: ' + error.code + ' with message: ' + error.message + '\n');
            });
            
            var distance = getDistanceFromLatLonInKm(location[0], location[1], self.model.caches[index].lat, self.model.caches[index].long) * 1000;
            
            if(distance < 50){
                self.model.caches[index].pokemonModel.isCatched = true;
                pokedexController.getSinglePokemon(self.model.caches[index].pokemonModel.pokemonid);
                pokedexController.registerCatchedPokemon(self.model.caches[index].pokemonModel.pokemonid);
            }else{
                $('.costumPopup').html('<p>You are not close enough!</p><p>Get closer and try again</p>').fadeToggle( "slow", "linear" );
                
                 setTimeout(function() {
                    $('.costumPopup').html('').fadeToggle( "slow", "linear" );
                }, 3000);
            }
        });
    });
    
	self.init(callback);
};