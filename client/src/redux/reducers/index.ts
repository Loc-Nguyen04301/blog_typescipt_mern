import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import categoryReducer from "./categoryReducer";
import homeBlogsReducer from "./homeBlogsReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  category: categoryReducer,
  homeBlogs: homeBlogsReducer,
});
