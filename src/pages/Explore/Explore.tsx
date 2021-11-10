import React from "react";
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
import Values from "./components/Values";
import Filters from "./components/Filters";
import NftCard from "./components/NftCard";
import Social from "src/components/Social/Social";

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

const Explore: React.FC<Props> = () => {
  const classes = useStyles();

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
          <Grid item xs={3}>
            <Filters />
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NftCard />
              </Grid>
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

export default Explore;
