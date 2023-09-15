import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constant';
import { IBooksFilterRequest } from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      title: data.title,
      author: data.author,
      genre: data.genre,
      price: data.price,
      publicationDate: data.publicationDate,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exist!');
  }

  const createdBook = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return createdBook;
};

const getAllBooks = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'minPrice' || key === 'maxPrice') {
          const operator = key === 'minPrice' ? 'gte' : 'lte';
          return {
            price: {
              [operator]: parseFloat((filterData as any)[key]),
            },
          };
        } else if (key === 'category') {
          return {
            categoryId: filterData[key],
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    skip,
    take: size,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    skip,
    take: size,
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

export const bookService = {
  createBook,
  getAllBooks,
  getBooksByCategory,
};
