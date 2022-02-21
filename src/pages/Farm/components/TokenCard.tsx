import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Paper, Theme, Typography } from "@mui/material";
import DiamondPng from "src/assets/icons/diamond.png";
import JackPng from "src/assets/images/jackperson.jpg";
import HatPng from "src/assets/images/hat.jpg";
import { height } from "@mui/system";
import { usePool } from "@nftvillage/farms-sdk";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 30,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    "& img": {
      objectFit: "contain",
      marginRight: 10,
    },
  },
  harvestBtn: {
    backgroundColor: "rgb(0,174,239)",
    color: "white",
    borderRadius: 5,
    fontSize: "120%",
  },
  valueContainer: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemImage: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    backgroundColor: "rgb(0,174,239)",
    marginLeft: 10,
  },
  btnsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginTop: 50,
  },
  btn: {
    border: "none",
    height: 40,
    fontSize: "120%",
  },
}));

interface Props {
  poolId: number
}

const TokenCard: React.FC<Props> = ({ poolId }) => {
  // add error notification here
  const handlerError = (message: string) => console.log(message)

  const classes = useStyles();
  const pool = usePool(poolId, handlerError)

  // show require card image
  const nft = pool?.details?.requiredCards[0];

  return (
    <Paper variant="black" className={classes.root}>
      <div className={classes.headerContainer}>
        <div className={classes.titleContainer}>
          <img src={DiamondPng} alt="" width="70px" height="70px" />
          <Typography color="textSecondary" variant="h5" className="styleFont">
            <b>MEL</b>
          </Typography>
        </div>
        <img
          src={JackPng}
          alt=""
          width="100px"
          height="100px"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={classes.headerContainer} style={{ marginTop: 20 }}>
        <Typography variant="h5" color="primary">
          320 BNB Earned
        </Typography>
        <Button className={classes.harvestBtn} variant="contained">
          Harvest
        </Button>
      </div>
      <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          APR:
        </Typography>
      </div>
      <Divider />
      <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          Items:
        </Typography>
        <div>
          <img src={HatPng} alt="" className={classes.itemImage} />
          <img src={HatPng} alt="" className={classes.itemImage} />
        </div>
      </div>
      <Divider />
      <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          Stacked Amount:
        </Typography>
      </div>
      <div className={classes.btnsGrid}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          className={classes.btn}
        >
          Deposit
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          className={classes.btn}
        >
          Widthdraw
        </Button>
      </div>
    </Paper>
  );
};

export default TokenCard;
