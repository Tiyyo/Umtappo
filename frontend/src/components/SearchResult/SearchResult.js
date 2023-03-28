import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import useSearch from "../../utils/hooks/useSearch";

const SearchResult = () => {
  const observer = useRef();
  const { config, setLastSearchValue } = useContext(AppContext);
  const inputSearchValue = useOutletContext();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    content: elements,
    loading,
    hasMore,
  } = useSearch(inputSearchValue, pageNumber);

  const lastContentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && hasMore) {
          console.log("intersect");
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
          {elements
            // .filter((content) => content.poster_path)
            .map((content, index) => {
              content.type = content.media_type;
              if (content.type === "person") return;
              if (index === elements.length - 1 && content) {
                return (
                  <Link
                    key={content.id + content.title}
                    to={content.id.toString()}
                    state={{ content }}
                    onClick={setLastSearchValue(inputSearchValue)}
                  >
                    {config && content.poster_path ? (
                      <img
                        src={
                          config.base_url +
                          config.logo_sizes[3] +
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
                    className="search-result__link"
                  >
                    {config && content.poster_path ? (
                      <img
                        src={
                          config.base_url +
                          config.logo_sizes[3] +
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
