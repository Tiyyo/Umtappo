import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import LazyLoad from "react-lazy-load";

const SimilarContent = ({ similars }) => {
  const { config } = useContext(AppContext);

  const displaySimilarContent = () => {
    let contentToDisplay = similars.filter((c) => c.poster_path).slice(0, 12);

    return (
      <div className="similar-content__wrapper">
        {contentToDisplay.map((element) => {
          return (
            <div className="image-wrapper">
              <LazyLoad>
                <img
                  src={
                    config.base_url + config.logo_sizes[3] + element.poster_path
                  }
                  alt={"logo of" + element.name || element.title}
                  key={element.id}
                />
              </LazyLoad>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal-content__wrapper__media-element__similar--content">
      {displaySimilarContent()}
    </div>
  );
};

export default SimilarContent;
