function PokemonLocation(id, lat, long, pokemonModel){
	var self = this;

	//Members
    self.pokemonModel = null;
    self.id = -1;
    self.lat = null;
    self.long = null;
    
	//Constructor
	self.init = function(id, lat, long, pokemonModel){
        self.id = id;
        self.lat = lat;
        self.long = long;
        self.pokemonModel = pokemonModel;
	}

	self.init(id, lat, long, pokemonModel);
};