import React from "react";
import { Switch, Route } from "react-router-dom";
import EmailVerification from "src/pages/EmailVerification/EmailVerification";
import Explore from "src/pages/Explore/Explore";
import Farm from "src/pages/Farm/Farm";
import ForgotPassword from "src/pages/ForgotPassword/ForgotPassword";
import Home from "src/pages/Home/Home";
import Login from "src/pages/Login/Login";
import Nfts from "src/pages/Nfts/Nfts";
import ResetPassword from "src/pages/ResetPassword/ResetPassword";
import Signup from "src/pages/Signup/Signup";
import VerifyingEmail from "src/pages/VerifyingEmail/VerifyingEmail";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/presale" exact component={Nfts} />
      <Route path="/explore" exact component={Explore} />
      <Route path="/farm" exact component={Farm} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/verifying-otp" exact component={VerifyingEmail} />
      <Route path="/email-verification" exact component={EmailVerification} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
