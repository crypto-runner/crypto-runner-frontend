import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/orangebg.jpg";
import CheckIcon from "@mui/icons-material/Check";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    backgroundSize: "cover",
    paddingTop: 50,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 360,
  },
  line: {
    margin: "auto",
    height: "calc(100% - 30px)",
    width: 5,
    background: "white",
  },
  roadmapPoint: {
    display: "flex",
    alignItems: "center",
  },
  checkIcon: {
    marginRight: 10,
  },
}));

interface Props {}

const allRoadmaps: RoadmapPointProps[] = [
  {
    title: "Q1 2021",
    points: ["Q1 2021", "Core Team Gathering", "Research", "Brainstorming"],
  },
  {
    title: "Q2 2021",
    points: [
      "Paper Writing",
      "Gameplay Design",
      "Game Architectural",
      "Website design",
    ],
  },
  {
    title: "Q3 2021",
    points: [
      "Paper Writing",
      "Gameplay Design",
      "Game Architectural",
      "Website design",
    ],
  },
  {
    title: "Q4 2021",
    points: [
      "Paper Writing",
      "Gameplay Design",
      "Game Architectural",
      "Website design",
    ],
  },
];

const Roadmap: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textSecondary" align="center">
        <b>Roadmap</b>
      </Typography>
      <Grid container style={{ paddingLeft: 20 , marginTop:50}}>
        {allRoadmaps.map((roadmap) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={uuid()}>
            <RoadmapPoint {...roadmap} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Roadmap;

const RoadmapPoint: React.FC<RoadmapPointProps> = ({ title, points }) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </div>
      <div>
        <Typography
          color="textSecondary"
          variant="h5"
          style={{ marginBottom: 20,marginTop:5 }}
        >
          {title}
        </Typography>
        {points.map((item) => (
          <Typography
            key={uuid()}
            color="textSecondary"
            className={classes.roadmapPoint}
          >
            <CheckIcon className={classes.checkIcon} /> {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

interface RoadmapPointProps {
  title: string;
  points: string[];
}
