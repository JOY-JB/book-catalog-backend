import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUserResponse } from '../user/user.interface';

const getProfile = async (id: string): Promise<IUserResponse> => {
  const userData = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      password: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not found');
  }

  return userData;
};

export const profileService = {
  getProfile,
};
