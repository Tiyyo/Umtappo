import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";

const SimilarContent = (props) => {
  const { similars } = props;
  const { config } = useContext(AppContext);
  const loading = true; // random value change in the future
  const displaySimilarContent = () => {
    if (loading) {
      return;
    } else {
      let contentToDisplay = similars.slice(0, 12);
      return (
        <div className="similar-content__wrapper">
          {contentToDisplay.map((element) => {
            return (
              <>
                <img
                  src={
                    config.base_url + config.logo_sizes[1] + element.poster_path
                  }
                  alt={"logo of" + element.name || element.title}
                  key={element.id}
                />
              </>
            );
          })}
        </div>
      );
    }
  };
  return (
    <div className="card__similar--content">{displaySimilarContent()}</div>
  );
};

export default SimilarContent;
