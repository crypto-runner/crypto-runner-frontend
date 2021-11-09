import React from "react";
import { makeStyles } from "@mui/styles";
import Bg from "src/assets/images/1stpagebg.jpg";
import { Theme, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    position: "relative",
    backgroundSize: "100%",
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    minHeight: "calc(100vh - 80px)",
    backgroundRepeat: "no-repeat",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  text: {
    // zIndex:2,
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      marginTop: 20,
    },
  },
}));

interface Props {}

const Row1: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Bg} alt="" className={classes.bg} />
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.text}
      >
        <b> RACE. WIN. EARN.</b>
      </Typography>
    </div>
  );
};

export default Row1;
