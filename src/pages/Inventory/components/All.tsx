import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Theme, Typography } from "@mui/material";
import { useInventory } from "src/hooks/useInventory";
import { v4 as uuid } from "uuid";
import ItemCard from "./ItemCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {}

const All: React.FC<Props> = () => {
  const classes = useStyles();
  const { balance, loading } = useInventory();

  // console.log("balance",balance);

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {balance?.map((item: any) => (
        <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
          <ItemCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default All;
