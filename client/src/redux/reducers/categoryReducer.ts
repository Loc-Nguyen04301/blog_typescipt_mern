import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ICategory,
  ICategoryType,
} from "../types/categoryType";

const categoryReducer = (state: ICategory[] = [], action: ICategoryType) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return [...state, action.payload];
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      return state.map((item) => {
        if (item._id === action.payload._id) return action.payload;
        else return item;
      });
    case DELETE_CATEGORY:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default categoryReducer;
