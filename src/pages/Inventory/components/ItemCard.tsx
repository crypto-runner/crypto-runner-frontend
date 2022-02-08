import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton, Theme, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { POOL_CARD_ADDRESS } from "src/config/config";
import LoadingImg from "src/components/LoadingImg/LoadingImg";
import ReplyIcon from "@mui/icons-material/Reply";
import ModalContext from "src/Context/ModalContext";

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
    fontSize: 20,
    "& span": {
      color: theme.palette.primary.main,
    },
  },
  replyIcon: {
    position: "absolute !important" as any,
    // color: `red !important` as any,
    bottom: 0,
    right: 0,
  },
}));

interface Props {
  image?: string;
  animation_url?: string;
  name: string;
  amount: number;
  tokenId: number;
}

const ItemCard: React.FC<Props> = ({ image, animation_url, name, amount, tokenId }) => {
  const classes = useStyles();
  const history = useHistory();
  const { openModal } = useContext(ModalContext);

  const handleTransfer = ()=>{
    openModal(
      "Transfer Token",
      {tokenId,max:amount},
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.imgContainer}>
        <LoadingImg src={image || animation_url || ""} alt="" />
        <IconButton className={classes.replyIcon} color="primary" onClick={handleTransfer}>
          <ReplyIcon style={{ transform: "scaleX(-1)" }} />
        </IconButton>
        <div className={classes.quantityContainer}>
          <div className={classes.quantityWrapper}>
            <Typography className={classes.quantityText}>
              {amount} <span>Total</span>
            </Typography>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        fullWidth
        variant="outlined"
        style={{ marginTop: 30 }}
        onClick={() => history.push(`/order-item/${POOL_CARD_ADDRESS}/${tokenId}`)}
      >
        {name}
      </Button>
    </div>
  );
};

export default ItemCard;
