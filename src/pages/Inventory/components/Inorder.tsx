import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Theme, Typography } from "@mui/material";
import { useWalletProvider } from "@react-dapp/wallet";
import { useAllListedOrdersForAddress } from "@nftvillage/marketplace-sdk";
import { v4 as uuid } from "uuid";
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
    // textAlign: "center",
    fontWeight: 600,
    fontSize: 20,
    "& span": {
      color: theme.palette.primary.main,
    },
  },
}));

interface Props { }

const Inorder: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { account } = useWalletProvider();
  const { orders } = useAllListedOrdersForAddress(account || "");
  console.log(orders);

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {orders?.map((item) => (
        <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
          <div
            style={{ position: "relative" }}
            onClick={() =>
              history.push(
                `/order-item/${item.order.asset}/${item.order.assetId}`
              )
            }
          >
            <div className={classes.imgContainer}>
              <img src={item.metadata?.image} />
              <div className={classes.quantityContainer}>
                <div className={classes.quantityWrapper}>
                  <Typography className={classes.quantityText}>
                    {item.metadata.price} <span>BNB</span>
                  </Typography>
                </div>
              </div>
            </div>
            <Button
              color="primary"
              fullWidth
              variant="outlined"
              style={{ marginTop: 30 }}
            >
              {item.metadata.name}
            </Button>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Inorder;
