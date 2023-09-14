import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';
import { categoryController } from './category.controller';
const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateCategoryById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteCategoryById
);

export const categoryRoutes = router;
