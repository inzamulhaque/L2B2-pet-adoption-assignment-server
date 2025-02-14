import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = error.message || "Something went wrong!";
  let err = error;

  res.status(statusCode).json({
    success,
    message,
    error: err,
  });
};

export default globalErrorHandler;
