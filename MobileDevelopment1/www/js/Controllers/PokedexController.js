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
        
        //intel.xdk.device.launchExternal('http://www.intel.com');
        
        // Get innitial list of pokemon.
        self.getCatchedPokemonFromLocal();
        if(self.checkCache()){
            self.getFromLocal();
            if(initcallback){
                initcallback();
            }
        } else {
            self.getAllPokemon(function(){
                
                if(initcallback){
                    initcallback();
                }
                
                self.saveToLocal();
            });
        }
	}

	self.getAllPokemon = function(callback){
        console.log("get data from webs")
        // Do the api call based on offset and limit.
        apiConnector.GETALL(0, 721, function(result){

            // Loop trough results and add them to the model.
            $.each(result.results, function(index, item){
                var pokemon = new PokemonModel();
                pokemon.pokemonid = index;
                pokemon.name = capitalizeFirstLetter(item.name);
                pokemon.url = item.url;
                self.model.AddPokemon(pokemon);
            });
            
            self.syncListOfCatchedPokemon();

            if(callback){
               callback(); 
            }
        });
	};
    
    self.saveToLocal = function(){
        var temp = new Date();
        var date = new Date(temp.setHours(temp.getHours() + 2));
        
        window.localStorage.setItem("pokemonsTime", date);
        window.localStorage.setItem("pokemons", JSON.stringify(self.model.pokemons));
    };
    
    self.getFromLocal = function(){
        self.model.pokemons = JSON.parse(window.localStorage.getItem("pokemons"));
        console.log("get data from local")
        self.syncListOfCatchedPokemon();
    }
    
    self.checkCache = function(){
        var time = window.localStorage.getItem("pokemonsTime");
        
        if(time == null){
            // data niet gezet.. ga maa api call doen en daarna tijd/data op local storage
            return false;
        }

        if(new Date(time) < new Date()){
            // Tijd voorbij. doe maar api call en save data.
            return false;
        } else {
            return true;
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
        
        if(self.model.pokemons.length < 20){
            $.mobile.loading("show", {
                text: "loading more..",
                textVisible: true
            });
            setTimeout(function() {
                self.listview.DrawMore(page);
                $.mobile.loading("hide");
            }, 1000);
        }else{
            self.listview.DrawMore(page);
        }
        $(document).on("scrollstop", self.checkScroll);
    }
    
    self.getSinglePokemon = function(index, callback){
        console.log(self.model.pokemons[index]);
        if(!self.model.pokemons[index].isCached){
            apiConnector.GET(self.model.pokemons[index].url, function(result){
                self.model.UpdatePokemon(index, result);
                self.singleview.setModel(self.model.pokemons[index]);
                self.singleview.Draw();
                if(callback){
                    callback();
                }
            });
        }else{
            self.singleview.setModel(self.model.pokemons[index]);
            self.singleview.Draw();
            if(callback){
                callback();
            }
        }
	};
    
    self.getRandomPokemon = function(callback){
        var index = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
        apiConnector.GET('http://pokeapi.co/api/v2/pokemon/' + index, function(result){
            var pokemon = new PokemonModel()
            pokemon.name = capitalizeFirstLetter(result.name);
            pokemon.url = result.url;
            
            if(callback){
                callback(pokemon); 
            }
        });
    };
    
    self.registerCatchedPokemon = function(index){
        console.log("Register pokemon" + index);
        if(window.localStorage.getItem("catchedPokemon")){
            this.model.catchedPokemon = JSON.parse(window.localStorage.getItem("catchedPokemon"));
            console.log('Cached pokemon #'+index);
        }
        this.model.AddCatchedPokemon(index);
        window.localStorage.setItem("catchedPokemon", JSON.stringify(this.model.catchedPokemon));
        
        console.log(this.model.catchedPokemon);
    }
    
    self.getCatchedPokemonFromLocal = function(){
        if(window.localStorage.getItem("catchedPokemon")){
            this.model.catchedPokemon = JSON.parse(window.localStorage.getItem("catchedPokemon"));
        }
    }
    
    self.syncListOfCatchedPokemon = function(){
        $.each(self.model.catchedPokemon, function(index, item){
            self.model.pokemons[item].isCatched = true;
        });
        
    }
    
    var tempindex;
    // refresh als de pokedex page weergeven wordt
    $(document).on("pageshow","#pokedex",function(){
        $(document).on("scrollstop", self.checkScroll);
        $('#pokedexContainer').on('tap', '#single', function (event) {
            //event.preventDefault();
            //event.stopPropagation();
            tempindex = $(this).attr('rel');
         });
        self.refresh();
    });
    
    $(document).on("pageshow", "#singlepokemon", function(){
        console.log('hoooii');
        $.mobile.loading("show", {
            text: "loading more..",
            textVisible: true
        });
        self.getSinglePokemon(tempindex, function(){
            $.mobile.loading("hide");
            console.log("CALLBACK!!!")
        });
    });
    
	self.init(initcallback);
};