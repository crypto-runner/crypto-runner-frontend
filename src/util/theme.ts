import { createTheme } from "@mui/material";
// const defaultTheme = createTheme();

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    round: true;
  }
}
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    black: true;
  }
}

// const lightGrey = "rgb(55,57,67)";
// const veryLightGrey = "rgb(82,85,99)";

const obitron = '"Orbitron", sans-serif';
const secondaryColor = "#FFB807";
const primaryColor = "rgb(255,100,2)";

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
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
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
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 400,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: "white",
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
    MuiPaper: {
      variants: [
        {
          props: { variant: "black" },
          style: {
            backgroundColor: "rgb(19,19,19)",
            borderRadius: 5,
            padding: 20,
          },
        },
      ],
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

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label":{
            
            color: "grey",
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: obitron,
        },
        contained: {
          border: "2px solid black",
          borderRadius: 2,
          boxShadow: "none",
          fontWeight: 800,
          padding: "10px 70px",
          backgroundColor: "white",
        },
        containedPrimary: {
          // backgroundColor: primaryColor,
        },
        containedSecondary: {
          border: "2px solid black",
          borderRadius: 2,
          boxShadow: "none",
          fontWeight: 800,
          padding: "10px 70px",
          backgroundColor: secondaryColor,
        },
        outlinedPrimary: {
          backgroundColor: primaryColor,
          border: "2px solid black",
          color: "white",
          borderRadius: 2,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: primaryColor,
            border: "2px solid black",
            color: "white",
            borderRadius: 2,
            boxShadow: "none",
          },
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
    MuiPagination: {
      styleOverrides: {
        outlined: {},
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "black",
          fontWeight: 600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "white",
          height: 2,
        },
      },
    },
  },
});

export default theme;
