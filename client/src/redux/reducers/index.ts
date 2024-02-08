import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import categoryReducer from "./categoryReducer";
import homeBlogsReducer from "./homeBlogsReducer";
import blogsCategoryReducer from "./blogsCategoryReducer";
import otherInfoReducer from "./otherInfoReducer ";
import blogsUserReducer from "./blogsUserReducer";
import commentReducer from "./commentReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  category: categoryReducer,
  homeBlogs: homeBlogsReducer,
  blogsCategory: blogsCategoryReducer,
  otherInfo: otherInfoReducer,
  blogsUser: blogsUserReducer,
  comment: commentReducer,
  socket: socketReducer,
});
