function PokedexModel(){
	var self = this;

	//Members
    self.pokemons = [];
    
	//Constructor
	self.init = function(){
        
	}
    
    self.AddPokemon = function(pokemon){
        self.pokemons.push(pokemon);   
    } 

	self.init();
};