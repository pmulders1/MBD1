function PokedexView(model){
	var self = this;

	self.model = model;
    
	self.DrawInitial = function(){
        var items = '';
        for ( var i = 0; i < 20; i++ ) {
            if(self.model.pokemons[i]){
                var str = '';
                
                if(self.model.pokemons[i].isCatched){
                    str = "<span class='isCatched'></span>"
                }
                items += "<li><a id='single' rel='" + i.toString() + "'>" + self.model.pokemons[i].name + str + "</a></li>";
            } else {
                return;
            }
        }
        $("#pokedex-pokelist").append(items).listview("refresh");
	}
    
    self.DrawMore = function(page){
        var items = '';
        var last = $("li", page).length - 1;
        console.log(last);
        for (var i = last; i < last + 5; i++) {
            if(self.model.pokemons[i]){
                var str = '';

                if(self.model.pokemons[i].isCatched){
                    str = "<span class='isCatched'></span>"
                }
                items += "<li><a id='single' rel='" + i.toString() + "'>" + self.model.pokemons[i].name + str + "</a></li>";
            } else {
                return;
            }
        }
        $("#pokedex-pokelist", page).append(items).listview("refresh");

    }
}