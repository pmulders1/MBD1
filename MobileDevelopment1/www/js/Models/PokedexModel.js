function PokedexModel(){
	var self = this;

	//Members
    self.pokemons = [];
    
    self.offset = 0;
    self.limit = 20;
    
	//Constructor
	self.init = function(){
        
	}
    
    self.AddPokemon = function(pokemon){
        self.pokemons.push(pokemon);   
    } 
    
	//Methods
	//self.getPokemon = function(){
		
	//};

	//$("#menu-toggle").click(function(e) {
        //e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
    //});

	self.init();
};