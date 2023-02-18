import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import useSearch from "../../utils/hooks/useSearch";

const SearchResult = () => {
  const observer = useRef();
  const { config, genre } = useContext(AppContext);
  const inputSearchValue = useOutletContext();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    content: elements,
    error,
    loading,
    hasMore,
  } = useSearch(inputSearchValue, pageNumber);

  console.log(elements);

  const lastContentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible", hasMore);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPageNumber(1);
  }, [inputSearchValue]);

  return (
    <div className="app">
      <div className="search--result__container">
        <div className="search--result__wrapper">
          {elements.map((content, index) => {
            content.type = content.media_type;
            if (index === elements.length - 1) {
              return (
                <Link
                  key={content.id + content.title}
                  to={content.id.toString()}
                  state={{ content }}
                >
                  {config && content.poster_path ? (
                    <img
                      src={
                        config.base_url +
                        config.logo_sizes[1] +
                        content.poster_path
                      }
                      alt={"poster of " + content.name || content.title}
                      ref={lastContentRef}
                    />
                  ) : (
                    <div className="no-img">
                      <p ref={lastContentRef}>
                        {content.title || content.name}
                      </p>
                    </div>
                  )}
                </Link>
              );
            } else {
              return (
                <Link
                  key={content.id}
                  to={content.id.toString()}
                  state={{ content }}
                >
                  {config && content.poster_path ? (
                    <img
                      src={
                        config.base_url +
                        config.logo_sizes[1] +
                        content.poster_path
                      }
                      alt={"poster of " + content.name || content.title}
                    />
                  ) : (
                    <div className="no-img">
                      <p key={content.id}>{content.title || content.name}</p>
                    </div>
                  )}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
