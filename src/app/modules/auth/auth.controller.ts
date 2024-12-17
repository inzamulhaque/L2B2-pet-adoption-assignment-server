import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import {
  changePasswordService,
  forgetPasswordService,
  userLoginService,
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

export { userLogin, changePassword, forgetPassword };
