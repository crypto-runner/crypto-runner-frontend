import { createTheme } from "@mui/material";
// const defaultTheme = createTheme();

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    round: true;
  }
}

// const lightGrey = "rgb(55,57,67)";
// const veryLightGrey = "rgb(82,85,99)";

const obitron = '"Orbitron", sans-serif';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    // mode: "dark",
    primary: {
      main: "rgb(255,100,2)",
    },
    secondary: {
      main: "#FFB807",
    },
    text: {
      secondary: "rgb(255,255,255)",
      primary: "rgb(0,0,0)",
    },
    background: {
      // default: "rgb(43,44,51)",
      // paper: "rgb(37,39,46)",
    },
    action: {
      hover: "rgb(70,100,241)",
    },
  },
  typography: {
    // fontFamily: "'Roboto', sans-serif",
  },
  components: {
    MuiTypography: {},
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "30px 20px",
          boxShadow: "none",
          borderRadius: 36,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& fieldset": {
            border: "0px !important",
          },
          "& .MuiSvgIcon-root": {
            marginRight: 5,
          },
        },
        sizeSmall: {
          height: 45,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: obitron,
        },
        containedPrimary: {},
        containedSecondary: {
          border: "2px solid black",
          borderRadius: 2,
          boxShadow: "none",
          fontWeight: 800,
          padding: "10px 70px",
        },
      },
      variants: [
        {
          props: { variant: "round" },
          style: {
            borderRadius: 360,
            padding: "4px 30px",
            paddingBottom: 2,
          },
        },
      ],
    },
  },
});

export default theme;
