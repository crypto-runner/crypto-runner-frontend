import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { POOL_CARD_ADDRESS } from "src/config/config";
import LoadingImg from "src/components/LoadingImg/LoadingImg"

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

  return (
    <div style={{ position: "relative" }} onClick={() => history.push(`/order-item/${POOL_CARD_ADDRESS}/${tokenId}`)}>
      <div className={classes.imgContainer}>
          <LoadingImg  src={image || animation_url || ""} alt="" />
        {/* <img src={image || animation_url} alt="" /> */}
        <div className={classes.quantityContainer}>
          <div className={classes.quantityWrapper}>
            <Typography className={classes.quantityText}>
              {amount} <span>Total</span>
            </Typography>
          </div>
        </div>
      </div>
      <Button color="primary" fullWidth variant="outlined" style={{ marginTop: 30 }}>
        {name}
      </Button>
    </div>
  );
};

export default ItemCard;
