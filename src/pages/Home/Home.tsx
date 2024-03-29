import { makeStyles } from "@mui/styles";
import React from "react";
import Social from "src/components/Social/Social";
import Features from "./components/Features";
import Roadmap from "./components/Roadmap";
import Row1 from "./components/Row1";
import Team from "./components/Team";
import Trailer from "./components/Trailer";

const useStyles = makeStyles((theme) => ({}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Row1 />
      <Features />
      <Trailer />
      <Roadmap />
      <Team />
      <Social />
    </div>
  );
};

export default Home;
