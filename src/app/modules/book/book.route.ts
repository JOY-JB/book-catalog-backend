import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';
import { bookController } from './book.controller';
const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  bookController.createBook
);

router.get('/', bookController.getAllBooks);

export const bookRoutes = router;
