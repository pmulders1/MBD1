/* check scroll function */
function checkScroll() {
  var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
    screenHeight = $.mobile.getScreenHeight(),
    contentHeight = $(".ui-content", activePage).outerHeight(),
    header = $(".header", activePage).outerHeight() - 1,
    scrolled = $(window).scrollTop(),
    footer = $(".footer", activePage).outerHeight() - 1,
    scrollEnd = (contentHeight - screenHeight + header + footer) - 600;
  if (activePage[0].id == "pokedex" && scrolled >= scrollEnd) {
    addMore(activePage);
  }
}

/* add more function */
function addMore(page) {
  $(document).off("scrollstop");
  //$.mobile.loading("show", {
    //text: "loading more..",
    //textVisible: true
    //});
  //setTimeout(function() {
    var items = '', last = $("li", page).length, cont = last + pokedexController.model.limit - 1;
    console.log(pokedexController.model.pokemons)
    pokedexController.getPokemon();
    for (var i = last; i < cont; i++) {
        console.log(pokedexController.model.pokemons[i])
        console.log(i)
        items += "<li><a href='" + pokedexController.model.pokemons[i].url + "'>" + pokedexController.model.pokemons[i].name + "</a></li>";
    }
      
    $("#pokedex-pokelist", page).append(items).listview("refresh");
    $.mobile.loading("hide");
    $(document).on("scrollstop", checkScroll);
  //}, 500);
}

/* attach if scrollstop for first time */
$(document).on("scrollstop", checkScroll);