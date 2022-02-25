import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Paper, Theme, Typography } from "@mui/material";
import DiamondPng from "src/assets/icons/diamond.png";
import JackPng from "src/assets/images/jackperson.jpg";
import { usePool } from "@nftvillage/farms-sdk";
import ModalContext from "src/Context/ModalContext";
import clsx from "clsx";
import { getPoolRarity } from "src/util";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 30,
    height: "100%",
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
  disabled: {
    filter: "saturate(0.5)",
    pointerEvents: "none",
    opacity: 0.5,
  },
}));

interface Props {
  poolId: number;
  enabled?: boolean;
  requiredCard?: string | number;
}

const FarmCard: React.FC<Props> = ({ poolId, enabled, requiredCard }) => {
  // add error notification here
  const handlerError = (message: string) => console.log(message);
  const { openModal } = useContext(ModalContext);

  const classes = useStyles();
  const pool = usePool(poolId, handlerError);

  const depositClick = () => {
    openModal(
      "DepositFarm",
      {
        poolId,
        requiredCard,
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
        poolId,
      },
      {
        hideTitle: true,
      }
    );
  };

  return (
    <Paper variant="black" className={clsx(classes.root, !enabled && classes.disabled)}>
      <div className={classes.headerContainer}>
        <div className={classes.titleContainer}>
          <img src={DiamondPng} alt="" width="70px" height="70px" />
          <Typography color="textSecondary" variant="h5" className="styleFont">
            <b>{getPoolRarity(poolId).rarity}</b>
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
          <img src={getPoolRarity(poolId).rarityIcon} alt="" height="60px" />
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
      {pool?.stakedTokenApproval?.isApproved && enabled && (
        <div className={classes.btnsGrid}>
          <WalletButtonBase
            loading={pool?.depositInfo.pending}
            variant="outlined"
            color="primary"
            fullWidth
            className={classes.btn}
            onClick={depositClick}
          >
            DEPOSIT
          </WalletButtonBase>
          <WalletButtonBase
            loading={pool?.withdrawInfo.pending}
            variant="outlined"
            color="primary"
            fullWidth
            className={classes.btn}
            onClick={withdrawClick}
          >
            WITHDRAW
          </WalletButtonBase>
        </div>
      )}
      {!pool?.stakedTokenApproval?.isApproved && enabled && (
        <div className="center">
          <WalletButtonBase
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
            loading={pool?.stakedTokenApproval.approvePending}
            onClick={() => pool?.stakedTokenApproval.approve()}
          >
            ENABLE
          </WalletButtonBase>
        </div>
      )}
      {!enabled && (
        <Typography align="center" variant="h6" color="textSecondary">
          Disabled
        </Typography>
      )}
    </Paper>
  );
};

export default FarmCard;
