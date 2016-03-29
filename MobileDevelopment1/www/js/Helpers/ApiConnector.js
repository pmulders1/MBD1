var apiConnector = {
    url: 'http://pokeapi.co/api/v2/pokemon/',
    GETALL: function(offset, callback){
		$.getJSON(apiConnector.url + "?limit=20&offset=" + offset, function(data)
	    {
            callback(data);
		});
    },
    GET: function(url, callback){
        $.getJSON(url, function(data){
            callback(data); 
        });
    }
}