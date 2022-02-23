import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Theme, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import ItemCard from "./ItemCard";
import { POOL_CARD_ADDRESS } from "src/config/config";
import { useInventoryERC1155 } from "@nftvillage/marketplace-sdk";
import useLoading from "src/hooks/useLoading";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {}

const All: React.FC<Props> = () => {
  const classes = useStyles();
  const { loading, results } = useInventoryERC1155(POOL_CARD_ADDRESS, 205);

  useLoading(loading);

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {results?.map((item: any) => (
        <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
          <ItemCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default All;
