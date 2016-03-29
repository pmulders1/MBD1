function PokedexView(model){
	var self = this;

	self.model = model;
    
	self.Draw = function(){
        console.log(self.model)
        $.each(self.model.pokemons, function(index, pokemon){
            $("#pokedex-pokelist").append("<li><a rel='" + pokemon.url + "' id='single'>" + pokemon.name + "</a></li>").listview("refresh")
        });
	}
}