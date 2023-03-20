import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  confirmPassword: string;
}

export interface IUser extends IUserLogin {
  _id: string;
  name: string;
  avatar: string;
  role: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProfile extends IUserRegister {
  avatar: string | File;
}

export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM?: IComment[];
  reply_user?: string;
  createdAt: string;
}
