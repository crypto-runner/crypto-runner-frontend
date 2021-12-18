import { Backdrop, CircularProgress, Container } from "@mui/material";
import React from "react";
import "./App.css";
import Routes from "src/routes/Routes";
import { ThemeProvider } from "@mui/material";
import theme from "src/util/theme";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import { connect } from "react-redux";
import { useGetUser } from "./hooks/useUser";
import { useEagerConnect, useWalletProvider } from "@react-dapp/wallet";
import { UtilsProvider } from "@react-dapp/utils";
import { LoadingProvider } from "./Context/LoadingContext";
import "sweetalert2/src/sweetalert2.scss";

interface Props {
  loading: boolean;
  user: any;
}

const App: React.FC<Props> = ({ loading, user }) => {
  const { getUser } = useGetUser();
  useEagerConnect(Boolean(user.address));
  const { library } = useWalletProvider();
  
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <UtilsProvider config={{ provider: library }}>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <Backdrop
            open={loading}
            style={{ zIndex: 9999,  }}
          >
            <CircularProgress color="primary" />
          </Backdrop>
          <Container maxWidth="xl" disableGutters>
            <div className="mainContainer">
              <Navbar />
              <div>
                <Routes />
              </div>
              <Footer />
            </div>
          </Container>
        </LoadingProvider>
      </ThemeProvider>
    </UtilsProvider>
  );
};

const mapState = (store: any) => ({
  loading: store.user.loading,
  user: store.user.user,
});

export default connect(mapState)(App);
