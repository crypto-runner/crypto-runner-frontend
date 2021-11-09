import { createTheme } from "@mui/material";
// const defaultTheme = createTheme();

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    round: true;
  }
}

const lightGrey = "rgb(55,57,67)";
const veryLightGrey = "rgb(82,85,99)";

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
      primary: "rgb(255,255,255)",
      secondary: "rgb(194,195,203)",
    },
    background: {
      default: "rgb(43,44,51)",
      paper: "rgb(37,39,46)",
    },
    action: {
      hover: "rgb(70,100,241)",
    },
  },
  typography: {
    fontFamily: "'Orbitron', sans-serif",
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          backgroundColor: veryLightGrey,
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: lightGrey,
          padding: 20,
          boxShadow: "none",
          borderRadius: 15,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: lightGrey,
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: lightGrey,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: "rgb(37,39,46)"
          boxShadow: "none",
          border: "1px solid rgb(64,65,71)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(37,39,46)",
          minHeight: 80,
          height: 80,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "rgb(194,195,203)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "rgb(194,195,203)",
          height: 45,
          "&.Mui-selected": {
            backgroundColor: "rgb(70,100,241) !important",
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 10,
            width: "calc(100% - 10px)",
            boxShadow: "0px 0px 25px rgba(70,100,241,0.6)",
            color: "white",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
