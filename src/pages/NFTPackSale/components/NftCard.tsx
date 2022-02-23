import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import { Packs, useBuyPack } from "@nftvillage/presale-sdk";
import MySwal from "src/util/showAlert";
import { useMetadata } from "@react-dapp/utils";
import LoadingImg from "src/components/LoadingImg/LoadingImg";

let imgArr = ["Img1", "Img2", "Img3", "Img4", "Img5", "Img6"];

// select random from array
// let randomImg = imgArr[Math.floor(Math.random() * imgArr.length)];

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

  quantityWrapper: {
    // display: "flex",
    width: "max-content",

    justifyContent: "center",
    background: "white",
    border: "2px solid black",
    padding: "2px 5px",
  },
  quantityContainer: {
    position: "absolute",
    bottom: -20,
    // left: "calc(50% - 100px)",
    display: "flex",
    justifyContent: "center",
    width: "100%",
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

interface Props {
  pack: Packs;
}

const NftCard: React.FC<Props> = ({ pack }) => {
  const classes = useStyles();

  // console.log(pack);
  const { buy, isApproved, approve } = useBuyPack(pack.packId, pack.paymentToken, pack.price);
  const { metadata } = useMetadata(pack.nft, pack.tokens[0].tokenId.toString());
  console.log("pack", pack, metadata);

  const handleApprove = async () => {
    MySwal.fire({
      title: <strong>Approving Token</strong>,
      html: <i>Please wait while we do work for you</i>,
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    await approve();
    MySwal.close();
    MySwal.fire({
      title: <strong>Token Approved Successfull</strong>,
      icon: "success",
    });
  };

  const handleBuy = async () => {
    MySwal.fire({
      title: <strong>Performing Transaction</strong>,
      html: <i>Please wait till we process the transaction</i>,
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    let res = await buy(1);
    console.log(res);
    if (res?.status) {
      MySwal.fire({
        title: <strong>Transaction Successfull</strong>,
        icon: "success",
      });
    } else {
      MySwal.fire({
        title: <strong>Transaction Error</strong>,

        icon: "error",
      });
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <LoadingImg src={metadata?.image} />
        <div className={classes.quantityContainer}>
          <div className={classes.quantityWrapper}>
            <Typography className={clsx(classes.quantityText, "styleFont")}>
              {pack.tokens[0].balance} LEFT <span></span>
            </Typography>
            <Typography className={clsx(classes.quantityText, "styleFont")}>
              <span>{pack.displayPrice} POINTS</span>
            </Typography>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        fullWidth
        variant="outlined"
        style={{ marginTop: 30 }}
        onClick={isApproved ? handleBuy : handleApprove}
      >
        {isApproved ? "Buy" : "Approve"}
      </Button>
    </div>
  );
};

export default NftCard;
