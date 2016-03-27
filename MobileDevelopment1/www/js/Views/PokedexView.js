function PokedexView(model){
	var self = this;

	self.model = model;
    
	self.Draw = function(){
        console.log(self.model)
        $.each(self.model.pokemons, function(index, pokemon){
            console.log(index)
            $("#pokedex-pokelist").append("<li class='singlepokemon'><a rel='" + pokemon.url + "'>" + pokemon.name + "</a></li>")
        });
	}
}