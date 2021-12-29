import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useOrder, useSellOrder, Order } from "@nftvillage/marketplace-sdk";
import Content from "./components/Content";
import OrderHistory from "./components/OrderHistory";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useWalletProvider } from "@react-dapp/wallet";
import Img1 from "src/assets/gifs/presale/Jack_23122.gif";
import useCreateOrder from "src/hooks/useCreateOrder";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 50,
  },
}));

interface Props {}

const OrderPage: React.FC<Props> = () => {
  const classes = useStyles();
  const { asset, assetId } = useParams<{ asset: string; assetId: string }>();
  const { createFixPriceOrder, isApproved } = useCreateOrder(asset);
  const { order } = useOrder({
    asset,
    assetId: Number(assetId),
  });
  const [price, setPrice] = React.useState(0);

  const createOrder = async ({ name }: { name: string }) => {
    createFixPriceOrder({
      assetId,
      name,
      price,
    });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img src={order?.metadata.image ?? Img1} alt="" width="100%" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Content
              order={order}
              createOrder={createOrder}
              isApproved={isApproved}
              price={price}
              setPrice={setPrice}
            />
          </Grid>
        </Grid>
      </Container>
      <div style={{ marginTop: 20 }} />
      <OrderHistory />
    </div>
  );
};

export default OrderPage;