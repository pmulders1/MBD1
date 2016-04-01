function PokemonView(model){
	var self = this;

	self.model = model;
    
	self.Draw = function(){
        console.log(self.model);
	}
}