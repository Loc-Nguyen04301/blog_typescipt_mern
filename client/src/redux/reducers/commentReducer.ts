import {
  CREATE_COMMENT,
  GET_COMMENTS,
  ICommentType,
  ICreateComment,
  ICommentState,
} from "../types/commentType";

const commentReducer = (
  state: ICommentState = { data: [], total: 1 },
  action: ICommentType
): ICommentState => {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, data: [...state.data, action.payload] };
    case GET_COMMENTS:
      return action.payload;
    default:
      return state;
  }
};

export default commentReducer;
