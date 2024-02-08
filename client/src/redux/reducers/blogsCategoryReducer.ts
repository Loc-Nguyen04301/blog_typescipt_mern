import {
  GET_BLOGS_CATEGORY_ID,
  IBlogsCategory,
  IGetBlogsCategoryIdType,
} from "./../types/blogType";

const blogsCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryIdType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_CATEGORY_ID:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default blogsCategoryReducer;
