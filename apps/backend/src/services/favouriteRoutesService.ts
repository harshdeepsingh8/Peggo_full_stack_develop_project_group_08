import { prisma } from '../prisma';

export const favouriteRoutesService = {
  async getAll() {
    return await prisma.favouriteRoute.findMany();
  },

  async getById(id: number) {
    return await prisma.favouriteRoute.findUnique({
      where: { id }
    });
  },

  async create(routeName: string) {
    return await prisma.favouriteRoute.create({
      data: { routeName }
    });
  },

  async update(id: number, routeName: string) {
    return await prisma.favouriteRoute.update({
      where: { id },
      data: { routeName }
    });
  },

  async delete(id: number) {
    return await prisma.favouriteRoute.delete({
      where: { id }
    });
  }
};