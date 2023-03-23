import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { IComment } from "../../redux/types/commentType";
import Input from "./Input";

import {
  replyComment,
  updateComment,
  deleteComment,
} from "../../redux/actions/commentAction";
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

  const [edit, setEdit] = useState<IComment>();

  const handleClickSendReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;
    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };
    setListReply([...listReply, data]);
    dispatch(replyComment(data, auth.access_token));
    setOnReply(false);
  };

  const handleToOpenReplyModal = () => {
    setOnReply((prev) => !prev);
  };

  const handleDelete = (comment: IComment) => {
    if (!auth.user || !auth.access_token) return;
    dispatch(deleteComment(comment, auth.access_token));
  };

  const handleEdit = (comment: IComment) => {
    setEdit(comment);
  };

  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    dispatch(updateComment(newComment, auth.access_token));
    setEdit(undefined);
  };

  const Nav = (comment: IComment) => {
    return (
      <div>
        <i
          className="fas fa-trash-alt mx-2"
          onClick={() => handleDelete(comment)}
        />
        <i className="fas fa-edit me-2" onClick={() => handleEdit(comment)} />
      </div>
    );
  };

  return (
    <div className="w-100">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
        <div className="comment_box">
          <div
            className="p-2"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
          />

          <div className="d-flex justify-content-between p-2">
            {auth.user && (
              <small
                style={{ cursor: "pointer" }}
                onClick={handleToOpenReplyModal}
              >
                {onReply ? "- Cancel -" : "- Reply -"}
              </small>
            )}

            <small className="d-flex">
              <div className="comment_nav">
                {/* Xác định chủ comment có phải là user hiện tại hay ko, nếu có thì có thể Edit được comment */}
                {comment.blog_user_id === auth.user?._id ? (
                  comment.user._id === auth.user._id ? (
                    Nav(comment)
                  ) : (
                    <i
                      className="fas fa-trash-alt mx-2"
                      onClick={() => handleDelete(comment)}
                    />
                  )
                ) : (
                  comment.user._id === auth.user?._id && Nav(comment)
                )}
              </div>
              <div>{new Date(comment.createdAt).toLocaleString()}</div>
            </small>
          </div>
        </div>
      )}

      {onReply && <Input callback={handleClickSendReply} />}

      {children}
    </div>
  );
};

export default CommentList;
