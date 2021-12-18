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
  Slider,
  Theme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: 30,
  },
  filterContainer: {
    background: "white",
    padding: 20,
    paddingTop: 0,
  },
}));

interface Props {}

const allFilters = ["King Aurthus", "Mage", "King Aurthus", "Mage"];

const priceMarks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 37,
    label: "37",
  },
  {
    value: 100,
    label: "100",
  },
];

const Filters: React.FC<Props> = () => {
  const classes = useStyles();
  const [filter1, setFilter1] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<number[]>([20, 37]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleChange1 = (event: SelectChangeEvent<typeof filter1>) => {
    const {
      target: { value },
    } = event;
    setFilter1(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className={classes.root}>
      {/* <Hidden mdDown> */}
        <Accordion disableGutters square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="styleFont" color="primary" variant="h5">
              <b>Sort</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.filterContainer}>
              <FormControlLabel
                control={<Checkbox color="default" />}
                label="Date High to Low"
              />
              <FormControlLabel
                control={<Checkbox color="default" />}
                label="Date Low to High"
              />
              <FormControlLabel
                control={<Checkbox color="default" />}
                label="Price High to Low"
              />
              <FormControlLabel
                control={<Checkbox color="default" />}
                label="Price Low to High"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters square style={{ marginTop: 20 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="styleFont" color="primary" variant="h5">
              <b> Price</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.filterContainer}>
              <Slider
                value={priceRange}
                min={0}
                max={200}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                // marks={priceMarks}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Min: {priceRange[0]}</Typography>
                <Typography>Max: {priceRange[1]}</Typography>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters square style={{marginTop:20,}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="styleFont" color="primary" variant="h5">
              <b>Categories</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.filterContainer}>
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
          </AccordionDetails>
        </Accordion>
      {/* </Hidden> */}
      {/* <Hidden mdUp>
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
      </Hidden> */}
    </div>
  );
};

export default Filters;
