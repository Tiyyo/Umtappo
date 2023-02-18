import React from "react";

const Casts = (props) => {
  const { credits, loading } = props;
  let director = "Director";
  let directorAlternative = "Storyboard Artist";

  const displayCastsActors = () => {
    if (loading) {
      return;
    } else if (credits.cast.length > 0) {
      let castToDisplay = credits.cast.slice(0, 3);
      return (
        <div className="actors">
          <span>Avec : </span>
          {castToDisplay.map((person) => {
            return (
              <span key={person.id} className="actor">
                {person.name}
              </span>
            );
          })}
        </div>
      );
    }
  };

  const displayCastsDirectors = () => {
    if (loading) {
      return;
    } else if (credits.crew.length > 0) {
      const { crew } = credits;
      let mainDirector = [];
      for (let i = 0; i < crew.length; i++) {
        if (crew[i].job === director || crew[i].job === directorAlternative) {
          mainDirector.push(crew[i]);
        }
      }
      mainDirector = [...new Set(mainDirector)];
      return (
        <div className="directors">
          <span>De : </span>
          {mainDirector.map((director, index) => {
            return (
              <span key={index} className="director">
                {director.name}
              </span>
            );
          })}
        </div>
      );
    }
  };

  const displayCasts = () => {
    displayCastsActors();
    displayCastsDirectors();

    return (
      <>
        {displayCastsDirectors()}
        {displayCastsActors()}
      </>
    );
  };

  return <div className="card__casting">{credits ? displayCasts() : ""}</div>;
};

export default Casts;
