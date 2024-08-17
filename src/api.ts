import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient();

export const api = {
  list: async (): Promise<User[]> => {
    const users = await prisma.user.findMany();

    return users;
  },
  addScore: async (userId: number, score: number): Promise<void> => {
    await prisma.user.update({
      where: {id: userId},
      data: {
        score: score,
      },
    });
  },
};