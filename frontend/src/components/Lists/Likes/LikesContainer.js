import React, { useContext, useEffect, useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useDispatch, useSelector } from "react-redux";
import useMediaId from "../../../utils/hooks/useMediaId";
import SmallCard from "../SmallCard";
import LoaderUI from "../../Loader/LoaderUI";
import { getFetchTvshow } from "../../../features/tvshow liked/slice/like.slice";
import { getFetchMovie } from "../../../features/movie liked/Slice/likes.slice";
import AppContext from "../../../utils/Context/AppContextProvider";

const LikesContainer = () => {
  let mediaTypeTvv = "tv";
  let mediaTypeMovie = "movie";

  const { languages } = useContext(AppContext);

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const moviesLiked = useSelector((state) => state.movieLiked.fetchMedia);

  const tvshowsLiked = useSelector((state) => state.tvshowLiked.fetchMedia);

  useEffect(() => {
    dispatch(getFetchTvshow(languages));
    dispatch(getFetchMovie(languages));
  }, [languages]);

  return (
    <>
      {isLoading ? (
        <LoaderUI fixed={true} />
      ) : (
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
            />
            <SmallCard
              list={{
                content: tvshowsLiked,
                name: "TvShow you Liked",
                _id: "2",
              }}
              typeList={"like"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LikesContainer;
