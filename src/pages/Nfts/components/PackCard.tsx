import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Card, Paper, Theme, Typography } from "@mui/material";
import Img from "src/assets/images/silverpack.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  img: {
    width: "50%",
    height: "200px",
    objectFit: "contain",
    marginTop: 20,
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 10px",
    "& p": {
      lineHeight: 2,
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    border: "none",
    marginTop: 20,
  },
}));

interface Props {}

const PackCard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Paper variant="black" className={classes.root}>
      <Typography
        className="styleFont"
        variant="h5"
        color="textSecondary"
        align="center"
      >
        <b> Silver Pack</b>
      </Typography>
      <div className="center">
        <img alt="" src={Img} className={classes.img} />
      </div>
      <div className={classes.textContainer}>
        <Typography color="textSecondary">
          Value: <br />
          Types
        </Typography>
        <Typography color="textSecondary" align="left">
          3000 <br />
          Rare 1-2
        </Typography>
      </div>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        className={classes.btn}
      >
        Unlock Wallet
      </Button>
    </Paper>
  );
};

export default PackCard;
