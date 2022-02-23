import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Paper, Theme, Typography } from "@mui/material";
import DiamondPng from "src/assets/icons/diamond.png";
import JackPng from "src/assets/images/jackperson.jpg";
import HatPng from "src/assets/images/hat.jpg";
import { height } from "@mui/system";
import { Pool, usePool } from "@nftvillage/farms-sdk";
import ModalContext from "src/Context/ModalContext";

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
  poolId: number;
}

const getRarity = (poolId: number) => {
  switch (poolId) {
    case 0:
      return "Common";
    case 1:
      return "Rare";
    case 2:
      return "Super Rare";
    case 3:
      return "Epic";
    case 4:
      return "Legendary";
    default:
      return "Common";
  }
};

const FarmCard: React.FC<Props> = ({ poolId }) => {
  // add error notification here
  const handlerError = (message: string) => console.log(message);
  const { openModal } = useContext(ModalContext);

  const classes = useStyles();
  const pool = usePool(poolId, handlerError)

  console.log(pool)
  
  const depositClick = () => {
    openModal(
      "DepositFarm",
      {
        pool,
      },
      {
        hideTitle: true,
      }
    );
  };

  const withdrawClick = () => {
    openModal(
      "WithdrawFarm",
      {
        pool,
      },
      {
        hideTitle: true,
      }
    );
  };

  return (
    <Paper variant="black" className={classes.root}>
      <div className={classes.headerContainer}>
        <div className={classes.titleContainer}>
          <img src={DiamondPng} alt="" width="70px" height="70px" />
          <Typography color="textSecondary" variant="h5" className="styleFont">
            <b>{getRarity(poolId)}</b>
          </Typography>
        </div>
        <img src={JackPng} alt="" width="100px" height="100px" style={{ objectFit: "contain" }} />
      </div>
      <div className={classes.headerContainer} style={{ marginTop: 20 }}>
        <Typography variant="h5" color="primary">
          {pool?.rewards[0]?.rewards} BNB Earned
        </Typography>
        <Button className={classes.harvestBtn} variant="contained" onClick={pool?.harvestInfo.harvest}>
          Harvest
        </Button>
      </div>
      {/* <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          APR:
        </Typography>
      </div> */}
      {/* <Divider /> */}
      <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          Rarity:
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {poolId}
        </Typography>
        {/* <div> */}
        {/* <img src={HatPng} alt="" className={classes.itemImage} /> */}
        {/* <img src={HatPng} alt="" className={classes.itemImage} /> */}
        {/* </div> */}
      </div>
      <Divider />
      <div className={classes.valueContainer}>
        <Typography variant="h6" color="textSecondary">
          Stacked Amount:
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {pool?.stakedAmount} {pool?.stakedTokenSymbol}
        </Typography>
      </div>
      {pool?.stakedTokenApproval?.isApproved && (
        <div className={classes.btnsGrid}>
          <Button variant="outlined" color="primary" fullWidth className={classes.btn} onClick={depositClick}>
            {pool?.depositInfo.pending ? "PENDING..." : "DEPOSIT"}
          </Button>
          <Button variant="outlined" color="primary" fullWidth className={classes.btn} onClick={withdrawClick}>
            {pool?.withdrawInfo.pending ? "PENDING..." : "WITHDRAW"}
          </Button>
        </div>
      )}
      {!pool?.stakedTokenApproval?.isApproved && (
        <div className="center">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
            onClick={() => pool?.stakedTokenApproval.approve()}
          >
            {pool?.stakedTokenApproval.approvePending ? "PENDING..." : "ENABLE"}
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default FarmCard;
