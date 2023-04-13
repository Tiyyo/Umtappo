import { displayGenre } from "../../MediaElement/display.genre";

export const displayLikedMediaGenre = (
  typeList,
  content,
  genreListMovie,
  genreListTv
) => {
  const like = "like";
  const watchlist = "whatchlist";

  if (typeList === like) {
    const genreName = content.genres.map((g) => g.name);
    return genreName.map((name, index) => {
      return (
        <span key={index} className="genre">
          {name}
        </span>
      );
    });
  } else if (typeList === watchlist) {
    return displayGenre(
      content.genre_ids,
      content.type,
      genreListMovie,
      genreListTv
    );
  }
};
