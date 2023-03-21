import React, { useState } from "react";
import { IComment } from "../../redux/types/commentType";
import AvatarComment from "./AvatarComment";
import CommentList from "./CommentList";
import AvatarReply from "./AvatarReply";

import "../../styles/comment.css";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  const [listReply, setListReply] = useState<IComment[]>([]);

  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      <AvatarComment user={comment.user} />
      <CommentList
        comment={comment}
        listReply={listReply}
        setListReply={setListReply}
      >
        {listReply.map((comment, index) => (
          <div
            key={index}
            style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? "initial" : "none",
            }}
          >
            <AvatarReply user={comment.user} reply_user={comment.reply_user} />
            <CommentList
              comment={comment}
              listReply={listReply}
              setListReply={setListReply}
            />
          </div>
        ))}
      </CommentList>
    </div>
  );
};

export default Comments;
