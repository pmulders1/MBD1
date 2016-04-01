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
    
    self.checkScroll = function(){
        var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
        screenHeight = $.mobile.getScreenHeight(),
        contentHeight = $(".ui-content", activePage).outerHeight(),
        header = $(".header", activePage).outerHeight() - 1,
        scrolled = $(window).scrollTop(),
        footer = $(".footer", activePage).outerHeight() - 1,
        scrollEnd = (contentHeight - screenHeight + header + footer) - 600;
        if (activePage[0].id == "pokedex" && scrolled >= scrollEnd) {
            self.addMore(activePage);
        }
    }
    self.addMore = function(page){
        $(document).off("scrollstop");
        //$.mobile.loading("show", {
        //text: "loading more..",
        //textVisible: true
        //});
        
        
        //setTimeout(function() {
        
        var last = $("li", page).length;
        var cont = last + self.model.limit - 1;
        
        if(last + self.model.limit - 1 > self.model.pokemons.length){
            console.log('groter dan');
            $.mobile.loading("show", {
                text: "loading more..",
                textVisible: true
            });
            self.getPokemon(function(){
                $.mobile.loading("hide");
                self.getPokemon();
                self.view.DrawMore(page, last, cont);
            });
        }else{
            console.log('kleiner dan');
            self.getPokemon();
            self.view.DrawMore(page, last, cont);
        }
        $(document).on("scrollstop", self.checkScroll);
        //}, 500);
    }

	self.init();
};