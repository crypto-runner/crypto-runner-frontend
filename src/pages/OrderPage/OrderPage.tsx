import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useOrder, useSellOrder, Order } from "@nftvillage/marketplace-sdk";
import Content from "./components/Content";
import OrderHistory from "./components/OrderHistory";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useWalletProvider } from "@react-dapp/wallet";
import Img1 from "src/assets/gifs/presale/CzFinance_1.gif";
import useCreateOrder from "src/hooks/useCreateOrder";
import { getRunner, RUNNERS } from "src/config/cards";
import { useMetadata } from "src/hooks/useMetadata";
import useLoading from "src/hooks/useLoading";

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
  const { metadata, loading } = useMetadata(asset, assetId);
  useLoading(loading);

  const createOrder = async () => {
    createFixPriceOrder({
      name: getRunner(assetId)?.name || "Name",
      assetId,
      price,
    });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img src={metadata?.animation_url || metadata?.image} alt="" width="100%" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Content
              metadata={metadata}
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
