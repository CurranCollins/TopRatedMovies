let imdbId = "";
let posterUrl = "http://image.tmdb.org/t/p/w185";
let searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

if (searchHistory == null) {
  searchHistory = [];
}
console.log(searchHistory);
for (let i = 0; i < 8; i++) {
  if (searchHistory[i] != undefined) {
    $("#saved-searches").prepend(
      `<button class="button history-btn">${searchHistory[i]}</button>`
    );
  }
}

$("#search-button").click(function () {
  $("#searched-header").text("Searched Movie:");
  $("#similar-header").text("Similar Movies:");

  let title = $("#movie-title").val();
  //searchHistory.push(title);
  //localStorage.setItem("search history", searchHistory);
  console.log(localStorage);
  title = title.split(" ").join("+");

  $.ajax(`http://www.omdbapi.com/?apikey=beff67b&t=${title}`).then(function (
    response
  ) {
    if (response.Response == "False") {
      $("#searched-header").text(
        "Movie not found! Please enter correct title."
      );
      $("#similar-header").empty();
      $("#searched-description").empty();
      $(".similar-movies").empty();
      $("#movie-poster").attr("src", "");
    } else {
      if (!searchHistory.includes(response.Title)) {
        searchHistory.push(response.Title);
        $("#saved-searches").empty();
        while (searchHistory.length > 8) {
          searchHistory.shift();
        }
        // sets the length of search history and enables it to unpopulate old seaches
        for(let i = 0; i < searchHistory.length; i++) {
          $("#saved-searches").prepend(
            `<button class="button history-btn">${searchHistory[i]}</button>`
          );
        }

        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        console.log(localStorage);
      }

      // console.log(response);

      $("#movie-poster").attr("src", response.Poster);
      imdbId = response.imdbID;

      $("#searched-description").empty();
      $("#searched-description").append(`
      <p>Title: ${response.Title}</p>
      <p>Genre(s): ${response.Genre}</p>
      <p>Director: ${response.Director}</p>
      <p>Cast: ${response.Actors}</p>
      <p>Release Date: ${response.Released}</p>
      <p>Plot: ${response.Plot}</p>
      `);
    }

    $.ajax(
      `https://api.themoviedb.org/3/movie/${imdbId}/similar?api_key=43ba0a31020fe2244998abeaf52535a4&language=en-US&page=1`
    ).then(function (similarMovies) {
      console.log(similarMovies);

      $(".similar-movies").empty();

      for (var i = 0; i < similarMovies.results.length; i++) {
        var fullUrl = posterUrl + similarMovies.results[i].poster_path;
        //console.log(fullUrl);

        $(".similar-movies").append(`
        <div class='modal' id='info-modal-${i}'> 
          <h3>${similarMovies.results[i].title}</h1> 
          <p>${similarMovies.results[i].overview}</p> 
          
        </div>`);

        $(".similar-movies").append(
          `<a href='#info-modal-${i}' rel='modal:open'><img src='${fullUrl}'/></a>`
        );
      }
    });
  });
});

$("#saved-searches").on('click', '.history-btn', function (event) {
  $.ajax(
    `http://www.omdbapi.com/?apikey=beff67b&t=${event.target.innerHTML}`
  ).then(function (response) {
    if (response.Response == "False") {
      $("#searched-header").text(
        "Movie not found! Please enter correct title."
      );
      $("#similar-header").empty();
      $("#searched-description").empty();
      $(".similar-movies").empty();
      $("#movie-poster").attr("src", "");
    } else {
      $("#movie-poster").attr("src", response.Poster);
      imdbId = response.imdbID;

      $("#searched-description").empty();
      $("#searched-description").append(`
      <p>Title: ${response.Title}</p>
      <p>Genre(s): ${response.Genre}</p>
      <p>Director: ${response.Director}</p>
      <p>Cast: ${response.Actors}</p>
      <p>Release Date: ${response.Released}</p>
      <p>Plot: ${response.Plot}</p>
      `);
    }

    $.ajax(
      `https://api.themoviedb.org/3/movie/${imdbId}/similar?api_key=43ba0a31020fe2244998abeaf52535a4&language=en-US&page=1`
    ).then(function (similarMovies) {
      console.log(similarMovies);

      $(".similar-movies").empty();

      for (var i = 0; i < similarMovies.results.length; i++) {
        var fullUrl = posterUrl + similarMovies.results[i].poster_path;
        //console.log(fullUrl);

        $(".similar-movies").append(`
        <div class='modal' id='info-modal-${i}'> 
          <h3>${similarMovies.results[i].title}</h3> 
          <p>${similarMovies.results[i].overview}</p> 
          
        </div>`);

        $(".similar-movies").append(
          `<a href='#info-modal-${i}' rel='modal:open'><img src='${fullUrl}'/></a>`
        );
      }
    });
  });
  console.log(event.target.innerHTML);
  console.log("click");
  // console.log(button.value);
});

// let searchHistory = [];
// searchHistory.push(title);
//   localStorage.setItem("search history", searchHistory);

// function renderPreviousSearches() {}

// http://www.omdbapi.com/?i=tt3896198&apikey=beff67b