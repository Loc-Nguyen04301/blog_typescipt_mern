import { IUser } from "../../utils/TypeScript";

export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM?: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}

export interface ICommentState {
  data: IComment[];
  total: number;
}

export const CREATE_COMMENT = "CREATE_COMMENT";

export interface ICreateComment {
  type: typeof CREATE_COMMENT;
  payload: IComment;
}

export const GET_COMMENTS = "GET_COMMENTS";

export interface IGetComments {
  type: typeof GET_COMMENTS;
  payload: ICommentState;
}

export const REPLY_COMMENT = "REPLY_COMMENT";
export interface IReplyComment {
  type: typeof REPLY_COMMENT;
  payload: IComment;
}

export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_REPLY = "UPDATE_REPLY";
export interface IUpdateComment {
  type: typeof UPDATE_COMMENT | typeof UPDATE_REPLY;
  payload: IComment;
}

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_REPLY = "DELETE_REPLY";
export interface IDeleteComment {
  type: typeof DELETE_COMMENT | typeof DELETE_REPLY;
  payload: IComment;
}

export type ICommentType =
  | ICreateComment
  | IGetComments
  | IReplyComment
  | IUpdateComment
  | IDeleteComment;
