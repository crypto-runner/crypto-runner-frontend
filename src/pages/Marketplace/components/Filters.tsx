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
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterMarketPlace } from "@nftvillage/marketplace-sdk";

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

interface Props {
  filterState: FilterMarketPlace;
  setFilterState: React.Dispatch<React.SetStateAction<FilterMarketPlace>>;
  applyFilters: () => void;
}

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

const Filters: React.FC<Props> = ({ filterState, setFilterState, applyFilters }) => {
  const classes = useStyles();
  const [filter1, setFilter1] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<number[]>([20, 37]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setFilterState({
      ...filterState,
      minPrice: (newValue as number[])[0].toString(),
      maxPrice: (newValue as number[])[1].toString() || undefined,
    });
  };

  const handleChange1 = (event: SelectChangeEvent<typeof filter1>) => {
    const {
      target: { value },
    } = event;
    setFilter1(typeof value === "string" ? value.split(",") : value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFilterState({
      ...filterState,
      sortBy: checked ? (event.target.name as FilterMarketPlace["sortBy"]) : undefined,
    });
  };

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFilterState({
      ...filterState,
      category: checked ? (event.target.name as FilterMarketPlace["category"]) : undefined,
    });
  };

  const clearFilter = () => {
    setFilterState({
      minPrice: "0",
    });
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
              control={
                <Checkbox
                  checked={filterState.sortBy === "LATEST" || false}
                  name="LATEST"
                  onChange={handleSort}
                  color="default"
                />
              }
              label="Latest"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterState.sortBy === "OLDEST" || false}
                  name="OLDEST"
                  onChange={handleSort}
                  color="default"
                />
              }
              label="Oldest"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterState.sortBy === "PRICE_HIGH_TO_LOW" || false}
                  name="PRICE_HIGH_TO_LOW"
                  onChange={handleSort}
                  color="default"
                />
              }
              label="Price High to Low"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterState.sortBy === "PRICE_LOW_TO_HIGH" || false}
                  name="PRICE_LOW_TO_HIGH"
                  onChange={handleSort}
                  color="default"
                />
              }
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
              value={[Number(filterState.minPrice) || 0, Number(filterState.maxPrice) || 10000]}
              min={0}
              max={10000}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              // marks={priceMarks}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Min: {Number(filterState.minPrice) || 0}</Typography>
              <Typography>Max: {Number(filterState.maxPrice) || 10000}</Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Categories */}
      {/* <Accordion disableGutters square style={{ marginTop: 20 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="styleFont" color="primary" variant="h5">
            <b>Categories</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.filterContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  name="King Aurthus"
                  checked={filterState.category === "King Aurthus"}
                  onChange={handleCategory}
                  color="default"
                />
              }
              label="King Aurthus"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Mage"
                  checked={filterState.category === "Mage"}
                  onChange={handleCategory}
                  color="default"
                />
              }
              label="Mage"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Ice Drake"
                  checked={filterState.category === "Ice Drake"}
                  onChange={handleCategory}
                  color="default"
                />
              }
              label="Ice Drake"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Someelse"
                  checked={filterState.category === "Someelse"}
                  onChange={handleCategory}
                  color="default"
                />
              }
              label="Someelse"
            />
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* <div className={classes.filterContainer}> */}
      <Button fullWidth variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={applyFilters}>
        Apply
      </Button>
      <Button fullWidth variant="contained" color="primary" style={{ marginTop: 20 }} onClick={clearFilter}>
        Clear
      </Button>
      {/* </div> */}
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
