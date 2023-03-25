import {
  GET_BLOGS_USER_ID,
  DELETE_BLOG_USER_ID,
  IBlogsUser,
  IBlog,
  IGetBlogsUserIdType,
  IDeleteBlogUserType,
} from "../types/blogType";

import { IUser } from "../../utils/TypeScript";

const blogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IGetBlogsUserIdType | IDeleteBlogUserType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      return [...state, action.payload];
    case DELETE_BLOG_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: item.blogs.filter(
                (blog) => blog._id !== action.payload._id
              ),
            }
          : item
      );
    default:
      return state;
  }
};

export default blogsUserReducer;
