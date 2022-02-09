import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Divider, Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useOrder, useSellOrder, Order } from "@nftvillage/marketplace-sdk";
import Content from "./components/Content";
import OrderHistory from "./components/OrderHistory";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useWalletProvider } from "@react-dapp/wallet";
import { useMetadata } from "src/hooks/useMetadata";
import useLoading from "src/hooks/useLoading";
import LoadingImg from "src/components/LoadingImg/LoadingImg";
import CurrentListing from "./components/CurrentListing";
import { useERC1155Balance } from "@react-dapp/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 50,
  },
}));

interface Props {}

const OrderPage: React.FC<Props> = () => {
  const classes = useStyles();
  const { asset, assetId } = useParams<{ asset: string; assetId: string }>();
  const { balance } = useERC1155Balance(POOL_CARD_ADDRESS, [Number(assetId)]);
  const { order } = useOrder({
    asset,
    assetId: Number(assetId),
  });
  console.log("sell order",order)
  const { metadata, loading } = useMetadata(asset, assetId);
  useLoading(loading);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LoadingImg src={metadata?.animation_url || metadata?.image || ""} />
            {/* <img src={metadata?.animation_url || metadata?.image} alt="" width="100%" /> */}
          </Grid>
          <Grid item xs={12} md={8}>
            <Content metadata={metadata} order={order} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {balance && balance[0].amount > 0 && (
            <Grid item xs={12}>
              <CurrentListing
                metadata={metadata}
                address={asset}
                tokenId={Number(assetId)}
                availableAmount={balance[0].amount || 0}
              />
            </Grid>
          )}
        </Grid>
      </Container>
      <div style={{ marginTop: 20 }} />
      <OrderHistory />
    </div>
  );
};

export default OrderPage;
