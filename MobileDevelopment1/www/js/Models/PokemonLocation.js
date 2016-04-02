function PokemonLocation(lat, long, pokemonModel){
	var self = this;

	//Members
    self.pokemonModel = null;
    
    self.lat = null;
    self.long = null;
    
	//Constructor
	self.init = function(lat, long, pokemonModel){
        self.lat = lat;
        self.long = long;
        self.pokemonModel = pokemonModel;
	}

	self.init(lat, long, pokemonModel);
};