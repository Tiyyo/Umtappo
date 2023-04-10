import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// nextSibling have to be inner carousel to work that way

const NavCarousel = ({ width, getScrollPosition, scrollValue }) => {
  const [firstCardIsVisble, setFirstCardIsVisible] = useState(null);
  const [lastCardIsVisble, setLastCardIsVisible] = useState(null);

  const windowWidth = useRef([window.innerWidth]);
  let prev = "prev";
  let next = "next";
  const carousel = useRef();

  // @param  navWay = "prev" || "next"

  function isVisible(child, navWay) {
    let startingState = window.getComputedStyle(
      carousel.current.nextSibling
    ).transform;

    if (carousel.current.nextSibling.children) {
      const observer = new IntersectionObserver(([entry]) => {
        if (navWay === prev) {
          if (entry && entry.isIntersecting) {
            setFirstCardIsVisible(true);
          } else {
            setFirstCardIsVisible(false);
          }
        } else if (navWay === next) {
          if (entry && entry.isIntersecting) {
            setLastCardIsVisible(true);
          } else {
            setLastCardIsVisible(false);
          }
        } else if (startingState === "none") {
          alert("cant do that");
        }
      });
      observer.observe(child);
      return () => {
        return observer.disconnect(child) && isVisible;
      };
    }
  }

  function handleNextClick() {
    var lastChild =
      carousel.current.nextSibling.children[
        carousel.current.nextSibling.children.length - 1
      ];
    isVisible(lastChild, next);
    if (lastCardIsVisble) {
      getScrollPosition(-width);
    } else {
      getScrollPosition(scrollValue - windowWidth.current[0]);
    }
  }

  function handlePrevClick() {
    var firstChild = carousel.current.nextSibling.children[0];
    isVisible(firstChild, prev);
    if (firstCardIsVisble === null) {
      getScrollPosition(0);
    }
    if (firstCardIsVisble) {
      getScrollPosition(0);
    } else if (firstCardIsVisble === false) {
      getScrollPosition(scrollValue + windowWidth.current[0]);
    }
  }

  return (
    <div ref={carousel}>
      <button
        ref={carousel}
        type="button"
        className="next"
        onClick={handleNextClick}
      >
        <NavigateNextIcon />
      </button>
      <button type="button" className="prev" onClick={handlePrevClick}>
        <NavigateBeforeIcon />
      </button>
    </div>
  );
};

export default NavCarousel;
