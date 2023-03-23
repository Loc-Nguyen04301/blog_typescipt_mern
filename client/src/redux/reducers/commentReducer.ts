import { UPDATE_COMMENT, UPDATE_REPLY } from "./../types/commentType";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  REPLY_COMMENT,
  ICommentType,
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
    case REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? { ...item, replyCM: [...(item.replyCM as []), action.payload] }
            : item
        ),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case UPDATE_REPLY:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.comment_root
            ? {
                ...item,
                replyCM: item.replyCM?.map((rp) =>
                  rp._id === action.payload._id ? action.payload : rp
                ),
              }
            : item
        ),
      };
    default:
      return state;
  }
};

export default commentReducer;
