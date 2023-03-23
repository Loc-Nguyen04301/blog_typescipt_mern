import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { IBlog } from "../../redux/types/blogType";
import { IComment } from "../../redux/types/commentType";
import { RootStore } from "../../utils/TypeScript";

import Comments from "../comment/Comments";
import Input from "../comment/Input";
import { createComment, getComments } from "../../redux/actions/commentAction";
import Loading from "../Loading";
import Pagination from "../Pagination";
interface IProps {
  blog: IBlog;
}

const DetailBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comment } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: blog.user as string,
      content: body,
      createdAt: new Date().toISOString(),
    };

    setShowComments([...showComments, data]);
    dispatch(createComment(data, auth.access_token));
  };

  useEffect(() => {
    setShowComments(comment.data);
  }, [comment.data]);

  const fetchComments = useCallback(
    async (id: string, num) => {
      setLoading(true);
      await dispatch(getComments(id, num));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, history, fetchComments]);

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };

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
        showComments &&
        showComments.map((item) => <Comments key={item._id} comment={item} />)
      )}

      {comment.total > 1 && (
        <Pagination total={comment.total} callback={handlePagination} />
      )}
    </div>
  );
};

export default DetailBlog;
