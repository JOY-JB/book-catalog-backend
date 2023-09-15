import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { profileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };

  const result = await profileService.getProfile(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved Successfully!',
    data: result,
  });
});

export const profileController = {
  getProfile,
};
