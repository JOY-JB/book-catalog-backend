// import { User } from '@prisma/client';
// import prisma from '../../../shared/prisma';

import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUserResponse } from './user.interface';

const getAllUser = async (): Promise<IUserResponse[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const getUserById = async (id: string): Promise<User | null> => {
  const userData = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return userData;
};

const updateUserById = async (
  id: string,
  payload: Partial<User>
): Promise<IUserResponse> => {
  const userData = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedData = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return updatedData;
};

const deleteUserById = async (id: string): Promise<User> => {
  const userData = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const deletedData = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deletedData;
};

export const userService = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
