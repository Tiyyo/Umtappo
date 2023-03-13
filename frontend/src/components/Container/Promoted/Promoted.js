import React, { useCallback, useEffect, useState, useMemo } from "react";
import PromotedCard from "../../Cards/Promoted/PromotedCard";
import useWindowsSize from "../../../utils/hooks/useWindowSize";
import { useAsyncError } from "react-router";

const Promoted = ({ content }) => {
  // const { content } = props;
  const [randomIndexElement, setRandomIndex] = useState(0);
  const [numberElementDisplayed, setNumberElementDisplayed] = useState(1);

  const filteredContent = content.filter((el) => el.backdrop_path);

  const { width: windowWidth } = useWindowsSize();

  const pickRandomNumber = useCallback(() => {
    return setRandomIndex(
      Math.floor(Math.random() * (filteredContent.length - 1))
    );
  }, [content]);

  const controls = () => {
    if (randomIndexElement === -1) {
      setRandomIndex(0);
    }
  };

  const handleNumOfContent = (windowWidth) => {
    if (windowWidth < 340) {
      setNumberElementDisplayed(0);
    } else if (340 < windowWidth < 340 * 2) {
      setNumberElementDisplayed(1);
    } else if (340 * 2 < windowWidth < 340 * 3) {
      setNumberElementDisplayed(2);
    } else if (340 * 3 < windowWidth < 340 * 4) {
      setNumberElementDisplayed(3);
    }
  };

  useEffect(() => {
    pickRandomNumber();
    controls();
  }, [numberElementDisplayed]);

  useEffect(() => {
    if (windowWidth < 340) {
      return setNumberElementDisplayed(0);
    } else if (windowWidth < 340 * 2) {
      return setNumberElementDisplayed(1);
    } else if (windowWidth < 340 * 3) {
      return setNumberElementDisplayed(2);
    } else if (windowWidth < 340 * 4) {
      return setNumberElementDisplayed(3);
    } else {
      return setNumberElementDisplayed(4);
    }
  }, [windowWidth]);

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
