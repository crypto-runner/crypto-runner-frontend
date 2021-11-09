import { Container } from "@mui/material";
import React from "react";
import "./App.css";
import Routes from "src/routes/Routes";
import { ThemeProvider } from "@mui/material";
import theme from "src/util/theme";
import Navbar from "src/components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" disableGutters>
        <div className="mainContainer">
          <Navbar />
          <div>
            <Routes />
          </div>
          {/* <Footer /> */}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
