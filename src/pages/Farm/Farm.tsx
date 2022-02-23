import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Grid, Skeleton, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import FarmCard from "./components/FarmCard";
import Social from "src/components/Social/Social";
import { usePools } from "@nftvillage/farms-sdk";

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
  const { pools, loading: poolsLoading } = usePools();

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
          {pools?.map((e, i) => {
            return (
              <Grid key={i} item xs={12} md={6}>
                <FarmCard poolId={e.poolId} />
              </Grid>
            );
          })}
        </Grid>
        {poolsLoading && (
          <Grid container spacing={4} style={{ marginTop: 20 }}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" animation="wave" height={350} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" animation="wave" height={350} />
            </Grid>
          </Grid>
        )}
        <Social />
      </Container>
    </div>
  );
};

export default Farm;
