import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { userLoginService } from "./auth.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

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
    message: "Login",
    data: {
      accessToken: result.accessToken,
    },
  });
});

export { userLogin };
