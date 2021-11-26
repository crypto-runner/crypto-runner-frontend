import React from "react";

import clsx from "clsx";
import { usePasswordReset } from "src/hooks/useUser";
import { Button, Card, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.secondary.main,
    paddingTop: 30,
    paddingBottom: 30,
  },
  card: {
    padding: 30,
  },
  btn: {
    marginTop: 10,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const { sendResetEmail } = usePasswordReset();
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendResetEmail({ email });
  };

  return (
    <div className={clsx(classes.root, "center")}>
      <Card className={classes.card}>
        <Typography variant="h5" className="bold">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Email"
            placeholder="Email"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: 10 }}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            className={classes.btn}
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
