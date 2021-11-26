import React from "react";

import { useLocation } from "react-router";
import { usePasswordReset } from "src/hooks/useUser";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Button, Card, TextField, Theme, Typography } from "@mui/material";

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

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { updatePassword } = usePasswordReset();

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    let email = params.get("email") || "";
    let otp = params.get("otp") || "";
    updatePassword({ email, otp, password });
  };

  return (
    <div className={clsx(classes.root, "center")}>
      <Card className={classes.card}>
        <Typography variant="h5" className="bold">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Password"
            placeholder="Password"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
