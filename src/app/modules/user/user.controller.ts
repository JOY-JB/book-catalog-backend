// import { Request, Response } from 'express';
// import httpStatus from 'http-status';
// import catchAsync from '../../../shared/catchAsync';
// import sendResponse from '../../../shared/sendResponse';
// import { userService } from './user.service';

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

// const deleteUserById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await userService.deleteUserById(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User deleted successfully',
//     data: result,
//   });
// });

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.getUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await userService.updateUserById(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.deleteUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const userController = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
