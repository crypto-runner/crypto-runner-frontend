import React from "react";
import { makeStyles } from "@mui/styles";
import { Checkbox, FormControlLabel, Theme, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: 30,
  },
  filterContainer: {
    background: "white",
    padding: 20,
  },
}));

interface Props {}

const Filters: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.filterContainer}>
        <Typography
          className="styleFont"
          color="primary"
          variant="h5"
          style={{ marginBottom: 15 }}
        >
          <b> Runners</b>
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Mage"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Ice Drake"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
      </div>
      <div className={classes.filterContainer} style={{ margin: "20px 0px" }}>
        <Typography
          className="styleFont"
          color="primary"
          variant="h5"
          style={{ marginBottom: 15 }}
        >
          <b> Runners</b>
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Mage"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Ice Drake"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
      </div>
      <div className={classes.filterContainer}>
        <Typography
          className="styleFont"
          color="primary"
          variant="h5"
          style={{ marginBottom: 15 }}
        >
          <b> Runners</b>
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Mage"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="Ice Drake"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" />}
          label="King Aurthus"
        />
      </div>
    </div>
  );
};

export default Filters;
