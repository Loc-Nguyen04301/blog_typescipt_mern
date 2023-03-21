import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IBlog } from "../../redux/types/blogType";
import { IUser } from "../../utils/TypeScript";
import { IComment } from "../../redux/types/commentType";
import { RootStore } from "../../utils/TypeScript";

import Comments from "../comment/Comments";
import Input from "../comment/Input";
import { createComment, getComments } from "../../redux/actions/commentAction";
import Loading from "../Loading";
interface IProps {
  blog: IBlog;
}

const DetailBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comment } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;
    const data = {
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      content: body,
      createdAt: new Date().toISOString(),
    };
    setShowComments([...showComments, data]);
    dispatch(createComment(data, auth.access_token));
  };

  useEffect(() => {
    if (comment.data.length === 0) return;
    setShowComments(comment.data);
  }, [comment.data]);

  const fetchComments = useCallback(
    async (id: string) => {
      setLoading(true);
      await dispatch(getComments(id));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!blog._id) return;
    fetchComments(blog._id);
  }, [blog._id]);

  return (
    <div>
      <h2
        className="text-center my-3 text-capitalize fs-1"
        style={{ color: "#ff7a00" }}
      >
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{ color: "teal" }}>
        <small>
          {typeof blog.user !== "string" && `By: ${blog.user.name}`}
        </small>

        <small className="ms-2">
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      <hr className="my-1" />
      <h3 style={{ color: "#ff7a00" }}>✩ Comments ✩</h3>

      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
        </h5>
      )}

      {loading ? (
        <Loading />
      ) : (
        comment &&
        comment.data.map((item, index) => (
          <Comments key={item._id} comment={item} />
        ))
      )}
    </div>
  );
};

export default DetailBlog;
