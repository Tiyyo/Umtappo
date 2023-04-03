import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { useContext } from "react";
import AppContext from "../../../utils/Context/AppContextProvider";

const BannerCard = ({ element: el }) => {
  const { config, iconTheme } = useContext(AppContext);

  const imageFormatUrl = (el, number) => {
    return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
  };

  // number between 0 and 3 which represent the size of backdrop image
  const sizeBackdrop = () => {
    return 3;
  };

  return (
    <div className="banner-card">
      {el?.backdrop_path ? (
        <div className="banner-card__image-container">
          <img
            src={imageFormatUrl(el, sizeBackdrop())}
            alt={"image of " + el.title || el.name}
            className="banner-card__image-container__image"
          />
          <h3 className="banner-card__image-container__title">
            {el.title || el.name}
          </h3>
        </div>
      ) : (
        <ThemeProvider theme={iconTheme}>
          <p className="message-error-img">Image content not avaiable</p>
          <BrowserNotSupportedIcon
            className="not-avaiable-icon"
            color="primary"
            size="large"
          />
          <p className="title-error-img">{el.title || el.name}</p>
        </ThemeProvider>
      )}
    </div>
  );
};

export default BannerCard;
