import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useOrder, useSellOrder, Order } from "@nftvillage/marketplace-sdk";
import Content from "./components/Content";
import OrderHistory from "./components/OrderHistory";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useWalletProvider } from "@react-dapp/wallet";
import { utils } from "ethers";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 50,
  },
}));

interface Props {}

const OrderPage: React.FC<Props> = () => {
  const classes = useStyles();
  const { account } = useWalletProvider();
  const { asset, assetId } = useParams<{ asset: string; assetId: string }>();
  const { create, approve, isApproved } = useSellOrder(asset);
  const { order } = useOrder({
    asset,
    assetId: Number(assetId),
  });
  const [price, setPrice] = React.useState(0);

  const createOrder = async () => {
    let ord: Order = {
      order: {
        asset,
        assetId: Number(assetId),
        maker: account || "",
        side: 0,
        assetType: 1,
        saleKind: 0,
        basePrice: price.toString(),
      },
      metadata: {
        name: "Something New3",
        attributes: [],
        price: price,
        address: POOL_CARD_ADDRESS,
        tokenId: Number(assetId),
        collectionName: "crypto-runner",
        makerAddress: account || "",
      },
    };

    console.log("asd", isApproved);
    if (!isApproved) {
      let res = await approve();
      if (!res) return;
    }
    let res = await create(ord);
    console.log(res);
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img src={order?.metadata.image} alt="" width="100%" />
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
