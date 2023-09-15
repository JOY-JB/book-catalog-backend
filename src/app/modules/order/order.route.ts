import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';
import { orderController } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  orderController.createOrder
);

export const orderRoutes = router;
