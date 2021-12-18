import { apiCall, relayerApi } from "src/config/apiConfig";
import {
  LoginParams,
  SendEmailVerificationParams,
  SignupParams,
  UpdatePasswordInterface,
  UpdateUserProfileParams,
  VerifyOtpParams,
} from "src/types/userTypes";

export const loginUser = async ({ email, password }: LoginParams) => {
  let res = await apiCall.post("users/login", { email, password });
  return res.data;
};

export const signUpUser = async ({
  address,
  name,
  email,
  password,
  signature,
}: SignupParams) => {
  let res = await apiCall.post("users", {
    address,
    name,
    email,
    password,
    signature,
  });
  return res.data;
};

export const sendEmailVerification = async ({
  email,
}: SendEmailVerificationParams) => {
  let res = await apiCall.get(`users/approve-account/${email}`);
  return res.data;
};

export const verifyOtpCall = async ({ email, otp }: VerifyOtpParams) => {
  let res = await apiCall.post(`users/approve-account`, {
    email,
    otp,
  });
  return res.data;
};

export const updateUserProfile = async (data: UpdateUserProfileParams) => {
  let res = await apiCall.put(`users`, data);
  return res.data;
};

export const getUserApi = async () => {
  let res = await apiCall.get(`users`);
  return res.data;
};

export const checkShortUrl = async ({ shortUrl }: { shortUrl: string }) => {
  let res = await apiCall.get(`users/check-valid-url/${shortUrl}`);
  return res.data;
};

export const sendPasswordResetEmail = async ({ email }: { email: string }) => {
  let res = await apiCall.post(`users/reset-password`, { email });
  return res.data;
};

export const resetPassword = async ({
  email,
  otp,
  password,
}: UpdatePasswordInterface) => {
  let res = await apiCall.put(`users/reset-password`, { email, otp, password });
  return res.data;
};

export const deleteOrder = async (asset: string, assetId: string) => {
  const rawResponse = await relayerApi.delete(
    `orders/${asset}/${assetId}`,
  )
  const response = rawResponse.data
  return {
    message: response.message,
    status: response.status,
  }
}