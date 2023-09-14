import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: result.accessToken,
  });
});

export const authController = {
  createUser,
  loginUser,
};
