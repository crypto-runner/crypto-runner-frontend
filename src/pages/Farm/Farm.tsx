import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Grid, Skeleton, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import FarmCard from "./components/FarmCard";
import Social from "src/components/Social/Social";
import { Pool, usePools } from "@nftvillage/farms-sdk";
import { useInventoryERC1155 } from "@nftvillage/marketplace-sdk";
import { POOL_CARD_ADDRESS } from "src/config/config";

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

interface Props { }

interface ModifiedPool extends Pool {
  enabled?: boolean;
  requiredCard?: string | number;
  image?: string
}

const Farm: React.FC<Props> = () => {
  const classes = useStyles();
  const { pools, loading: poolsLoading } = usePools();
  const { loading, results } = useInventoryERC1155(POOL_CARD_ADDRESS, 205);
  const [modifiedPools, setModifiedPools] = React.useState<ModifiedPool[]>([]);

  const filterPools = () => {
    let modifiedPools: ModifiedPool[] = pools.map((pool: Pool, index) => {
      let p: ModifiedPool = { ...pool, enabled: false };
      let ele = results.find((item: any) => item.rarity === index + 1);
      console.log(ele)
      if (ele) {
        p.enabled = true;
        p.requiredCard = ele?.tokenId;
        p.image = ele.image
      } else {
        p.enabled = false;
        p.requiredCard = ele?.tokenId;
      }
      return p;
    });

    setModifiedPools(modifiedPools);
  };

  React.useEffect(() => {
    filterPools();
  }, [results, pools]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>NFT Staking</b>
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
          {modifiedPools?.map((e, i) => {
            return (
              <Grid key={i} item xs={12} md={6}>
                <FarmCard poolId={e.poolId} enabled={e?.enabled} requiredCard={e.requiredCard} image={e.image} />
              </Grid>
            );
          })}
        </Grid>
        {poolsLoading && modifiedPools.length <= 0 && (
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
