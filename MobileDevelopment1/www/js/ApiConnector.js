var apiConnector = {
    url: 'http://pokeapi.co/api/v2/pokemon/',
    GETALL: function(offset){
		$.getJSON(apiConnector.url + "?limit=4&offset=" + offset, function(data)
	    {
            console.log(data);
            var tableContent = '';
            $.each(data.results, function(){
                $('#main ul').append('<li><a href="#" class="ui-link-inherit" id="showSinglePokemon" rel="' + this.url + '">' + this.name + '</a></li>').click(function(event){
                    event.preventDefault();
                    console.log(event);
                });
            });
		});
    }
}