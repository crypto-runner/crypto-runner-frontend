import { useWallet } from "@react-dapp/wallet";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { notify, dismissNotifications } from "reapop";
import {
  checkShortUrl,
  getUserApi,
  loginUser,
  resetPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signUpUser,
  updateUserProfile,
  verifyOtpCall,
} from "src/api";
import { setUser, setUserLoading } from "src/state/user/userReducer";
import {
  LoginParams,
  SendEmailVerificationParams,
  SignupParams,
  UpdatePasswordInterface,
  UpdateUserProfileParams,
  VerifyOtpParams,
} from "src/types/userTypes";

export const useGetUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { deactivate, error } = useWallet();

  React.useEffect(() => {
    if (error)
      dispatch(
        notify({
          title: "Wallet Connection Error",
          message: error,
          status: "error",
        })
      );
  }, [error]);

  const getUser = async () => {
    try {
      if (localStorage.getItem("token")) {
        dispatch(setUserLoading(true));
        let data = await getUserApi();
        console.log(data);
        dispatch(setUser(data.data.user));
        dispatch(dismissNotifications());
        dispatch(
          notify({
            title: "User Logged In",
            status: "success",
          })
        );
        dispatch(setUserLoading(false));
      }
    } catch (e: any) {
      dispatch(setUserLoading(false));
      dispatch(dismissNotifications());
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Allow-Wallet-Reconnect");
    deactivate();
    dispatch(setUser({}));
    history.push("/");
  };
  return { getUser, logout };
};

export const useLogin = () => {
  const [logging, setLogging] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async ({ email, password }: LoginParams) => {
    setLogging(true);
    try {
      dispatch(
        notify({
          title: "Logging in",
          message: "Please wait...",
          status: "loading",
        })
      );

      let data = await loginUser({ email, password });
      dispatch(dismissNotifications());
      if (!data.user.isApproved) {
        history.push(`/email-verification?email=${data.user.email}`);
        dispatch(
          notify({
            title: "User Not Verified",
            message: "Kindly check your email for verification link.",
            status: "error",
          })
        );
      } else {
        localStorage.setItem("token", data.token);
        dispatch(setUser(data.user));
        history.push("/");
      }
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
    setLogging(false);
  };

  return { logging, login };
};

export const useSignup = () => {
  const [signing, setSigning] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const signup = async ({ email, password, name, address, signature }: SignupParams) => {
    setSigning(true);
    try {
      dispatch(
        notify({
          title: "Signing up",
          message: "Please wait...",
          status: "loading",
        })
      );

      let data = await signUpUser({
        email,
        password,
        name,
        address,
        signature,
      });
      localStorage.setItem("token", data.token);
      // dispatch(setUser(data.user));
      history.push("/");

      dispatch(dismissNotifications());
      history.push(`/email-verification?email=${email}`);
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
    setSigning(false);
  };

  return { signing, signup };
};

export const useEmailVerification = () => {
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const sendEmail = async ({ email }: SendEmailVerificationParams) => {
    try {
      dispatch(
        notify({
          title: "Sending Email",
          status: "loading",
        })
      );
      let data = await sendEmailVerification({ email });
      if (data.status) {
        dispatch(dismissNotifications());
        dispatch(
          notify({
            title: "Success",
            message: data?.message,
            status: "success",
          })
        );
      }
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };

  return { sendEmail };
};

export const useOtpVerify = () => {
  const [verified, setVerified] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const verifyOtp = async ({ email, otp }: VerifyOtpParams) => {
    try {
      dispatch(
        notify({
          title: "Verifying",
          status: "loading",
        })
      );
      let data = await verifyOtpCall({ email, otp });
      console.log(data);
      localStorage.setItem("token", data.data.token);
      dispatch(setUser(data.data.user));
      history.push("/");
      dispatch(dismissNotifications());
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };

  return { verified, verifyOtp };
};

export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const updateProfile = async (updateData: UpdateUserProfileParams) => {
    try {
      dispatch(
        notify({
          title: "Updating",
          status: "loading",
        })
      );
      let data = await updateUserProfile(updateData);
      // localStorage.setItem("token", data.token);
      dispatch(setUser(data.data));
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Update Successfull",
          status: "success",
        })
      );
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };

  return { updateProfile };
};

export const useShortUrlAvailibility = () => {
  const dispatch = useDispatch();

  const checkAvailibility = async (shortUrl: string) => {
    try {
      let { status: isAvailable } = await checkShortUrl({ shortUrl });
      if (!isAvailable) {
        dispatch(
          notify({
            title: "Error",
            message: "Short Url Not Available",
            status: "error",
          })
        );
      }
      return isAvailable;
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };
  return { checkAvailibility };
};

export const usePasswordReset = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sendResetEmail = async ({ email }: { email: string }) => {
    try {
      dispatch(
        notify({
          title: "Sending Email",
          status: "loading",
        })
      );
      let data = await sendPasswordResetEmail({ email });
      if (data.status) {
        dispatch(dismissNotifications());
        dispatch(
          notify({
            title: "Success",
            message: data?.message,
            status: "success",
          })
        );
      }
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };

  const updatePassword = async ({ email, password, otp }: UpdatePasswordInterface) => {
    try {
      dispatch(
        notify({
          title: "Updating",
          status: "loading",
        })
      );
      let data = await resetPassword({ email, otp, password });
      console.log(data);
      history.push("/login");
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Password Change Successfull",
          status: "success",
        })
      );
    } catch (e: any) {
      dispatch(dismissNotifications());
      dispatch(
        notify({
          title: "Error",
          message: e?.response?.data?.message,
          status: "error",
        })
      );
    }
  };

  return { sendResetEmail, updatePassword };
};
