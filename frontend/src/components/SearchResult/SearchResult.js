import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
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
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function imagePathLogo(content, int) {
    return config.base_url + config.logo_sizes[int] + content.poster_path;
  }

  useEffect(() => {
    setPageNumber(1);
  }, [inputSearchValue]);

  return (
    <div className="app">
      <Outlet />
      <div className="search--result__container">
        <div className="search--result__wrapper">
          {elements.map((content, index) => {
            content.type = content.media_type;
            if (content.type === "person") {
              return;
            }
            if (index === elements.length - 1 && content) {
              return (
                <Link
                  key={content.id + index.toString()}
                  to={content.id.toString()}
                  state={{ content }}
                  onClick={setLastSearchValue(inputSearchValue)}
                >
                  {config && content.poster_path ? (
                    <img
                      src={imagePathLogo(content, 3)}
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
                  key={content.id + index.toString()}
                  to={content.id.toString()}
                  state={{ content }}
                  className="search-result__link"
                >
                  {config && content.poster_path ? (
                    <img
                      src={imagePathLogo(content, 3)}
                      alt={"poster of " + content.name || content.title}
                    />
                  ) : (
                    <div className="no-img">
                      <p>{content.title || content.name}</p>
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
