import React from "react";
import { makeStyles } from "@mui/styles";
import { Hidden, Theme, Typography } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  valuesDiv: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1.5fr",
    gap: 10,
    marginTop: 20,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  valueWrapper: {
    border: "2px solid white",
  },
  valueText: {
    textAlign: "center",
    fontWeight: 600,
    "& span": {
      opacity: 0.7,
    },
  },
}));

interface Props {
  displayBalance?: any;
}

const Values: React.FC<Props> = ({ displayBalance }) => {
  const classes = useStyles();

  return (
    <div className={classes.valuesDiv}>
      <div className={classes.valueWrapper}>
        <Typography variant="h6" color="textSecondary" className={clsx(classes.valueText, "styleFont")}>
          <span>Balance</span> {displayBalance} Points
        </Typography>
      </div>
    </div>
  );
};

export default Values;
