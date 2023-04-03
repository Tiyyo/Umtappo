import { useContext } from "react";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import DynamicRating from "../../MediaElement/DynamicRating";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Link } from "react-router-dom";
import AppContext from "../../../utils/Context/AppContextProvider";

const MovieCard = ({ content }) => {
  var movieType = "movie";
  const { config } = useContext(AppContext);

  const displayTypeIcon = (entries) => {
    if (entries === movieType) {
      return <TheatersOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
    } else {
      return <TvOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
    }
  };

  let idString = content.id.toString();

  return (
    <>
      <div className="movie-card">
        <div className="movie-card__header">
          {content.vote_average > 7 ? (
            <DynamicRating
              rate={content.vote_average}
              className="movie-card__header__rating"
            />
          ) : (
            ""
          )}
          <button className="movie-card__header__like-icon">
            <FavoriteTwoToneIcon
              sx={{ color: "rgba(235, 230, 225, 0.944)", fontSize: "1.2rem" }}
            />
          </button>
        </div>
        <Link to={idString} state={{ content }}>
          <div className="movie-card__image--container">
            <p className="movie-card__image--container__type">
              {displayTypeIcon(content.media_type)}
            </p>

            {config && content.poster_path ? (
              <img
                src={
                  config.base_url + config.poster_sizes[3] + content.poster_path
                }
                alt={"poster of " + content.title}
              />
            ) : (
              <div className="movie-card__image--container__default--image">
                <HideImageIcon size="large" sx={{ color: "#fb8c00" }} />
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
