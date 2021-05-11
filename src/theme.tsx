import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: [
      "Product Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "2rem",
      },
      h2: {
        fontSize: "1.75rem",
      },
      h3: {
        fontSize: "1.3rem",
      },
      h4: {
        fontSize: "1.15rem",
      },
      h5: {
        fontSize: "1rem",
      },
      h6: {
        fontSize: ".8rem",
      },
    },
  },
});
