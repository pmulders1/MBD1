function PokedexController(){
	var self = this;

	//Model
	self.model = null;

	//Views
	self.view = null;    

	//Constructor
	self.init = function(){
        // Create models and views for this controller
        self.model = new PokedexModel();
        self.view = new PokedexView(self.model);
        
        // Get innitial list of pokemon.
		self.getPokemon(function(){
            self.getPokemon();
        });
	}

	//Methods
	self.getPokemon = function(callback){
        console.log("offset: " + self.model.offset);
        console.log("limit: " + self.model.limit);
        console.log("length of pokemon: " + self.model.pokemons.length);
        // Check if you are not going to fetch the same pokemon again.
        if(self.model.offset + self.model.limit > self.model.pokemons.length){
            
            // Do the api call based on offset and limit.
            apiConnector.GETALL(self.model.offset, self.model.limit, function(result){

                // Loop trough results and add them to the model.
                $.each(result.results, function(index, item){
                    var pokemon = new PokemonModel()
                    pokemon.name = item.name;
                    pokemon.url = item.url;
                    self.model.AddPokemon(pokemon);
                });
                self.model.offset = self.model.pokemons.length;

                if(callback){
                   callback(); 
                }
            });
        }
	};

    self.refresh = function(){
        self.view.DrawInitial();
    }

	//$("#menu-toggle").click(function(e) {
        //e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
    //});

	self.init();
};