import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export const displayIcon = (icon) => {
  if (icon === "PersonIcon") return <PersonIcon />;
  if (icon === "SettingsIcon") return <SettingsIcon />;
  if (icon === "BookmarksIcon") return <BookmarksIcon />;
};
