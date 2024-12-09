import prisma from "../../../utils/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { IAdminFilterRequest } from "./admin.interdace";

const getUserService = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {};

const getUserByIdService = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { password, ...others } = result;

  return others;
};

export { getUserService, getUserByIdService };
