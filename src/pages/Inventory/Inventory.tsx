import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import All from "./components/All";
import Inorder from "./components/Inorder";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 70,
    paddingBottom: 70,
  },
}));

interface Props {}

const Inventory: React.FC<Props> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setValue(value);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="h4" className="styleFont">
          <b>My Runners</b>
        </Typography>
        <Typography color="textSecondary" style={{ marginTop: 20 }}>
          Discover the amazing CryptoRunner NFTS
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="All" />
            <Tab label="Inorder" />
          </Tabs>
        </div>
        {value === 0 && <All />}
        {value === 1 && <Inorder />}
      </Container>
    </div>
  );
};

export default Inventory;
