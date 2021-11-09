import React from "react";
import { makeStyles } from "@mui/styles";
import Logo from "src/assets/images/logo.png";
import {
  Button,
  Container,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Theme,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";

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
  const [open, setOpen] = React.useState(false);

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Link to="/">
          <img src={Logo} alt="crypto-runner" className={classes.img} />
        </Link>
        <Hidden mdDown>
          <div className={classes.linksContainer}>
            <NavLink
              to="/team"
              className={clsx(classes.link, "styleFont")}
              activeClassName={classes.activeLink}
            >
              Team
            </NavLink>
            <NavLink
              to="/explore"
              className={clsx(classes.link, "styleFont")}
              activeClassName={classes.activeLink}
            >
              Explore
            </NavLink>
            <NavLink
              to="/presale"
              className={clsx(classes.link, "styleFont")}
              activeClassName={classes.activeLink}
            >
              Presale
            </NavLink>
            <NavLink
              to="/farm"
              className={clsx(classes.link, "styleFont")}
              activeClassName={classes.activeLink}
            >
              NFT Farm
            </NavLink>
          </div>
          <Button
            variant="contained"
            color="secondary"
            style={{ maxWidth: 300 }}
          >
            Connect
          </Button>
        </Hidden>
        <Hidden mdUp>
          <div />

          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </div>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem button>
              <ListItemText primary="asfjhkj" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Container>
  );
};

export default Navbar;
