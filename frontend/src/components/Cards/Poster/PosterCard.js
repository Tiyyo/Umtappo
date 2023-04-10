import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import DynamicRating from "../../MediaElement/DynamicRating";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Link } from "react-router-dom";
import { displayTypeIcon } from "./display.type.icon";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";
import { imagePath } from "../../../utils/function/image.path";
import LazyLoad from "react-lazy-load";

const MovieCard = ({ content }) => {
  const { config } = useContext(AppContext);

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
            {content.poster_path ? (
              <LazyLoad>
                <img
                  src={imagePath(config, "poster", content, 3)}
                  alt={"poster of " + content.title}
                />
              </LazyLoad>
            ) : (
              <div className="movie-card__image--container__default--image">
                <HideImageIcon size="large" />
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
