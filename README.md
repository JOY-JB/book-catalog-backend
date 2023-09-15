# Book Catalog API

This is the backend API for the Book Catalog application. It provides various endpoints for user management, category management, book management, and order management.

#### Live Link: [https://book-catalog-prisma-postgres-beta.vercel.app](https://book-catalog-prisma-postgres-beta.vercel.app)

## Application Routes

### User

- **Sign Up**: `/api/v1/auth/signup (POST)`
- **Sign In**: `/api/v1/auth/signin (POST)`
- **Get All Users**: `/api/v1/users (GET)`
- **Get Single User**: `/api/v1/users/34427a30-a31f-4dff-af5b-8df3469000ca (GET)`
- **Update User**: `/api/v1/users/34427a30-a31f-4dff-af5b-8df3469000ca (PATCH)`
- **Delete User**: `/api/v1/users/34427a30-a31f-4dff-af5b-8df3469000ca (DELETE)`
- **Get User Profile**: `/api/v1/profile (GET)`

### Category

- **Create Category**: `/api/v1/categories/create-category (POST)`
- **Get All Categories**: `/api/v1/categories (GET)`
- **Get Single Category**: `/api/v1/categories/0575f8a7-9cdc-4bc0-9e8e-a9a9b5c97009 (GET)`
- **Update Category**: `/api/v1/categories/0575f8a7-9cdc-4bc0-9e8e-a9a9b5c97009 (PATCH)`
- **Delete Category**: `/api/v1/categories/0575f8a7-9cdc-4bc0-9e8e-a9a9b5c97009 (DELETE)`

### Books

- **Create Book**: `/api/v1/books/create-book (POST)`
- **Get All Books**: `/api/v1/books (GET)`
- **Get Books by Category**: `/api/v1/books/:categoryId/category (GET)`
- **Get Single Book**: `/api/v1/books/:id (GET)`
- **Update Book**: `/api/v1/books/:id (PATCH)`
- **Delete Book**: `/api/v1/books/:id (DELETE)`

### Orders

- **Create Order**: `/api/v1/orders/create-order (POST)`
- **Get All Orders**: `/api/v1/orders (GET)`
- **Get Single Order**: `/api/v1/orders/:orderId (GET)`
