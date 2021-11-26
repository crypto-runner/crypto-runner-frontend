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
import { useLogin } from "src/hooks/useUser";

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

const Login: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  let { login, logging } = useLogin();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.address) {
      history.push("/");
    }
  }, [user]);

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    login({ ...state });
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
            Login
          </Typography>
          <Grid container spacing={3}>
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
              <Typography
                color="secondary"
                component={Link}
                href="/forgot-password"
              >
                Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                OR
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={Link}
                href="/signup"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
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

export default connect(mapState)(Login);
