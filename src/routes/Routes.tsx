import React from "react";
import { Switch, Route } from "react-router-dom";
import Farm from "src/pages/Farm/Farm";
import Home from "src/pages/Home/Home";
import Nfts from "src/pages/Nfts/Nfts";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/presale" exact component={Nfts} />
      <Route path="/farm" exact component={Farm} />
    </Switch>
  );
};

export default Routes;
