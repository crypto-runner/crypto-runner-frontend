import { Button, Card, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation } from "react-router";
import { useEmailVerification } from "src/hooks/useUser";
import { useOtpVerify } from "src/hooks/useUser";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 30,
  },
}));

const EmailVerification = () => {
  const classes = useStyles();
  const bc = new BroadcastChannel("crypto-runner");
  const location = useLocation();
  const { sendEmail } = useEmailVerification();
  const { verifyOtp } = useOtpVerify();
  console.log(location);
  //get params from url
  const params = new URLSearchParams(location.search);
  const handleMessage = (event: { data: { email: string; otp: string } }) => {
    bc.postMessage(event.data);
    console.log(event.data);
    verifyOtp(event.data);
  };

  React.useEffect(() => {
    bc.addEventListener("message", handleMessage);
    return () => bc.removeEventListener("message", handleMessage);
  }, []);

  const sendMessage = () => {
    // bc.postMessage("Hello");
    // window.close();
  };

  const handleClick = () => {
    let email = params.get("email");
    sendEmail({ email: email || "" });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Send Verification Email
        </Button>
      </Card>
    </div>
  );
};

export default EmailVerification;
