import React, { useEffect, useState } from "react";
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
  const [next, setNext] = useState(2);
  const initialRepComment = 2;
  const moreComment = 5;

  useEffect(() => {
    if (!comment.replyCM) return;
    setListReply(comment.replyCM);
  }, [comment.replyCM]);

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
        {listReply.slice(0, next).map((comment, index) => (
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

        <div>
          {listReply.length - next > 0 ? (
            <small
              style={{
                color: "crimson",
                textDecorationLine: "underline",
                cursor: "pointer",
              }}
              onClick={() => setNext((prev) => prev + moreComment)}
            >
              See more comments...
            </small>
          ) : (
            listReply.length > initialRepComment && (
              <small
                style={{
                  color: "teal",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setNext(initialRepComment)}
              >
                Hide comments ...
              </small>
            )
          )}
        </div>
      </CommentList>
    </div>
  );
};

export default Comments;
