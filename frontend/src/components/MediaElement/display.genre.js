export const displayGenre = (arrGenres, type, genreListMovie, genreListTv) => {
  let movie = "Movie";
  let tvShow = "TvShow";
  let movieGenreNames = [];
  if (type === movie) {
    arrGenres.forEach((genre) => {
      genreListMovie.forEach((el) => {
        if (el.id === genre) {
          movieGenreNames.push(el.name);
        }
      });
    });
  }
  if (type === tvShow) {
    arrGenres.forEach((genre) => {
      genreListTv.forEach((el) => {
        if (el.id === genre) {
          movieGenreNames.push(el.name);
        }
      });
    });
  }
  return movieGenreNames.map((genreName, index) => {
    return (
      <span key={index} className="genre">
        {genreName}
      </span>
    );
  });
};
