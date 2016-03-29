function PokedexController(){
	var self = this;
    
    //Variables
    self.offset = 0;
    
	//Model
	self.model = null;

	//Views
	self.view = null;

	//Controller
	self.gameController = null;

	//Constructor
	self.init = function(){
		self.getPokemon();
	}

	//Methods
	self.getPokemon = function(){
		apiConnector.GETALL(self.offset, function(result){
			self.model = new PokedexModel(result);
			self.view = new PokedexView(self.model);
			self.view.Draw();
		});
	};
    
    self.refresh = function(){
        self.getPokemon();
    }
    
	//$("#menu-toggle").click(function(e) {
        //e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
    //});

	//self.init();
};