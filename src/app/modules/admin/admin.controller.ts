import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { getUserByIdService } from "./admin.services";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getUserByIdService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieve User Successfully!",
    success: true,
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {});

export { getUserById, getAllUser };
