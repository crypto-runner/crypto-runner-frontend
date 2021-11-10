import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import PackCard from "./components/PackCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 70,
  },
}));

interface Props {}

const Nfts: React.FC<Props> = () => {
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
        <Grid container spacing={4} style={{ marginTop: 30 }}>
          <Grid item xs={12} sm={6} md={4}>
            <PackCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PackCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PackCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Nfts;
