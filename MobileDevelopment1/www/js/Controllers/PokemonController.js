function PokemonController(){
	var self = this;
    
	//Model
	self.model = null;

	//Views
	self.view = null;

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