import { GET_BLOGS_CATEGORY_ID, GET_BLOGS_USER_ID } from "./../types/blogType";
import { deleteAPI, getAPI, putAPI } from "./../../utils/FetchData";
import { Dispatch } from "redux";
import { imageUpload } from "../../utils/ImageUpload";
import { ALERT, IAlertType } from "../types/alertType";
import {
  GET_HOME_BLOGS,
  IBlog,
  IGetHomeBlogsType,
  IGetBlogsCategoryIdType,
  IGetBlogsUserIdType,
  IDeleteBlogUserType,
  DELETE_BLOG_USER_ID,
} from "../types/blogType";
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

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryIdType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`blog/blogs/category/${id}/${search}`);
      console.log(res);
      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserIdType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(`blog/blogs/user/${id}/${search}`);
      console.log(res);
      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const updateBlog =
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
      console.log(newBlog);
      // Call API Update Blog
      const res = await putAPI(`blog/${blog._id}`, newBlog, token);
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.message } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const deleteBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteBlogUserType>) => {
    let url;
    try {
      dispatch({
        type: DELETE_BLOG_USER_ID,
        payload: blog,
      });
      // Call API Delete Blog
      const res = await deleteAPI(`blog/${blog._id}`, token);
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.message } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
