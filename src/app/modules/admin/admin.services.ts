import prisma from "../../../utils/prisma";

const getUserByIdService = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { password, ...others } = result;

  return others;
};

export { getUserByIdService };
