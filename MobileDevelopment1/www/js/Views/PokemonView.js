function PokemonView(){
	var self = this;

	self.model = null;
    
	self.Draw = function(){
        $('#pokemon-title').append(self.model.name);
        $('#pokemon-sprite').css('background-image', 'url(' + self.model.sprite + ')');
        $('#pokemon-name').html(self.model.name);
        
        if(self.model.isCatched){
            $('#catched').append("<p class='pokemonCatched'></p>");
        }
    
        $('#pokemon-stats').append('<tr><td><strong>Weight</strong></td><td>' + self.model.weight + '</td></tr>');
        $('#pokemon-stats').append('<tr><td><strong>Height</strong></td><td>' + self.model.height + '</td></tr>');
        
        $.each(self.model.stats, function(index, item){
            $('#pokemon-stats').append('<tr><td><strong>' + capitalizeFirstLetter(item.stat.name) + '</strong></td><td>' + item.base_stat + '</td></tr>');
        });
        
        $.each(self.model.types, function(index, item){
         $('#types').append('<span class="type-' + item.type.name + '">' + capitalizeFirstLetter(item.type.name) + '</span>');
        });
	}
    self.setModel= function(model){
        self.model = model;
    }
}