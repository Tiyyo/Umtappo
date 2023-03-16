import React, { useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import SmallCard from "../SmallCard";
import { useSelector } from "react-redux";
import LoaderUI from "../../Loader/LoaderUI";

const WatchlistContainer = () => {
  let listView = "list";
  let gridView = "grid";

  const [view, setView] = useState(gridView);

  const { lists: myLists, loading: loadingListState } = useSelector(
    (state) => state.lists
  );
  const toggleView = () => {
    view === gridView ? setView(listView) : setView(gridView);
  };

  return (
    <>
      {!loadingListState === "idle" ? (
        <LoaderUI fixed={true} />
      ) : (
        <div className="favorite-resume__container__watchlists">
          <div className="favorite-resume__container__watchlists--header">
            <div className="watchlists-title">
              <CameraRollIcon />
              <h2>My Watchlists</h2>
            </div>

            <button
              className="manage-display"
              type="button"
              onClick={toggleView}
            >
              {view === gridView ? <GridViewIcon /> : <ViewListIcon />}
            </button>
          </div>

          <div
            className="favorite-resume__container__watchlists--main"
            data-view={view === gridView ? gridView : listView}
          >
            {myLists &&
              myLists.map((list) => {
                return (
                  <div key={list._id}>
                    <SmallCard list={list} typeList={"whatchlist"} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchlistContainer;
