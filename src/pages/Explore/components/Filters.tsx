import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Checkbox,
  FormControlLabel,
  Hidden,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
} from "@mui/material";

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

const allFilters = ["King Aurthus", "Mage", "King Aurthus", "Mage"];

const Filters: React.FC<Props> = () => {
  const classes = useStyles();
  const [filter1, setFilter1] = React.useState<string[]>([]);

  const handleChange1 = (event: SelectChangeEvent<typeof filter1>) => {
    const {
      target: { value },
    } = event;
    setFilter1(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className={classes.root}>
      <Hidden mdDown>
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
      </Hidden>
      <Hidden mdUp>
        <Select
          multiple
          displayEmpty
          value={filter1}
          onChange={handleChange1}
          fullWidth
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Filter 1</em>;
            }

            return selected.join(", ");
          }}
        >
          <MenuItem disabled value="">
            <em>Filter 1</em>
          </MenuItem>
          {allFilters.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={filter1.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        <Select
          style={{ marginTop: 10 }}
          multiple
          displayEmpty
          value={filter1}
          onChange={handleChange1}
          fullWidth
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Filter 2</em>;
            }
            return selected.join(", ");
          }}
        >
          <MenuItem disabled value="">
            <em>Filter 2</em>
          </MenuItem>
          {allFilters.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={filter1.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        <Select
          style={{ marginTop: 10 }}
          multiple
          displayEmpty
          value={filter1}
          onChange={handleChange1}
          fullWidth
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Filter 3</em>;
            }

            return selected.join(", ");
          }}
        >
          <MenuItem disabled value="">
            <em>Filter 3</em>
          </MenuItem>
          {allFilters.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={filter1.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </Hidden>
    </div>
  );
};

export default Filters;
