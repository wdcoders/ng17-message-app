export interface IUser {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  data: IUser;
}
