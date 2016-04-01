function PokemonModel(){
	var self = this;

	//Members
	self.name = null;
    self.url = null;
    self.isCached = false;
    self.isCatched = false;
    
    self.height = null;
    self.width = null;
    
    self.sprite = null;
    
    self.stats = [];
    self.types = [];
	//Constructor
	//self.init = function(){
		
	//}

	//Methods
	self.updatePokemon = function(data){
		self.isCached = true;
        self.height = data.height;
        self.width = data.width;
        self.sprite = data.sprites.front_default;
        self.stats = data.stats;
        self.types = data.types;
	};

	//$("#menu-toggle").click(function(e) {
        //e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
    //});

	//self.init();
};