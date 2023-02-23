import { ChangeEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;

export interface InterfaceParams {
  page: string;
  slug: string;
}
