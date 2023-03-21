import { GET_COMMENTS } from "./../types/commentType";
import { postAPI, getAPI } from "./../../utils/FetchData";
import { ALERT, IAlertType } from "./../types/alertType";
import { Dispatch } from "redux";
import { CREATE_COMMENT, ICommentType, IComment } from "../types/commentType";

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      const res = await postAPI(`comment`, data, token);
      console.log(res);
      dispatch({
        type: CREATE_COMMENT,
        payload: { ...res.data, user: data.user },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const getComments =
  (id: string) => async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      let limit = 8;
      const res = await getAPI(`comment/blog/${id}?limit=${limit}`);
      console.log(res);
      dispatch({
        type: GET_COMMENTS,
        payload: { data: res.data.comments, total: res.data.total },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
