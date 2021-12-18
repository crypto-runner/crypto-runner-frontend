import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import { Order } from "@nftvillage/marketplace-sdk";
import { useHistory } from "react-router-dom";

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
  order: Order;
}

const NftCard: React.FC<Props> = ({ order }) => {
  const classes = useStyles();
  const history = useHistory();

  const redirect = () => {
    history.push(`/order-item/${order.order.asset}/${order.order.assetId}`);
  };

  return (
    <div className={classes.root} onClick={redirect}>
      <div className={classes.imgContainer}>
        <img src={order.metadata.image} alt="" />
        <div className={classes.quantityContainer}>
          <div className={classes.quantityWrapper}>
            <Typography className={clsx(classes.quantityText, "styleFont")}>
              {order.metadata.name}
            </Typography>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        fullWidth
        variant="outlined"
        style={{ marginTop: 30 }}
        // onClick={isApproved ? handleBuy : handleApprove}
      >
        {/* {isApproved ? "Buy" : "Approve"} */}
        {order.metadata.price}
      </Button>
    </div>
  );
};

export default NftCard;
