import { Document } from "mongoose";

export interface InterfaceUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}

export interface InterfaceNewUser {
  name: string;
  account: string;
  password: string;
}

export interface InterfaceDecodedToken {
  id?: string;
  newUser?: InterfaceNewUser;
  iat: number;
  exp: number;
}
