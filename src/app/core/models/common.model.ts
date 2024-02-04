import { IUser } from './auth.model';

export interface IApiResponse<T> {
  message: string;
  data: T;
}

export interface IMessage {
  _id?: string;
  to: IUser;
  subject: string;
  body: string;
  sender: IUser;
  status?: number;
  createdAt?: string;
}
