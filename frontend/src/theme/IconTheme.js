import { createTheme } from "@mui/material";

export const darkIconTheme = createTheme({
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

export const lightIconTheme = createTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#121212",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffbd45",
      main: "#fb8c00",
      dark: "#c25e00",
      contrastText: "#000000",
    },
  },
});
