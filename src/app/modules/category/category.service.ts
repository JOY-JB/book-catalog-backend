// import { Category } from '@prisma/client';
// import prisma from '../../../shared/prisma';

import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const categoryInfo = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  if (!categoryInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  return categoryInfo;
};

const updateCategoryById = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const categoryData = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!categoryData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategoryById = async (id: string): Promise<Category | null> => {
  const categoryData = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!categoryData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
