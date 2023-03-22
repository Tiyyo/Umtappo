import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";

const SimilarContent = ({ similars }) => {
  const { config } = useContext(AppContext);

  const displaySimilarContent = () => {
    let contentToDisplay = similars.filter((c) => c.poster_path).slice(0, 12);

    return (
      <div className="similar-content__wrapper">
        {contentToDisplay.map((element) => {
          return (
            <img
              src={config.base_url + config.logo_sizes[3] + element.poster_path}
              alt={"logo of" + element.name || element.title}
              key={element.id}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="media-element__similar--content">
      {displaySimilarContent()}
    </div>
  );
};

export default SimilarContent;
