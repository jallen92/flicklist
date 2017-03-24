

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "5fe3303a32575f3ab4a6adfb64e89735" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			
			// invoke the callback function that was passed in. 
			model.browseItems = response.results;
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
	$("ul").empty();
  
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
	model.watchlistItems.forEach(function (movie) {
        var movieTitle = $("<li></li>").text(movie.original_title);
        $("#section-watchlist ul").append(movieTitle);
    })
  
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
	  	if (model.watchlistItems.indexOf(movie) == -1){

            var movieTitle = $("<li></li>").html(movie.original_title).append("</br>");
            var addButton = $("<button></button>").text("Add to Watchlist");

            //TODO BONUS
            //figure out how to make the movieTitle and addButton elements one element so you can
            //easily remove them once the button is clicked
            //also make it so a button can only be clicked once

			var titleAndButton = movieTitle.append(addButton);

            $("#section-browse ul").append(titleAndButton);


            // TODO 4
            // the list item should include a button that says "Add to Watchlist"

            //Answer: solved above in TODO3


            // TODO 5
            // when the button is clicked, this movie should be added to the model's watchlist and render() should be called again



            addButton.on("click",(function(){
                var watchlistItems = model.watchlistItems;
                watchlistItems.push(movie);
                render();
            }));

		}

  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

