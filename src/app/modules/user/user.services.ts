import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import prisma from "../../../utils/prisma";
import { UserRole, UserStatus } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const createNewAdminServices = async (payload: IUser) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  const { password, ...others } = result;

  return others;
};

const createNewUserService = async (payload: IUser) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  const { password, ...others } = result;

  return others;
};

const getMyProfileService = async (payload: { email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const { password, ...others } = user;

  return others;
};

const updateMyProfileService = async (
  tokenData: JwtPayload,
  payload: Partial<IUser>
) => {
  delete payload.password;

  const result = await prisma.user.update({
    where: {
      email: tokenData?.email as string,
    },

    data: {
      ...payload,
    },
  });

  return result;
};

const deleteUserService = async (id: string) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: UserStatus.DELETED,
    },
  });

  return result;
};

export {
  createNewAdminServices,
  createNewUserService,
  getMyProfileService,
  updateMyProfileService,
  deleteUserService,
};
