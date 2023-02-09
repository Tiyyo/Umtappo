import React, { useEffect, useState } from "react";
import PromotedCard from "../Cards/PromotedCard";

const Promoted = (props) => {
  const { content } = props;
  const [randomIndexElement, setRandomIndex] = useState(0);

  let numberElementDisplayed = 1;

  const filteredContent = content.filter((el) => el.backdrop_path);

  const pickRandomNumber = () => {
    return setRandomIndex(
      Math.floor(Math.random() * (filteredContent.length - 1))
    );
  };
  const controls = () => {
    if (randomIndexElement === -1) {
      setRandomIndex(0);
    }
  };

  useEffect(() => {
    pickRandomNumber();
    controls();
  }, []);

  return (
    <div className="promoted">
      {filteredContent
        .slice(randomIndexElement, randomIndexElement + numberElementDisplayed)
        .map((el) => {
          return (
            <PromotedCard key={el.id + el.title || el.name} content={el} />
          );
        })}
    </div>
  );
};

export default Promoted;
