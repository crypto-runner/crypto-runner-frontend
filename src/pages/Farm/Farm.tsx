import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Grid, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import TokenCard from "./components/TokenCard";
import Social from "src/components/Social/Social";
import { Pool, usePools } from "@nftvillage/farms-sdk";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 70,
  },
  selectionBtn: {
    border: "1px solid black",
    borderRadius: 0,
    color: "white",
  },
  btnSelected: {
    background: theme.palette.primary.main,
  },
}));

interface Props {}

const Farm: React.FC<Props> = () => {
  const classes = useStyles();
  usePools();
  const { loading: poolsLoading, data: pools } = useSelector((state: any) => state.pools);
  console.log(pools);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>CryptoRunner NFTS</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <div style={{ marginTop: 20 }}>
          {/* <Button className={clsx(classes.selectionBtn, classes.btnSelected)}>
            MEL
          </Button>
          <Button className={classes.selectionBtn}>BNB</Button>
          <Button className={classes.selectionBtn}>CAKE</Button>
          <Button className={classes.selectionBtn}>BUSD</Button> */}
        </div>
        <Grid container spacing={4} style={{ marginTop: 20 }}>
          {pools?.map((e: Pool, i: number) => {
            return (
              <Grid key={i} item xs={12} md={6}>
                <TokenCard poolId={e.poolId} />
              </Grid>
            );
          })}
        </Grid>
        <Social />
      </Container>
    </div>
  );
};

export default Farm;
