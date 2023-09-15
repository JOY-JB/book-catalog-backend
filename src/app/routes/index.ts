import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { bookRoutes } from '../modules/book/book.route';
import { categoryRoutes } from '../modules/category/category.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
