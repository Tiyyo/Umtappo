import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";

export const displayTypeIcon = (media_type) => {
  const movieType = "movie";
  if (media_type === movieType) {
    return <TheatersOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
  } else {
    return <TvOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
  }
};
