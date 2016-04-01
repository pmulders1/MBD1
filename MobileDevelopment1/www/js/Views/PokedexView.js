function PokedexView(model){
	var self = this;

	self.model = model;
    
	self.DrawInitial = function(){
        var items = '';
        for ( var i = 0; i < self.model.limit; i++ ) {
            items += "<li><a rel='" + self.model.pokemons[i].url + "'>" + self.model.pokemons[i].name + "</a></li>";
        }
        $("#pokedex-pokelist").append(items).listview("refresh");
	}
    
    self.DrawMore = function(page, last, cont){
        var items = '';
        for (var i = last; i < cont; i++) {

            items += "<li><a href='" + self.model.pokemons[i].url + "'>" + self.model.pokemons[i].name + "</a></li>";
        }

        $("#pokedex-pokelist", page).append(items).listview("refresh");
    }
}