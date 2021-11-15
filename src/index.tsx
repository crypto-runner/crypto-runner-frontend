import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import history from "src/util/history";
import { Router } from "react-router-dom";
import { WalletProvider } from '@react-dapp/wallet'

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);