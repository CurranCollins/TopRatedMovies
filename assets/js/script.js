// Complete Local Stoage button function
// Modals
//

let imdbId = "";
let posterUrl = "http://image.tmdb.org/t/p/w185";
let searchHistory = [];
// let title = $("#movie-title").val();

// function renderPreviousSearches(localStorage) {
//   for (let i = 0; i < 8; i++);
//   if (searchHistory[i] != undefined) {
//     $("#saved-searches").append(
//       `<button class="button history-btn">${searchHistory[i]}</button>`
//     );
//   } else {
//     $("#saved-searches").removeData(searchHistory);
//   }
// }

$("#search-button").click(function () {
  $("#searched-header").text("Searched Movie:");
  $("#similar-header").text("Similar Movies:");

  let title = $("#movie-title").val();
  // searchHistory.push(title);
  // localStorage.setItem("search history", searchHistory);
  // console.log(localStorage);
  title = title.split(" ").join("+");
  // console.log(title);

  $("#saved-searches").empty();

  for (let i = 0; i < 8; i++) {
    if (searchHistory[i] != undefined) {
      $("#saved-searches").append(
        `<button class="button history-btn">${searchHistory[i]}</button>`
      );
    } //else {
    //$("#saved-searches").removeData(searchHistory);
  }

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
      // console.log(response);
      searchHistory.push(response.Title);
      localStorage.setItem("search history", searchHistory);

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
        <div class='small reveal' id='info-modal-${i}' data-reveal> 
          <h1>${similarMovies.results[i].title}</h1> 
          <p>${similarMovies.results[i].overview}</p> 
          <button class="close-button" data-close aria-label="Close modal" type="button"> <span aria-hidden="true">&times;</span> </button>
        </div>`);

        //$(`#info-modal-${i}`).append(`<h1>${similarMovies.results[i].title}</h1>`);

        //$(`#info-modal-${i}`).append(`<p>${similarMovies.results[i].overview}</p>`);

        //$(`#info-modal-${i}`).append(`<button class="close-button" data-close aria-label="Close modal" type="button"> <span aria-hidden="true">&times;</span> </button>`);

        $(".similar-movies").append(
          `<button class=button data-open='info-modal-${i}'><img src='${fullUrl}'/></button>`
        );
      }
    });
  });
});

$(".history-btn").click(function () {});

// let searchHistory = [];
// searchHistory.push(title);
//   localStorage.setItem("search history", searchHistory);

function renderPreviousSearches() {}

// http://www.omdbapi.com/?i=tt3896198&apikey=beff67b
