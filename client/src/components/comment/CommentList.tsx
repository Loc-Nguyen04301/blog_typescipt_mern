import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { IComment } from "../../redux/types/commentType";
import Input from "./Input";
interface IProps {
  comment: IComment;
  listReply: IComment[];
  setListReply: (listReply: IComment[]) => void;
}

const CommentList: React.FC<IProps> = ({
  children,
  comment,
  listReply,
  setListReply,
}) => {
  const [onReply, setOnReply] = useState(false);
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleClickSendReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;
    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment._id,
      createdAt: new Date().toISOString(),
    };
    setListReply([...listReply, data]);
    setOnReply(true);
  };

  const handleToOpenReplyModal = () => {
    setOnReply((prev) => !prev);
  };

  return (
    <div className="w-100">
      <div className="comment_box">
        <div
          className="p-2"
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />

        <div className="d-flex justify-content-between p-2">
          <small style={{ cursor: "pointer" }} onClick={handleToOpenReplyModal}>
            {onReply ? "- Cancel -" : "- Reply -"}
          </small>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      </div>

      {onReply && <Input callback={handleClickSendReply} />}

      {children}
    </div>
  );
};

export default CommentList;
