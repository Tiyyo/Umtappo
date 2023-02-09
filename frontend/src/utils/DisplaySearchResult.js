import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AppContext from "./Context/AppContextProvider";

const DisplaySearchResult = (props) => {
  const { content, error, loading, hasMore } = props.search;
  const { config } = useContext(AppContext);
  const observer = useRef();
  const lastContentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(hasMore);
        if (entries[0].isIntersecting && hasMore) {
          props.getPageNumber(1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="search--result__container">
      <div className="search--result__wrapper">
        {content.map((el, index) => {
          if (index === content.length - 1) {
            return (
              <Link
                key={el.id + el.title}
                to={el.id.toString()}
                state={{ content: el }}
              >
                {config && el.poster_path ? (
                  <img
                    src={
                      config.base_url + config.logo_sizes[1] + el.poster_path
                    }
                    alt={"poster of " + el.name || el.title}
                    ref={lastContentRef}
                  />
                ) : (
                  <div className="no-img">
                    <p ref={lastContentRef}>{el.title || el.name}</p>
                  </div>
                )}
              </Link>
            );
          } else {
            return (
              <Link key={el.id} to={el.id.toString()}>
                {config && el.poster_path ? (
                  <img
                    src={
                      config.base_url + config.logo_sizes[1] + el.poster_path
                    }
                    alt={"poster of " + el.name || el.title}
                  />
                ) : (
                  <div className="no-img">
                    <p key={el.id}>{el.title || el.name}</p>
                  </div>
                )}
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DisplaySearchResult;
