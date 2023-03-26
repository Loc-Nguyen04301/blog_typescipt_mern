import { deleteAPI, getAPI, postAPI, patchAPI } from "./../../utils/FetchData";
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ICategory,
  ICategoryType,
} from "./../types/categoryType";
import { ALERT, IAlertType } from "./../types/alertType";
import { Dispatch } from "redux";

export const createCategory =
  (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("category", { name }, token);
      console.log(res);
      dispatch({ type: CREATE_CATEGORY, payload: res.data.newCategory });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const getCategories =
  () => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      const res = await getAPI("category");
      console.log(res);
      dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const updateCategory =
  (edit: ICategory, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const { name, _id, createdAt } = edit;
      let { updateAt } = edit;
      const res = await patchAPI(`category/${edit._id}`, { name }, token);
      console.log(res);
      dispatch({
        type: "UPDATE_CATEGORY",
        payload: { name, _id, createdAt, updateAt },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const deleteCategory =
  (id: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      const res = await deleteAPI(`category/${id}`, token);
      console.log(res);
      dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
