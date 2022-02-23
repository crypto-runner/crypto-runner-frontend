import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Pagination, Theme, Typography } from "@mui/material";
import Values from "./components/Values";
import Filters from "./components/Filters";
import NftCard from "./components/NftCard";
import Social from "src/components/Social/Social";
import { useAllPacks } from "@nftvillage/presale-sdk";
import { useDispatch } from "react-redux";
import { setUserLoading } from "src/state/user/userReducer";
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

interface Props { }

const NFTPackSale: React.FC<Props> = () => {
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
          <b>CryptoRunner NFTS</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <Values />
        <Grid container spacing={2} style={{ marginTop: 30 }}>
          <Grid item xs={12} md={3}>
            <Filters />
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {/* {packs && (
                <Grid key={uuid()} item xs={12} sm={6} md={4}>
                  <NftCard pack={packs && packs[0]} />
                </Grid>
              )} */}
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

export default NFTPackSale;
