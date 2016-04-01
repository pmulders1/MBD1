function PokemonView(){
	var self = this;

	self.model = null;
    
	self.Draw = function(){
        $('#pokemon-title').append(self.model.name);
        $('#pokemon-name').html(self.model.name);
	}
    self.setModel= function(model){
        self.model = model;
    }
}