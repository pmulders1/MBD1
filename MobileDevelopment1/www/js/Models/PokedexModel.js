function PokedexModel(){
	var self = this;

	//Members
    self.pokemons = [];
    self.catchedPokemon = [];
    
    self.current = 0;
    self.limit = 20;
    
	//Constructor
	self.init = function(){
        
	}
    
    self.AddPokemon = function(pokemon){
        self.pokemons.push(pokemon);   
    }
    
    self.AddCatchedPokemon = function(index){
        self.catchedPokemon.push(index);
    }
    
    self.UpdatePokemon = function(index, data){
		self.pokemons[index].isCached = true;
        self.pokemons[index].height = data.height;
        self.pokemons[index].weight = data.weight;
        self.pokemons[index].sprite = data.sprites.front_default;
        self.pokemons[index].stats = data.stats;
        self.pokemons[index].types = data.types;
	};

	self.init();
};