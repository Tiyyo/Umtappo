import React, { useContext, useEffect, useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "../SmallCard";
import LoaderUI from "../../Loader/LoaderUI";
import { getFetchTvshow } from "../../../features/tvshow liked/slice/like.slice";
import AppContext from "../../../utils/Context/AppContextProvider";
import MovieIcon from "../../Button/MovieIcon";
import TvIcon from "../../Button/TvIcon";

const LikesContainer = () => {
  const { languages } = useContext(AppContext);

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState("initial");

  const { loading: loadMovies, fetchMedia: moviesLiked } = useSelector(
    (state) => state.movieLiked
  );

  const { fetchMedia: tvshowsLiked, loading: loadTvshows } = useSelector(
    (state) => state.tvshowLiked
  );

  useEffect(() => {
    dispatch(getFetchTvshow(languages));
  }, [languages]);

  useEffect(() => {
    let arr = [loadTvshows, loadMovies];
    setLoading("loadding");
    const currentLoadingState = arr.every((l) => l === "idle");
    if (currentLoadingState) {
      setLoading("idle");
    } else {
      setLoading("failed");
    }
  }, [loadTvshows, loadMovies]);

  if (isLoading === "failed" || isLoading === "initial") {
    return (
      <div className="favorite-resume__container__likes">
        <div className="favorite-resume__container__likes--title">
          <BookmarkAddedIcon />
          <h2>My Favorites</h2>
        </div>
      </div>
    );
  } else if (isLoading === "loading") {
    return <LoaderUI position={"fixed"} />;
  } else {
    return (
      <div className="favorite-resume__container__likes">
        <div className="favorite-resume__container__likes--title">
          <BookmarkAddedIcon />
          <h2>My Favorites</h2>
        </div>
        <div className="favorite-resume__container__likes--content">
          <SmallCard
            list={{
              content: moviesLiked,
              name: "Movie you Liked",
              _id: "1",
            }}
            typeList={"like"}
            defaultImage={<MovieIcon />}
          />
          <SmallCard
            list={{
              content: tvshowsLiked,
              name: "TvShow you Liked",
              _id: "2",
            }}
            typeList={"like"}
            defaultImage={<TvIcon />}
          />
        </div>
      </div>
    );
  }
};

export default LikesContainer;
