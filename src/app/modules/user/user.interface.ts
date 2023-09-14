import { Role } from '@prisma/client';

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  role: Role;
  contactNo: string;
  address: string;
  profileImg: string;
};
