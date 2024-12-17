import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import { IChangePassword, ILoginInput } from "./auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../../utils/jwt";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

const userLoginService = async (payload: ILoginInput) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePasswordService = async (
  tokenData: JwtPayload,
  payload: IChangePassword
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: tokenData?.email as string,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  if (payload.newPassword !== payload.confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New Password & Confirm Password Are Not Match!"
    );
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  const { password, ...others } = result;
  return others;
};

const forgetPasswordService = async (email: string) => {
  console.log(email);
};

export { userLoginService, changePasswordService, forgetPasswordService };
