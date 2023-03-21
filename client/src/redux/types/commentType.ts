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

export type ICommentType = ICreateComment | IGetComments;
