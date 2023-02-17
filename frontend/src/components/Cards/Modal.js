import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Avatar, createTheme, ThemeProvider } from "@mui/material";
import { StarOutline } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import ReactPlayer from "react-player";
import AppContext from "../../utils/Context/AppContextProvider";

const Modal = () => {
  //--- Destructuring
  const location = useLocation();
  const { content } = location.state;
  const { config, genreListMovie, genreListTv } = useContext(AppContext);
  const { id, genre_ids, type } = content;

  //-- Const and var
  let filmVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US`;

  let filmSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1`;

  let filmCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US`;

  let filmsUrl = [filmVideoUrl, filmCreditsUrl, filmSimilarUrl];

  let tvVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US`;

  let tvCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US`;

  let tvSimilarUrl = `
  https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1`;

  let tvShowUrls = [tvVideoUrl, tvCreditsUrl, tvSimilarUrl];

  let director = "Director";
  let directorAlternative = "Storyboard Artist";

  let videoType = "Trailer";
  let movie = "Movie";
  let tvShow = "TvShow";

  //--Others Hook
  const navigate = useNavigate();

  //--- State Hook
  const [credits, setCredits] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [synopsisIsOpen, setSynopsisIsOpen] = useState(false);
  const [ytKey, setYtKey] = useState("");
  const [isEnough, setIsEnough] = useState(false);

  //--Function
  const displayGenre = (arrGenres, type) => {
    let movieGenreNames = [];
    if (type === movie) {
      arrGenres.forEach((genre) => {
        genreListMovie.forEach((el) => {
          if (el.id === genre) {
            movieGenreNames.push(el.name);
          }
        });
      });
    }
    if (type === tvShow) {
      arrGenres.forEach((genre) => {
        genreListTv.forEach((el) => {
          if (el.id === genre) {
            movieGenreNames.push(el.name);
          }
        });
      });
    }
    return movieGenreNames.map((genreName, index) => {
      return (
        <span key={index} className="genre">
          {genreName}
        </span>
      );
    });
  };

  const displayReleaseYear = () => {
    if (content.first_air_date) {
      return content.first_air_date.substring(0, 4);
    }
    if (content.release_date) {
      return content.release_date.substring(0, 4);
    }
  };

  const getDetails = async (querys) => {
    axios
      .all(querys.map((url) => axios.get(url)))
      .then(
        axios.spread((video, credit, similar) => {
          setVideos(video.data);
          setCredits(credit.data);
          setSimilars(similar.data.results);
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (type === "Movie") {
      getDetails(filmsUrl);
    }
    if (type === "TvShow") {
      getDetails(tvShowUrls);
    }
  }, [type, filmsUrl, tvShowUrls]);

  const displayCastsActors = () => {
    if (loading) {
      return;
    } else if (credits.cast.length > 0) {
      let castToDisplay = credits.cast.slice(0, 3);
      return (
        <div className="actors">
          <span>Avec : </span>
          {castToDisplay.map((person) => {
            return (
              <span key={person.id} className="actor">
                {person.name}
              </span>
            );
          })}
        </div>
      );
    }
  };

  const displayCastsDirectors = () => {
    if (loading) {
      return;
    } else if (credits.crew.length > 0) {
      const { crew } = credits;
      let mainDirector = [];
      for (let i = 0; i < crew.length; i++) {
        if (crew[i].job === director || crew[i].job === directorAlternative) {
          mainDirector.push(crew[i]);
        }
      }
      mainDirector = [...new Set(mainDirector)];
      return (
        <div className="directors">
          <span>De : </span>
          {mainDirector.map((director, index) => {
            return (
              <span key={index} className="director">
                {director.name}
              </span>
            );
          })}
        </div>
      );
    }
  };

  const displayCasts = () => {
    displayCastsActors();
    displayCastsDirectors();

    return (
      <>
        {displayCastsDirectors()}
        {displayCastsActors()}
      </>
    );
  };

  const toggleSynopsis = () => {
    synopsisIsOpen ? setSynopsisIsOpen(false) : setSynopsisIsOpen(true);
  };

  const sysnopsis = () => {
    const synopsisContainer = document.querySelector(
      ".card__synopsis--container"
    );
    if (synopsisContainer.offsetHeight === synopsisContainer.scrollHeight) {
      setIsEnough(true);
    } else {
      setIsEnough(false);
    }
  };

  const displaySimilarContent = () => {
    if (loading) {
      return;
    } else {
      let contentToDisplay = similars.slice(0, 12);
      return (
        <div className="similar-content__wrapper">
          {contentToDisplay.map((element) => {
            return (
              <>
                <img
                  src={
                    config.base_url + config.logo_sizes[1] + element.poster_path
                  }
                  alt={"logo of" + element.name || element.title}
                  key={element.id}
                />
              </>
            );
          })}
        </div>
      );
    }
  };

  const getVideoKey = () => {
    if (!loading) {
      let keys = [];
      videos.results.forEach((video) => {
        if (video.type === videoType) {
          keys.push(video.key);
        }
        setYtKey(keys[0]);
      });
    }
  };

  const addToFavorite = () => {
    return;
  };

  useEffect(() => {
    getVideoKey();
  }, [loading]);

  useEffect(() => {
    sysnopsis();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffbd45",
        main: "#fb8c00",
        dark: "#c25e00",
        contrastText: "#000000",
      },
      secondary: {
        light: "#484848",
        main: "#121212",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
  });

  return (
    <>
      <div className="modal" style={{ display: "flex" }}>
        <main className="card">
          <div className="card__header">
            <button
              className="card__header__return-btn"
              onClick={() => navigate(-1)}
            >
              <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
            </button>
            <div className="card__header__avatar">
              <Avatar
                sx={{ color: "orange", backgroundColor: "transparent" }}
              />
            </div>
          </div>
          <div className="card__trailer-container">
            {ytKey ? (
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + ytKey}
                controls
                width="100%"
                height="auto"
                className="player"
              ></ReactPlayer>
            ) : (
              <img
                src={
                  config.base_url +
                  config.backdrop_sizes[1] +
                  content.backdrop_path
                }
                alt={"poster of " + content.name || content.title}
              />
            )}
          </div>
          <div className="card__call-to-action">
            <ThemeProvider theme={theme}>
              <div
                className="card__call-to-action__favorite"
                onClick={() => {
                  addToFavorite();
                }}
              >
                <BookmarkBorderIcon />
              </div>
              <div className="card__call-to-action__add-to">
                <Link to="add_to_playlist" state={{ content }}>
                  <AddIcon sx={{ color: "white" }} />
                </Link>
              </div>
              <div className="card__call-to-action__share">
                <ShareIcon />
              </div>
            </ThemeProvider>
          </div>
          <div className="card__title">{content.title || content.name}</div>
          <div className="card__infos">
            <div className="card__infos__type">{content.type}</div>
            <div className="card__infos__release-year">
              {displayReleaseYear()}
            </div>
            <div className="card__infos__genres">
              {displayGenre(genre_ids, type)}
            </div>
            <div className="card__infos__rating">
              <StarOutline sx={{ color: "yellow" }} />
              {content.vote_average} / 10{" "}
            </div>
          </div>
          <div className="card__synopsis">
            <div
              className="card__synopsis--container"
              style={
                synopsisIsOpen
                  ? { maxHeight: "fit-content" }
                  : { maxHeight: "62px" }
              }
            >
              {content.overview}
            </div>
            <span
              onClick={toggleSynopsis}
              style={isEnough ? { display: "none" } : { display: "inline" }}
            >
              <span>{synopsisIsOpen ? "Reduce" : "See More"}</span>
            </span>
          </div>

          <div className="card__casting">{credits ? displayCasts() : ""}</div>
          <div className="card__similar--content">
            {displaySimilarContent()}
          </div>
        </main>
      </div>
    </>
  );
};

export default Modal;
