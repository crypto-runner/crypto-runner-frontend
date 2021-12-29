import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  Hidden,
  Pagination,
  Theme,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import Filters from "./components/Filters";
import NftCard from "./components/NftCard";
import Social from "src/components/Social/Social";
import { useAllPacks } from "@nftvillage/presale-sdk";
import LoadingContext from "src/Context/LoadingContext";
import { useDispatch } from "react-redux";
import { setUserLoading } from "src/redux/user/userReducer";
import { v4 as uuid } from "uuid";
import {
  useOrders,
  useFilterMarketPlace,
  FilterMarketPlace,
  Order,
} from "@nftvillage/marketplace-sdk";
import { useWalletProvider } from "@react-dapp/wallet";
import ModalContext from "src/Context/ModalContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 70,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
}));

interface Props {}

const Marketplace: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openModal } = useContext(ModalContext);
  // const [page, setPage] = React.useState(1);
  const { filter, filterMarketPlace } = useFilterMarketPlace();
  const [filterState, setFilterState] = React.useState<FilterMarketPlace>({
    minPrice: "0",
  });
  const { account } = useWalletProvider();
  const [orders, setOrders] = React.useState<Order[]>([]);

  const fetchOrders = async () => {
    dispatch(setUserLoading(true));
    let res = await filterMarketPlace(filterState);
    setOrders(res);
    dispatch(setUserLoading(false));
  };

  React.useEffect(() => {
    fetchOrders();
  }, [account]);

  return (
    <div className={classes.root}>
      <Button
        onClick={() => {
          openModal(
            "HelloWorld",
            { asd: "ga" },
            { hideTitle: true, hideCloseBtn: true }
          );
        }}
      >
        akshdk
      </Button>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>MARKEPLACE</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <Grid container spacing={2} style={{ marginTop: 30 }}>
          <Grid item xs={12} md={3}>
            <Filters
              filterState={filterState}
              setFilterState={setFilterState}
              applyFilters={() => fetchOrders()}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {orders?.map((order) => (
                <Grid key={uuid()} item xs={12} sm={6} md={4}>
                  <NftCard order={order} />
                </Grid>
              ))}
            </Grid>
            <div className={classes.paginationContainer}>
              {/* <Pagination
                count={orders?.totalPages}
                color="primary"
                shape="rounded"
                page={page}
                onChange={(e, v) => setPage(v)}
              /> */}
            </div>
          </Grid>
        </Grid>
        <Social />
      </Container>
    </div>
  );
};

export default Marketplace;
