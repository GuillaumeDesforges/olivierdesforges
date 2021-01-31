import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  // Palette URL: http://paletton.com/#uid=5000u0kllllaFw0g0qFqFg0w0aF
  palette: {
    primary: {
      main: "#AA3939",
      light: "#D46A6A",
      dark: "#550000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#AA6C39",
      light: "#D49A6A",
      dark: "#552700",
      contrastText: "white",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#AA3939",
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 0,
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
  },
});
