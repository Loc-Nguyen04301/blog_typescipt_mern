import React from "react";
import { IComment } from "../../redux/types/commentType";
import AvatarComment from "./AvatarComment";
import CommentList from "./CommentList";

import "../../styles/comment.css";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="my-3 d-flex">
      <AvatarComment user={comment.user} />
      <CommentList comment={comment} />
    </div>
  );
};

export default Comments;
