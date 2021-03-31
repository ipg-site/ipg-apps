import { User } from 'src/entities/user.entity';

export type AuthDTO = {
  username: string;
  password: string;
  newPassword?: string;
};

export type AuthResult = {
  userId: number;
  auth: boolean;
  isAdmin: boolean;
  changePassword?: boolean;
  user?: User;
};

export type AuthSession = {
  auth: boolean;
  userId: number;
  isAdmin: boolean;
};
