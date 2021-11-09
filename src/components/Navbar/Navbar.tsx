import React from "react";
import { makeStyles } from "@mui/styles";
import Logo from "src/assets/images/logo.png";
import { Button, Container, Theme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content",
    alignItems: "center",
    height: 90,
  },
  img: {
    height: 90,
  },
  linksContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));

interface Props {}

const Navbar: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Link to="/">
          <img src={Logo} alt="crypto-runner" className={classes.img} />
        </Link>
        <div className={classes.linksContainer}>
          <NavLink
            to="/team"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Team
          </NavLink>
          <NavLink
            to="/explore"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Explore
          </NavLink>
          <NavLink
            to="/presale"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            Presale
          </NavLink>
          <NavLink
            to="/farm"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            NFT Farm
          </NavLink>
        </div>
        <Button variant="contained" color="secondary">
          Connect
        </Button>
      </div>
    </Container>
  );
};

export default Navbar;
