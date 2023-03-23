import {
  GET_COMMENTS,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  DELETE_REPLY,
  DELETE_COMMENT,
} from "./../types/commentType";
import { postAPI, getAPI, patchAPI, deleteAPI } from "./../../utils/FetchData";
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
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      let limit = 4;
      const res = await getAPI(
        `comment/blog/${id}?page=${num}&&limit=${limit}`
      );
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

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      const res = await postAPI("comment/reply_comment", data, token);
      console.log(res);

      dispatch({
        type: REPLY_COMMENT,
        payload: {
          ...res.data,
          user: data.user,
          reply_user: data.reply_user,
        },
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      const res = await patchAPI(
        `comment/${data._id}`,
        { content: data.content },
        token
      );
      console.log(res);
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICommentType>) => {
    try {
      const res = await deleteAPI(`comment/${data._id}`, token);
      console.log(res);
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ALERT,
        payload: { errors: error.response.data.message },
      });
    }
  };
