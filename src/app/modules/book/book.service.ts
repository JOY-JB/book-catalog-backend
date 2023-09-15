import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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

const getAllBooks = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);

  const result = await prisma.book.findMany({
    skip,
    take,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { title: 'desc' },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          genre: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });

  return result;
};

export const bookService = {
  createBook,
  getAllBooks,
};
