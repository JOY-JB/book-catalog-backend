import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { bookRoutes } from '../modules/book/book.route';
import { categoryRoutes } from '../modules/category/category.route';
import { orderRoutes } from '../modules/order/order.route';
import { profileRoutes } from '../modules/profile/profile.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/books',
    routes: bookRoutes,
  },
  {
    path: '/orders',
    routes: orderRoutes,
  },
  {
    path: '/profile',
    routes: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
