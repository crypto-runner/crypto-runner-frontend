import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Theme, Typography } from "@mui/material";
import ChestPng from "src/assets/images/chest.png";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 30,
  },
  chestImg: {
    display: "block",
    margin: "auto",
    width: "70%",
    marginTop: 30,
    maxWidth: 400,
  },
  row: {
    margin: "auto",
    width: "70%",
    marginTop: 10,
    maxWidth: 400,
    display: "flex",
    justifyContent: "space-between",
  },
  claimBtn: {
    padding: "15px 20px !important",
    display: "block !important",
    marginTop: "20px !important",
    margin: "auto !important",
    fontSize: "20px !important",
  },
}));

interface Props {}

const UnlockReward: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          color="textSecondary"
          variant="h4"
          align="center"
          className="styleFont"
        >
          <b>Gold Pack</b>
        </Typography>
        <img src={ChestPng} alt="chest" className={classes.chestImg} />
        {/* <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography> */}
        <div className={classes.row}>
          <Typography color="textSecondary">
            <b> Value:</b>
          </Typography>
          <Typography color="textSecondary">
            <b>3000</b>
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography color="textSecondary">
            <b> Types:</b>
          </Typography>
          <Typography color="textSecondary">
            <b>Rare 1-2</b>
          </Typography>
        </div>
        <WalletButtonBase
          color="primary"
          variant="outlined"
          className={classes.claimBtn}
        >
          Claim Reward
        </WalletButtonBase>
      </Container>
    </div>
  );
};

export default UnlockReward;
