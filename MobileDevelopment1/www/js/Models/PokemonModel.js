function PokemonModel(){
	var self = this;

	//Members
	self.name = null;
    self.url = null;
    self.isCached = false;
    self.isCatched = false;
    
    self.height = null;
    self.weight = null;
    
    self.sprite = null;
    
    self.stats = [];
    self.types = [];
};