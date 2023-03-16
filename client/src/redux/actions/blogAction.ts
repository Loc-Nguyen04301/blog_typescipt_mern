import { getAPI } from "./../../utils/FetchData";
import { Dispatch } from "redux";
import { IBlog } from "../types/blogType";
import { imageUpload } from "../../utils/ImageUpload";
import { ALERT, IAlertType } from "../types/alertType";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";
import { postAPI } from "../../utils/FetchData";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };
      // Call API create Blog
      const res = postAPI("blog", newBlog, token);
      console.log(res);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      // Call API get Blogs
      const res = await getAPI("blog/home/blogs");
      console.log(res);
      dispatch({ type: GET_HOME_BLOGS, payload: res.data });
      
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
