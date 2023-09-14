import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getUserById);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.updateUserById);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  userController.deleteUserById
);

export const userRoutes = router;
