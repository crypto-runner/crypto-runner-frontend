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
import history from "src/util/history";
import { connect } from "react-redux";
import { useGetUser } from "src/hooks/useUser";

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

interface Props {
  user: any;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const [open, setMenuOpen] = React.useState(false);
  const { logout } = useGetUser();

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
          {user?.address ? (
            <Button
              variant="contained"
              color="secondary"
              style={{ maxWidth: 300 }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{ maxWidth: 300 }}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          )}
        </Hidden>
        <Hidden mdUp>
          <div />

          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </div>
      <Drawer anchor={"right"} open={open} onClose={() => setMenuOpen(false)}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem button>
              <ListItemText primary="" />
              {user?.address ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ maxWidth: 300 }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ maxWidth: 300 }}
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
              )}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Container>
  );
};

const mapState = (store: any) => ({
  user: store.user.user,
});

export default connect(mapState)(Navbar);
