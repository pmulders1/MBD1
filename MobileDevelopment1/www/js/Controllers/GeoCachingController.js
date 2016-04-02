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
                var pokeIndex = getRandomInt(0, pokedexController.model.pokemons.length - 1)

                var locIndex = getRandomInt(0, locations.results.length - 1);

                self.model.AddCache(new PokemonLocation(locations.results[locIndex].geometry.location.lat, locations.results[locIndex].geometry.location.lng, pokedexController.model.pokemons[pokeIndex]));

                delete locations[locIndex];
            }
            // School even handmatig toevoegen als waypoint.
            self.model.AddCache(new PokemonLocation(51.688518, 5.286638, pokedexController.model.pokemons[getRandomInt(0, pokedexController.model.pokemons.length - 1)]));
            
            if(callback){
                callback();
            }
        });
        
    };
    
	self.init(callback);
};