import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Theme, Typography } from "@mui/material";
import T1 from "src/assets/images/t1.png";
import T2 from "src/assets/images/t2.png";
import T3 from "src/assets/images/t3.png";
import T4 from "src/assets/images/t4.png";
import T5 from "src/assets/images/t5.png";
import T6 from "src/assets/images/t6.png";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 50,
  },
}));

interface Props {}

const data: TeamMemberProps[] = [
  {
    img: T1,
    title: "CR ANTON",
    text: "LEAD DEV",
  },
  {
    img: T2,
    title: "CR GARY",
    text: "BLOCKCHAIN ENGINEER",
  },
  {
    img: T3,
    title: "CR DANTE",
    text: "BLOCKCHAIN DEVELOPER",
  },
  {
    img: T4,
    title: "CR JOSE",
    text: "GAME DEVELOPER",
  },
  {
    img: T5,
    title: "CR JEFF",
    text: "GAME DEVELOPER",
  },
  {
    img: T6,
    title: "CR COLE",
    text: "GAME DEVELOPER",
  },
];

const Team: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          className="styleFont"
          variant="h3"
          align="center"
          color="textSecondary"
        >
          <b>Team</b>
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ marginTop: 30 }}
          justifyContent="center"
          justifyItems="center"
          justifySelf="center"
        >
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={uuid()}>
              <TeamMember {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Team;

interface TeamMemberProps {
  title: string;
  img: any;
  text: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ title, img, text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
      <img alt="" src={img} />
      <div>
        <Typography variant="h4" className="styleFont" color="textSecondary">
          <b>{title}</b>
        </Typography>
        <Typography className="styleFont" color="textSecondary">
          {text}
        </Typography>
      </div>
    </div>
  );
};
