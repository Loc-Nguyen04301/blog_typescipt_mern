import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

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
