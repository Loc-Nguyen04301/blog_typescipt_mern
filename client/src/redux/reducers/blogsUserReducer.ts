import {
  GET_BLOGS_USER_ID,
  IBlogsUser,
  IGetBlogsUserIdType,
} from "../types/blogType";

const blogsUserReducer = (
  state: IBlogsUser[] = [],
  action: IGetBlogsUserIdType
): IBlogsUser[] => {
  switch (action.type) {
    case GET_BLOGS_USER_ID:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default blogsUserReducer;
