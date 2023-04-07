import React, { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";
import LoaderUI from "../Loader/LoaderUI";

const HeaderResume = ({ content, typeList }) => {
  // const { genreListMovie, genreListTv } = useContext(AppContext);

  // const displayLikedMediaGenre = (typeList) => {
  // if (typeList === like) {
  //   const genreName = content.genres.map((g) => g.name);
  //   return genreName.map((name, index) => {
  //     return (
  //       <span key={index} className="genre">
  //         {name}
  //       </span>
  //     );
  //   });
  // } else if (typeList === watchlist) {
  //   return displayGenre(
  //     content.genre_ids,
  //     content.type,
  //     genreListMovie,
  //     genreListTv
  //   );
  // }
  // };

  return (
    <>
      {!content ? (
        <LoaderUI />
      ) : (
        <div className="header-resume">
          <div className="title">{content.title || content.name}</div>
          <div className="overview">{content.overview}</div>
          <div
            style={{ display: "flex", padding: "4% 2%", alignItems: "center" }}
          >
            <div className="year">
              {/* {content.first_air_date?.substring(0, 4) ||
                content.release_date?.substring(0, 4)} */}
            </div>
            <div className="type">{content.type}</div>
          </div>
          {/* <div className="genres">{displayLikedMediaGenre(typeList)}</div> */}
          <div className="rates">
            {/* {Math.round(content.vote_average * 10) / 10} */}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderResume;
