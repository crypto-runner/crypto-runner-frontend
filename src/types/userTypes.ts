export interface LoginParams {
  email: string;
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
  address: string;
  signature: string;
}

export interface SendEmailVerificationParams {
  email: string;
}

export interface VerifyOtpParams {
  email: string;
  otp: string;
}

export interface UpdateUserProfileParams {
  [key: string]: any;
}

export interface UpdatePasswordInterface {
  email: string;
  otp: string;
  password: string;
}
