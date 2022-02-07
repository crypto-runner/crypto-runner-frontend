import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Theme, Typography } from "@mui/material";
import ChestPng from "src/assets/images/chest.png";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import ModalContext from "src/Context/ModalContext";
import { useBuyPack } from "../../hooks/useRandomPresale"
import RandomPresale_Abi from "../../assets/abi/random_Presale.json"
import { ethers } from "ethers";

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

interface Props { }

const UnlockReward: React.FC<Props> = () => {
  const classes = useStyles();
  const { openModal } = useContext(ModalContext);
  const { buyPack, txPending } = useBuyPack()

  const _buyPack = async () => {
    const txResponse = await buyPack()

    if (txResponse?.status) {
      const iface = new ethers.utils.Interface(RandomPresale_Abi);
      const tokenId = iface.parseLog(txResponse.receipt.logs[1]).args['tokenId'].toString()

      openModal(
        "RewardUnlock",
        tokenId,
        {
          hideTitle: true,
        }
      );
    } else {
      console.log("Error Occur")
    }
  }


  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          color="textSecondary"
          variant="h4"
          align="center"
          className="styleFont"
        >
          <b>Treasure Chest</b>
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
            <b> 0.2 Bnb</b>
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography color="textSecondary">
            <b> Rarities:</b>
          </Typography>
          <Typography color="textSecondary">
            <b> Rare 1 - 5</b>
          </Typography>
        </div>
        <WalletButtonBase
          color="primary"
          variant="outlined"
          className={classes.claimBtn}
          onClick={() => _buyPack()}
        >
          {txPending ? 'Pending...' : 'Buy Chest'}
        </WalletButtonBase>
      </Container>
    </div>
  );
};

export default UnlockReward;
