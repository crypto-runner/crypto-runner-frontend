import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

interface Props {
  data: any;
  closeModal: () => {};
}

const HelloWorld: React.FC<Props> = (props) => {
  const classes = useStyles();
  console.log(props);
  return <div className={classes.root}>Hellow Wordl
  <Button onClick={props.closeModal}>
      Close
  </Button>
  </div>;
};

export default HelloWorld;
