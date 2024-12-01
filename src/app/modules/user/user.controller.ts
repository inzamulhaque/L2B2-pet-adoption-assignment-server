import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import {
  createNewAdminServices,
  createNewUserService,
  getMyProfileService,
} from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createNewAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await createNewAdminServices(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Admin Created Successfully!",
    success: true,
    data: result,
  });
});

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const result = await createNewUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully!",
    success: true,
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const result = await getMyProfileService(req.user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: "Get My Profile Successfully!",
      success: true,
      data: result,
    });
  }
);

export { createNewAdmin, createNewUser, getMyProfile };
