import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderBook, IUserData } from './order.interface';

const createOrder = async (
  userId: string,
  orderedBooks: IOrderBook[]
): Promise<Order | null> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        create: orderedBooks,
      },
    },
    include: {
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });

  return result;
};

const getAllOrders = async (user: IUserData): Promise<Order[] | null> => {
  let result: Order[] = [];

  if (user.role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });
  } else {
    result = await prisma.order.findMany({});
  }

  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
};
