import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import {
  changePasswordService,
  forgetPasswordService,
  resetPasswordService,
  userLoginService,
  verifyOTPService,
} from "./auth.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await userLoginService(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged!",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const result = await changePasswordService(req.user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Change Password Successfully!",
      data: result,
    });
  }
);

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await forgetPasswordService(req.body.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Forget Successfully!",
    data: result,
  });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { token, ...result } = await verifyOTPService(
    req.body.email,
    req.body.otp
  );

  res.cookie("resettoken", token, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OTP Verified Successfully!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { resettoken } = req.cookies;
  const { password, confirmPassword } = req.body;
  const result = await resetPasswordService(
    resettoken,
    password,
    confirmPassword
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Reset Successfully! Able to Login Now!",
    data: result,
  });
});

export { userLogin, changePassword, forgetPassword, verifyOTP, resetPassword };
