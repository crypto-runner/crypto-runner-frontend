import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { Order, useBuyFixPriceOrder } from "@nftvillage/marketplace-sdk";
import { useDispatch } from "react-redux";
import { setUserLoading } from "src/redux/user/userReducer";
import { notify } from "reapop";
import { useWalletProvider } from "@react-dapp/wallet";
import { deleteOrder } from "src/api";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  buyBtn: {
    width: 150,
    height: 50,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  priceField: {
    height: "100%",
    background: "white",
    borderRadius: 5,
  },
}));

interface Props {
  order?: Order;
  createOrder?: any;
  price?: any;
  setPrice?: any;
}

const Content: React.FC<Props> = ({
  order,
  createOrder,
  price,
  setPrice,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useWalletProvider();

  let buyHook = useBuyFixPriceOrder(
    order?.order.asset || "",
    order?.order.assetId || 0,
    account || ""
  );

  const handleApprove = async () => {
    await buyHook?.approve();
    dispatch(
      notify({
        status: "success",
        title: "Token Approved",
      })
    );
  };

  const handleBuy = async () => {
    dispatch(setUserLoading(true));
    let res = await buyHook?.buyFixOrder();
    console.log(res);
    if (res?.status) {
      dispatch(
        notify({
          status: "success",
          title: "Success",
        })
      );
      await deleteOrder(order?.order.asset as string, String(order?.order.assetId) as string)
      window.location.reload();
    } else {
      dispatch(
        notify({
          status: "error",
          title: "Error",
        })
      );
    }
    dispatch(setUserLoading(false));
  };

  const putOnSale = () => {
    createOrder({name:order?.metadata.name});
  };

  console.log(order);
  return (
    <div className={classes.root}>
      <Typography color="textSecondary" variant="h3" className="styleFont">
        <b>{order?.metadata.name}</b>
      </Typography>
      <Typography color="primary" variant="h5" className="styleFont">
        <b>{order?.metadata.price} BNB</b>
      </Typography>
      <Typography color="textSecondary" variant="h5" style={{ marginTop: 20 }}>
        Information
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        <Grid item xs={6}>
          <Typography color="textSecondary">CA</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">0xCB4Db2D1...</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Character</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">King Arthur</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Element</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Earth</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Rarity</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Common</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Class</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Tank</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">Race Time</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="textSecondary">0</Typography>
        </Grid>
      </Grid>
      {order && (
        <Button
          color="primary"
          variant="outlined"
          className={classes.buyBtn}
          style={{ marginTop: 20 }}
          onClick={buyHook?.isApproved ? handleBuy : handleApprove}
        >
          {buyHook?.isApproved ? "Buy" : "Approve"}
        </Button>
      )}
      {/* {order?.order.maker !== account && (
      )} */}
      {!order && (
        <div className={classes.row} style={{ marginTop: 20 }}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.buyBtn}
            onClick={putOnSale}
          >
            Put On Sale {!buyHook?.isApproved ? "(Approve)" : ""}
          </Button>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
            placeholder="Price"
            size="small"
            className={classes.priceField}
          />
          BNB
        </div>
      )}
      {/* {order?.order.maker === account && (
      )} */}
    </div>
  );
};

export default Content;
