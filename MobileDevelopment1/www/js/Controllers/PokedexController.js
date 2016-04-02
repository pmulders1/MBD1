function PokedexController(initcallback){
	var self = this;

	self.model = null;

	self.listview = null;    
    self.singleview = null;
    
	self.init = function(initcallback){
        // Create models and views for this controller
        self.model = new PokedexModel();
        self.listview = new PokedexView(self.model);
        self.singleview = new PokemonView();
        // Get innitial list of pokemon.
		self.getAllPokemon(initcallback);
	}

	self.getAllPokemon = function(callback){

        // Do the api call based on offset and limit.
        apiConnector.GETALL(0, 721, function(result){

            // Loop trough results and add them to the model.
            $.each(result.results, function(index, item){
                var pokemon = new PokemonModel()
                pokemon.name = capitalizeFirstLetter(item.name);
                pokemon.url = item.url;
                self.model.AddPokemon(pokemon);
            });
            
            
            //self.cacheData();
            console.log(window.localStorage.getItem("pokemons"));

            if(callback){
               callback(); 
            }
        });
	};
    
    self.cacheData = function(){
        var time = window.localStorage.getItem("pokemonsTime");
        if(time != null && new Date(time) > new Date()){
            
        } else {
            
            window.localStorage.setItem("pokemonsTime", date);
        }
    }

    self.refresh = function(){
        if(self.model.pokemons.length > 20){
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
        
        if(self.model.pokemons.length < 20){
            $.mobile.loading("show", {
                text: "loading more..",
                textVisible: true
            });
            setTimeout(function() {
                self.listview.DrawMore(page, last, cont);
                $.mobile.loading("hide");
            }, 1000);
        }else{
            self.listview.DrawMore(page, last, cont);
        }
        $(document).on("scrollstop", self.checkScroll);
    }
    
    self.getSinglePokemon = function(index){
        
        console.log(self.model.pokemons[index].isCached)
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
        $.mobile.loading("hide");
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
    
    // refresh als de pokedex page weergeven wordt
    $(document).on("pageshow","#pokedex",function(){
        $(document).on("scrollstop", self.checkScroll);
        $('#pokedexContainer').on('click', '#single', function (event) {
            //event.preventDefault();
            //event.stopPropagation();
            
            $.mobile.loading("show", {
                text: "Loading data...",
                textVisible: true
            });
            
            self.getSinglePokemon($(this).attr('rel'));
         });
        self.refresh();
    });
    
    $(document).on("pageshow","#singlepokemon",function(){
        self.singleview.Draw();
    });
    
	self.init(initcallback);
};