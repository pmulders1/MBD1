function PokemonController(){
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
		
	}

	//Methods
	self.getSinglePokemon = function(url){
		apiConnector.GET(url, function(result){
            console.log(result);
		});
	};
};