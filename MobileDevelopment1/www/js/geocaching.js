//lat, long, rndPokemon
var pokemonLocations = [];

$(document).on("pageshow","#vangpokemon",function(){
    loadLocations();
});

function loadLocations(){
    var pokemons = [];
    var locations = [];
    
    apiConnector.GETALL(0, 150, function(poke){ 
        $.mobile.loading("show", {
            text: "loading...",
            textVisible: true
        });
        var pokemons = poke;
        apiConnector.GET('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.6891047,5.30264&radius=1000&type=cafe&key=AIzaSyAD70kWnbzT-W2SixDKpJRcN5S8PMwfgFc', function(locs){
            var locations = locs;
            
            for(var i = 0; i < 20; i++){
                var pokeIndex = getRandomInt(0, pokemons.results.length - 1)
                var pokemonModel = new PokemonModel();
 
                pokemonModel.name = pokemons.results[pokeIndex].name;
                pokemonModel.url = pokemons.results[pokeIndex].url;
                
                var locIndex = getRandomInt(0, locations.results.length - 1);
                pokemonLocations.push(new PokemonLocation(locations.results[locIndex].geometry.location.lat, locations.results[locIndex].geometry.location.lng, pokemonModel));
                
                delete pokemons[pokeIndex];
                delete locations[locIndex];
            }
            pokemonLocations.push(new PokemonLocation(51.688518, 5.286638, pokemons.results[getRandomInt(0, 149)]));
            $.mobile.loading("hide");
        });
    });
}