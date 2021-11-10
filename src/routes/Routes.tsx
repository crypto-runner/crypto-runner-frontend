import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "src/pages/Home/Home";
import Nfts from "src/pages/Nfts/Nfts";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/presale" exact component={Nfts} />
    </Switch>
  );
};

export default Routes;
