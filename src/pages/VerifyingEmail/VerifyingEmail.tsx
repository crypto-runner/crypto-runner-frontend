import React from "react";
import { useHistory, useLocation } from "react-router";
import history from "src/util/history";
import { useOtpVerify } from "src/hooks/useUser";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { VerifyOtpParams } from "src/types/userTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const VerifyingEmail : React.FC = () => {
  const classes = useStyles();
  const bc = new BroadcastChannel("crypto-runner");
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const otp = params.get("otp");
  const email = params.get("email");
  const { verifyOtp } = useOtpVerify();

  const handleMessageReceived = (event: {
    data: { email: string; otp: string };
  }) => {
    let data = event.data;

    if (email === data.email && otp === data.otp) {
      window.close();
    }
  };

  React.useEffect(() => {
    bc.addEventListener("message", handleMessageReceived);
    return () => bc.removeEventListener("message", handleMessageReceived);
  }, []);

  const sendMessage = () => {
    if (email && otp) {
      bc.postMessage({ email, otp });
    }
    setTimeout(() => {
      verifyOtp({ email: email || "", otp: otp || "" });
    }, 3000);
  };

  React.useEffect(() => {
    sendMessage();
  }, []);

  return <div className={classes.root}></div>;
};

export default VerifyingEmail;
