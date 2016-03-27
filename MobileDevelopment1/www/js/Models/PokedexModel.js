function PokedexModel(data){
	var self = this;

	//Members
    self.pokemons = []

	//Constructor
	self.init = function(data){
        console.log(data)
        $.each(data.results, function(index, item){
            var pokemon = new PokemonModel();
            pokemon.name = item.name
            pokemon.url = item.url
            self.pokemons.push(pokemon)
        });
	}

         
               
	//Methods
	//self.getPokemon = function(){
		
	//};

	//$("#menu-toggle").click(function(e) {
        //e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
    //});

	self.init(data);
};