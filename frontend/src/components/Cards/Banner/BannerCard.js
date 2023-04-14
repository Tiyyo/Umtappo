import React, { useContext } from "react";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { imagePath } from "../../../utils/function/image.path";
import AppContext from "../../../utils/Context/AppContextProvider";
import LazyLoad from "react-lazy-load";

const BannerCard = ({ element: el }) => {
  const { config } = useContext(AppContext);

  return (
    <div className="banner-card">
      {el?.backdrop_path ? (
        <div className="banner-card__image-container">
          <img
            src={imagePath(config, "backdrop", el, 3)}
            alt={"image of " + el.title || el.name}
            className="banner-card__image-container__image"
          />
          <h3 className="banner-card__image-container__title">
            {el.title || el.name}
          </h3>
        </div>
      ) : (
        <>
          <p className="message-error-img">Image content not avaiable</p>
          <BrowserNotSupportedIcon
            className="not-avaiable-icon"
            color="primary"
            size="large"
          />
          <p className="title-error-img">{el.title || el.name}</p>
        </>
      )}
    </div>
  );
};

export default BannerCard;
