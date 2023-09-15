import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { orderedBooks } = req.body;

  const result = await orderService.createOrder(userId, orderedBooks);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
};
