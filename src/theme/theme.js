import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#007DFC",
      light: "#007dfc",
    },
    secondary: {
      main: "#9DB7D0",
    },
  },
  typography: {
    fontFamily: ["Roboto", "IBM Plex Sans Thai", "sans-serif"].join(","),
  },
});
