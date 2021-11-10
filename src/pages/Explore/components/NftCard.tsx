import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import Img from "src/assets/images/pug.png";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  imgContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFB888",
    position: "relative",
    "& img": {
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },
  quantityContainer: {
    display: "flex",
    width: 180,
    position: "absolute",
    bottom: -12,
    left: "calc(50% - 90px)",
    justifyContent: "center",
    background: "white",
    border: "2px solid black",
    padding: "2px 5px",
  },
  quantityText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    "& span": {
      color: theme.palette.primary.main,
    },
  },
}));

interface Props {}

const NftCard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img src={Img} alt="" />

        <div className={classes.quantityContainer}>
          <Typography className={clsx(classes.quantityText, "styleFont")}>
            51 MINTED | <span>9 LEFT</span>
          </Typography>
        </div>
      </div>
      <Button color="primary" fullWidth variant="outlined" style={{marginTop:30,}}>
        5000 POINTS
      </Button>
    </div>
  );
};

export default NftCard;
