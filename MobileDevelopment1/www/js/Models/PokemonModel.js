function PokemonModel(){
	var self = this;

	//Memberss
    self.id = null;
	self.name = null;
    self.url = null;
    self.isCached = false;
    self.isCatched = false;
    
    self.height = null;
    self.weight = null;
    
    self.sprite = null;
    
    self.stats = [];
    self.types = [];
	//Constructor
	//self.init = function(){
		
	//}

	//Methods
	self.updatePokemon = function(data){
		self.isCached = true;
        console.log(data);
        self.height = data.height;
        self.weight = data.weight;
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