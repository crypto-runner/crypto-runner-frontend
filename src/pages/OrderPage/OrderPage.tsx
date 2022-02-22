import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Divider, Grid, Tab, Tabs, Theme } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useOrderERC1155, useSellOrder, Order, useOrderHistory } from "@nftvillage/marketplace-sdk";
import Content from "./components/Content";
import OrderHistory from "./components/OrderHistory";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useWallet } from "@react-dapp/wallet";
import { useMetadata } from "src/hooks/useMetadata";
import useLoading from "src/hooks/useLoading";
import LoadingImg from "src/components/LoadingImg/LoadingImg";
import CurrentListing from "./components/CurrentListing";
import BuyListing from "./components/BuyListing";
import { useERC1155Balance } from "@react-dapp/utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 50,
  },
}));

interface Props {}

const OrderPage: React.FC<Props> = () => {
  const classes = useStyles();
  const { search } = useLocation();
  let searchParams = new URLSearchParams(search);
  const { asset, assetId } = useParams<{ asset: string; assetId: string }>();
  const { balance } = useERC1155Balance(POOL_CARD_ADDRESS, [Number(assetId)]);
  const [value, setValue] = React.useState(0);
  const { orders: orderHistory, loading: orderHistoryLoading } = useOrderHistory({ asset, assetId: Number(assetId) });
  const { account } = useWallet();

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    setValue(value);
  };
  const { order: allOrders } = useOrderERC1155({
    asset,
    assetId: Number(assetId),
  });
  const { metadata, loading: metadataLoading } = useMetadata(asset, assetId);
  useLoading(metadataLoading || orderHistoryLoading);

  React.useEffect(() => {
    if (balance && balance[0].amount > 0) {
      setValue(1);
    }
  }, [balance]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LoadingImg src={metadata?.animation_url || metadata?.image || ""} />
            {/* <img src={metadata?.animation_url || metadata?.image} alt="" width="100%" /> */}
          </Grid>
          <Grid item xs={12} md={8}>
            <Content
              metadata={metadata}
              order={
                allOrders &&
                allOrders.find((ord) => ord.order._id === searchParams.get("orderId") && ord.order.maker !== account)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Buy" color="secondary" />
              {balance && balance[0].amount > 0 && <Tab label="Sell" />}
            </Tabs>
            {/* <Divider color="secondary"/> */}
          </Grid>
          {value === 1 && (
            <Grid item xs={12}>
              <CurrentListing
                metadata={metadata}
                address={asset}
                tokenId={Number(assetId)}
                availableAmount={(balance && balance[0].amount) || 0}
                allOrders={allOrders || []}
              />
            </Grid>
          )}
          {value === 0 && (
            <Grid item xs={12}>
              <BuyListing allOrders={allOrders || []} />
            </Grid>
          )}
        </Grid>
      </Container>
      <div style={{ marginTop: 20 }} />
      <OrderHistory orderHistory={orderHistory} />
    </div>
  );
};

export default OrderPage;
