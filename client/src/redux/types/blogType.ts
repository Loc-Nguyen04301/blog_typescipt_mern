import { IUser } from "../../utils/TypeScript";
export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  createdAt: string;
}

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID";
export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID";
export const DELETE_BLOG_USER_ID = "DELETE_BLOG_USER_ID";

export interface IHomeBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}

export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS;
  payload: IHomeBlogs[];
}

export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogsCategoryIdType {
  type: typeof GET_BLOGS_CATEGORY_ID;
  payload: IBlogsCategory;
}

export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogsUserIdType {
  type: typeof GET_BLOGS_USER_ID;
  payload: IBlogsUser;
}

export interface IDeleteBlogUserType {
  type: typeof DELETE_BLOG_USER_ID;
  payload: IBlog;
}
