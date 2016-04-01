function PokedexView(model){
	var self = this;

	self.model = model;
    
	self.DrawInitial = function(){
        for ( var i = 0; i < self.model.limit; i++ ) {
            $("#pokedex-pokelist").append("<li><a rel='" + self.model.pokemons[i].url + "'>" + self.model.pokemons[i].name + "</a></li>").listview("refresh");
        }
	}
    
    self.DrawMore = function(){
        console.log(self.model)
    }
}