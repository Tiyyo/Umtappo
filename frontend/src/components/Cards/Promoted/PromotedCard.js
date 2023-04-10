import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../../../utils/function/image.path";
import AppContext from "../../../utils/Context/AppContextProvider";
import LazyLoad from "react-lazy-load";

const PromotedCard = ({ content }) => {
  const { config } = useContext(AppContext);

  return (
    <div className="promoted-card">
      <div className="promoted-card__banner">
        <LazyLoad>
          <img src={imagePath(config, "backdrop", content, 1)} alt="banner" />
        </LazyLoad>
      </div>
      <Link to={content.id.toString()} state={{ content }}>
        <div className="promoted-card__poster">
          <LazyLoad>
            <img src={imagePath(config, "logo", content, 1)} alt="poster" />
          </LazyLoad>
        </div>
      </Link>
      <div className="promoted-card__infos">
        <h4 className="promoted-card__infos--title">
          {content.title || content.name}
        </h4>
        <p className="promoted-card__infos--synopsis">{content.overview}</p>
        <div className="promoted-card__infos__details">
          <div className="promoted-card__infos__details--type">
            {content.media_type}
          </div>
          <div className="promoted-card__infos__details--year">
            {content.release_date
              ? content.release_date.substring(0, 4)
              : content.first_air_date.substring(0, 4)}
          </div>
          <div className="promoted-card__infos__details--score">
            {content.vote_average}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotedCard;
