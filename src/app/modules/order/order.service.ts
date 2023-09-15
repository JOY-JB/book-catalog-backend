import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

const getAllOrders = async (user: IUserData): Promise<Order[]> => {
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

const getOrderById = async (id: string, user: IUserData) => {
  let result: Order[] = [];

  if (user.role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId: user.userId,
        id,
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
  } else {
    result = await prisma.order.findMany({
      where: {
        id,
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
  }

  if (result.length == 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order not found');
  }

  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
};
