import type { IAdmin, IPost, IUser } from '@models';
import type { Request } from 'express';

export interface RequestWithUser extends Request {
  user: IUser;
  token: string;
  file: any;
  files: any;
}

export interface RequestWithPostAndUser extends RequestWithUser {
  post: IPost;
}

export interface RequestWithAdmin extends Request {
  admin: IAdmin;
  token: string;
}

export enum MetaActionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
