export type IUserData = {
  userId: string;
  role: 'admin' | 'customer';
};

export type IOrderBook = {
  bookId: string;
  quantity: number;
};
