import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import history from "src/util/history";
import { Router } from "react-router-dom";
import { setUpNotifications, NotificationsProvider } from "reapop";
import NotificationsSystem from "src/components/NotificationsSystem/NotificationsSystem";
import { Provider } from "react-redux";
import store from "./state";
import { WalletProvider, CHAIN_ID } from "@react-dapp/wallet";

// run this function when your application starts before creating any notifications
setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    showDismissButton: true,
    dismissAfter: 5000,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <WalletProvider
        // @ts-ignore 
        config={{
          supportedChainIds: [CHAIN_ID.GOERLI],
          chainId: CHAIN_ID.GOERLI,
          rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        }}
      >
        <Provider store={store}>
          <NotificationsProvider>
            <NotificationsSystem />
            <App />
          </NotificationsProvider>
        </Provider>
      </WalletProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
