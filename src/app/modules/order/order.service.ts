import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderBook } from './order.interface';

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
      orderedBooks: true,
    },
  });

  return result;
};

export const orderService = {
  createOrder,
};
