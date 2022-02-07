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
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import history from "src/util/history";
import { connect, useDispatch } from "react-redux";
import { useGetUser } from "src/hooks/useUser";
import { useWalletModal, useWalletProvider } from "@react-dapp/wallet";
import { notify } from "reapop";
import { useEthers } from "@react-dapp/utils";
import WalletButtonBase from "../WalletButtonBase/WalletButtonBase";

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
  const { account } = useWalletProvider();
  const { displayAccount } = useEthers();
  const dispatch = useDispatch();

  const accountNumClick = () => {
    dispatch(
      notify({
        title: "Account",
        buttons: [
          // { name: "Profile", onClick: () => history.push("/profile") },
          { name: "Disconnect", onClick: logout },
        ],
      })
    );
  };

  const drawerClose = () => {
    setMenuOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Link to="/">
          <img src={Logo} alt="crypto-runner" className={classes.img} />
        </Link>
        <Hidden mdDown>
          <div className={classes.linksContainer}>
            <NavLink to="/my-runners" className={clsx(classes.link, "styleFont")} activeClassName={classes.activeLink}>
              My runners
            </NavLink>
            <NavLink to="/explore" className={clsx(classes.link, "styleFont")} activeClassName={classes.activeLink}>
              Explore
            </NavLink>
            <NavLink to="/presale" className={clsx(classes.link, "styleFont")} activeClassName={classes.activeLink}>
              Presale
            </NavLink>
            <NavLink
              to="/treasure-chest"
              className={clsx(classes.link, "styleFont")}
              activeClassName={classes.activeLink}
            >
              Treasure Chest
            </NavLink>
          </div>
          {displayAccount ? (
            <Typography color="textSecondary" onClick={accountNumClick}>
              {displayAccount}
            </Typography>
          ) : (
            <WalletButtonBase
              variant="contained"
              color="secondary"
              style={{ maxWidth: 300 }}
              // onClick={() => history.push("/login")}
            >
              {/* Connect */}
            </WalletButtonBase>
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
              <ListItemText primary={displayAccount} onClick={accountNumClick} />
              {displayAccount ? (
                <Typography onClick={accountNumClick}>{/* {displayAccount} */}</Typography>
              ) : (
                <div onClick={drawerClose}>
                  <WalletButtonBase variant="contained" color="secondary" style={{ maxWidth: 300 }}>
                    {/* Connect */}
                  </WalletButtonBase>
                </div>
              )}
            </ListItem>
            <ListItem>
              <NavLink
                to="/my-runners"
                style={{ color: "black" }}
                className={clsx(classes.link, "styleFont")}
                activeClassName={classes.activeLink}
                onClick={drawerClose}
              >
                My runners
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to="/treasure-chest"
                style={{ color: "black" }}
                className={clsx(classes.link, "styleFont")}
                activeClassName={classes.activeLink}
                onClick={drawerClose}
              >
                Treasure Chest
              </NavLink>
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
