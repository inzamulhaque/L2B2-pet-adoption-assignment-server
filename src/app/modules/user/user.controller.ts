import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { createNewUserService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const result = await createNewUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully!",
    success: true,
    data: result,
  });
});
