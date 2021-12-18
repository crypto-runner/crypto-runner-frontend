import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
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
  const { packs, loading } = useAllPacks();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (loading) {
      dispatch(setUserLoading(true));
    } else {
      dispatch(setUserLoading(false));
    }
  }, [loading]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>MARKEPLACE</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <Grid container spacing={2} style={{ marginTop: 30 }}>
          <Grid item xs={12} md={3}>
            <Filters />
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {packs?.map((item) => (
                <Grid key={uuid()} item xs={12} sm={6} md={4}>
                  <NftCard pack={item} />
                </Grid>
              ))}
            </Grid>
            <div className={classes.paginationContainer}>
              <Pagination count={10} color="primary" shape="rounded" />
            </div>
          </Grid>
        </Grid>
        <Social />
      </Container>
    </div>
  );
};

export default Marketplace;
