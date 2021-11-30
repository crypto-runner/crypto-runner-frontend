import React, { ChangeEvent } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { connect, useDispatch } from "react-redux";
import history from "src/util/history";
import { useLogin, useSignup } from "src/hooks/useUser";
import WalletButtonBase from "src/components/WalletButtonBase/WalletButtonBase";
import { useWalletModal, useWalletProvider } from "@react-dapp/wallet";
import { useWaleltSign } from "@react-dapp/utils";
import { notify } from "reapop";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    fontWeight: 600,
    marginBottom: 20,
  },
}));

interface Props {
  user: any;
}

const Signup: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const { signing, signup } = useSignup();
  const { setOpen: openWalletModal } = useWalletModal();
  const { account } = useWalletProvider();
  const { sign, signature, signState } = useWaleltSign();

  const [state, setState] = React.useState({
    address: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.address) {
      history.push("/");
    }
  }, [user]);

  React.useEffect(() => {
    setState({
      ...state,
      address: account ? account : "",
    });
  }, [account]);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    if (!state.address) {
      dispatch(notify({ title: "Connect Wallet", status: "error" }));
      return;
    }
    if (!signing) {
      if (state.password !== state.confirmPassword) {
        notify({
          title: "Passwords don't match",
          status: "error",
        });
      } else {
        let signature = await sign("I want to create my profile");
        if (signature) signup({ ...state, signature });
      }
    }
    return;
  };

  return (
    <div className={classes.root}>
      <Paper style={{ maxWidth: 500, padding: 20 }}>
        <form onSubmit={submit}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.heading}
          >
            Signup
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                disabled={process.env.NODE_ENV === "production"}
                name="address"
                onChange={handleChange}
                value={state.address}
                label="Address"
                type="text"
                variant="standard"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                onChange={handleChange}
                value={state.name}
                label="Name"
                type="text"
                variant="standard"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                onChange={handleChange}
                value={state.email}
                label="Email"
                type="email"
                variant="standard"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                onChange={handleChange}
                value={state.password}
                label="Password"
                type="password"
                variant="standard"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={state.password !== state.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                value={state.confirmPassword}
                label="Confirm Password"
                type="password"
                variant="standard"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <WalletButtonBase
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Signup
              </WalletButtonBase>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                OR
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={Link}
                href="/login"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

const mapState = (store: any) => ({
  user: store.user.user,
});

export default connect(mapState)(Signup);
