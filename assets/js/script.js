let imdbId = "";
let posterUrl = "http://image.tmdb.org/t/p/w185";
let posterPath = [];

$("#search-button").click(function () {
  let title = $("#movie-title").val();
  title = title.split(" ").join("+");
  console.log(title);
  $.ajax(`http://www.omdbapi.com/?apikey=beff67b&t=${title}`).then(function (
    response
  ) {
    console.log(response);
    $("#movie-Poster").attr("src", response.Poster);
    imdbId = response.imdbID;
    $.ajax(
      `https://api.themoviedb.org/3/movie/${imdbId}/similar?api_key=43ba0a31020fe2244998abeaf52535a4&language=en-US&page=1`
    ).then(function (similarMovies) {
      posterPath = similarMovies.poster_path;
      console.log(similarMovies);
    });
  });
});
// http://www.omdbapi.com/?i=tt3896198&apikey=beff67b
