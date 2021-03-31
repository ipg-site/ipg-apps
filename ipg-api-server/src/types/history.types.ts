import { FileDTO } from './file.types';
import { UserDTO } from './user.types';

export type HistoryType =
  | 'fileUpload'
  | 'userCreate'
  | 'userDelete'
  | 'userEdit'
  | 'userLogin'
  | 'userLogout'
  | 'userChangePassword'
  | 'userResetPassword';

export type HistoryDTO = {
  user: UserDTO & { file: FileDTO };
  type: HistoryType;
  value?: string;
  createdAt: Date;
};
