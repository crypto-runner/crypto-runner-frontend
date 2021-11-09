import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Container, Grid, Theme, Typography } from "@mui/material";
import CoinPng from "src/assets/images/coin.png";
import NFTPng from "src/assets/images/nft.png";
import StakePng from "src/assets/images/stake.png";
import MapPng from "src/assets/images/map.png";
import RacePng from "src/assets/images/race.png";
import RewardPng from "src/assets/images/rewards.png";
import { v4 as uuid } from "uuid";
import Bg from "src/assets/images/orangebg.jpg";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    backgroundSize: "cover",
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
  },
  grid: {
    transform: "translateY(-50px)",
  },
}));

interface Props {}

interface FeatureData {
  title: string;
  imageSrc: any;
  para: string;
}

const allFeatures: FeatureData[] = [
  {
    title: "Run 2 Earn",
    imageSrc: CoinPng,
    para: "A Run to Earn themed NFT Gaming, Easy to play and Earn.",
  },
  {
    title: "NFT Marketplace",
    imageSrc: NFTPng,
    para: "CryptoRunner NFTs Marketplace is where you create, sell, and buy NFTs digital content.",
  },
  {
    title: "Staking/Farming",
    imageSrc: StakePng,
    para: "Users can Stake their tokens to receive points that can be used in claiming rare in-game collectibles",
  },
  {
    title: "Treasure Hunt",
    imageSrc: MapPng,
    para: "treasure hunts once every month, where 100 players will come across a MysteryBox worth  $100 or Rare NFTs",
  },
  {
    title: "Daily Race",
    imageSrc: RacePng,
    para: "Players will race daily to collect token rewards and other hidden gems in the metaverse",
  },
  {
    title: "Rewards",
    imageSrc: RewardPng,
    para: "Achievments, tasks, unions, battles, collections and many more to earn",
  },
];

const Features: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.grid}>
          {allFeatures.map((feature) => (
            <Grid key={uuid()} item xs={12} sm={6} md={4}>
              <Card style={{ height: "100%" }}>
                <div className="center">
                  <img alt="" src={feature.imageSrc} />
                </div>
                <Typography
                  variant="h5"
                  align="center"
                  className={clsx(classes.heading, "styleFont")}
                >
                  <b>{feature.title}</b>
                </Typography>
                <Typography align="center">{feature.para}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Features;
