import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { bookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getAllBooks(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',
    data: result,
  });
});

export const bookController = {
  createBook,
  getAllBooks,
};
