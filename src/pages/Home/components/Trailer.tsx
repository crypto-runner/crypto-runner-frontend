import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Theme, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 30,
  },
}));

interface Props {}

const Trailer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" align="center">
          Cryptorunner embodies the play to earn mechanism like no other, the
          easy to play game enables gamers of all experience levels to have fun
          running and earning. Cryptorunner is a huge step at fostering
          mainstream adoption of blockchain NFT gaming.
        </Typography>
      </Container>
    </div>
  );
};

export default Trailer;
