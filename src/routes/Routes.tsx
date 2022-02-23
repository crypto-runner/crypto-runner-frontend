import React from "react";
import { Switch, Route } from "react-router-dom";
import EmailVerification from "src/pages/EmailVerification/EmailVerification";
import NFTPackSale from "src/pages/NFTPackSale/NFTPackSale";
import Farm from "src/pages/Farm/Farm";
import ForgotPassword from "src/pages/ForgotPassword/ForgotPassword";
import Home from "src/pages/Home/Home";
import Inventory from "src/pages/Inventory/Inventory";
import Login from "src/pages/Login/Login";
import Marketplace from "src/pages/Marketplace/Marketplace";
import Nfts from "src/pages/Nfts/Nfts";
import OrderPage from "src/pages/OrderPage/OrderPage";
import ProfileSettings from "src/pages/ProfileSettings/ProfileSettings";
import ResetPassword from "src/pages/ResetPassword/ResetPassword";
import Signup from "src/pages/Signup/Signup";
import VerifyingEmail from "src/pages/VerifyingEmail/VerifyingEmail";
import Chest from "src/pages/Chest/Chest";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/homepage" exact component={Home} />
      {/* <Route path="/packs" exact component={Nfts} /> */}
      <Route path="/mint-runner" exact component={NFTPackSale} />
      <Route path="/marketplace" exact component={Marketplace} />
      <Route path="/farms" exact component={Farm} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/verifying-otp" exact component={VerifyingEmail} />
      <Route path="/email-verification" exact component={EmailVerification} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/profile" exact component={ProfileSettings} />
      <Route path="/my-runners" exact component={Inventory} />
      <Route path="/treasure-chest" exact component={Chest} />
      <Route path="/" exact component={Farm} />
      <Route path="/order-item/:asset/:assetId" exact component={OrderPage} />
    </Switch>
  );
};

export default Routes;
