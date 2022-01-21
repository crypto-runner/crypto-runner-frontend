import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { useInventory } from "src/hooks/useInventory";
import { setUserLoading } from "src/redux/user/userReducer";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useAllAvailableTokensForAddress, useAllListedOrdersForAddress } from "@nftvillage/marketplace-sdk";
import { useWalletProvider } from "@react-dapp/wallet";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 70,
    paddingBottom: 70,
  },
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

interface Props {}

const Inventory: React.FC<Props> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { balance, loading } = useInventory();
  const dispatch = useDispatch();
  const history = useHistory()

  React.useEffect(() => {
    if (loading) {
      dispatch(setUserLoading(true));
    } else {
      dispatch(setUserLoading(false));
    }
  }, [loading]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setValue(value);
  };
  const { account } = useWalletProvider();
  console.log(account);

  const {tokens} = useAllAvailableTokensForAddress(account || "")
  const { orders } = useAllListedOrdersForAddress(account || "");

  console.log("tokens",tokens,orders);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>My Runners</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="All" />
            <Tab label="Available" />
            <Tab label="Inorder" />
            <Tab label="Direct Sale" />
            <Tab label="Want to Buy" />
          </Tabs>
        </div>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {balance?.map((item) => (
            <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
              <div style={{ position: "relative" }} onClick={()=>history.push(`/order-item/${POOL_CARD_ADDRESS}/${item.tokenId}`)}>
                <div className={classes.imgContainer}>
                  <img src={item.image} alt="" />
                  <div className={classes.quantityContainer}>
                    <div className={classes.quantityWrapper}>
                      <Typography className={classes.quantityText}>
                        {item.amount} <span>Total</span>
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
                  {item.name}
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Inventory;
