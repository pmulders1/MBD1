function PokedexController(){
	var self = this;

	self.model = null;

	self.listview = null;    
    self.singleview = null;
    
	self.init = function(){
        // Create models and views for this controller
        self.model = new PokedexModel();
        self.listview = new PokedexView(self.model);
        self.singleview = new PokemonView();
        // Get innitial list of pokemon.
		self.getPokemon(function(){
            self.getPokemon();
        });
	}

	self.getPokemon = function(callback){

        // Check if you are not going to fetch the same pokemon again.
        if(self.model.offset + self.model.limit > self.model.pokemons.length){
            
            // Do the api call based on offset and limit.
            apiConnector.GETALL(self.model.offset, self.model.limit, function(result){

                // Loop trough results and add them to the model.
                $.each(result.results, function(index, item){
                    var pokemon = new PokemonModel()
                    pokemon.name = capitalizeFirstLetter(item.name);
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
        if(self.model.offset + self.model.limit > self.model.pokemons.length){
            self.listview.DrawInitial();
        } else {
            $.mobile.loading("show", {
                text: "loading...",
                textVisible: true
            });
            setTimeout(function() {
                self.listview.DrawInitial();
                $.mobile.loading("hide");
            }, 1000);
        }
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
        
        var last = $("li", page).length;
        var cont = last + self.model.limit - 1;
        
        if(last + self.model.limit - 1 > self.model.pokemons.length){
            $.mobile.loading("show", {
                text: "loading more..",
                textVisible: true
            });
            self.getPokemon(function(){
                $.mobile.loading("hide");
                self.getPokemon();
                self.listview.DrawMore(page, last, cont);
            });
        }else{
            self.getPokemon();
            self.listview.DrawMore(page, last, cont);
        }
        $(document).on("scrollstop", self.checkScroll);
    }
    
    self.getSinglePokemon = function(index){
        if(!self.model.pokemons[index].isCached){
            apiConnector.GET(self.model.pokemons[index].url, function(result){
                self.model.pokemons[index].updatePokemon(result);
                $.mobile.pageContainer.pagecontainer("change", "singlepokemon.html");  
                self.singleview.setModel(self.model.pokemons[index]);
            });
        }else{
            $.mobile.pageContainer.pagecontainer("change", "singlepokemon.html");
            self.singleview.setModel(self.model.pokemons[index]);
        }
	};
    self.getRandomPokemon = function(callback){
        var index = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
        console.log(index);
        apiConnector.GET('http://pokeapi.co/api/v2/pokemon/' + index, function(result){
            console.log(result);
            var pokemon = new PokemonModel()
            pokemon.name = capitalizeFirstLetter(result.name);
            pokemon.url = result.url;
            
            if(callback){
                callback(pokemon); 
            }
        });
    };
	self.init();
};