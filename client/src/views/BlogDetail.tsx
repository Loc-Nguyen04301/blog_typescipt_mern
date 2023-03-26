import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IParams, RootStore } from "../utils/TypeScript";
import { IBlog } from "../redux/types/blogType";
import { getAPI } from "../utils/FetchData";
import Loading from "../components/Loading";
import DetailBlog from "../components/blog/DetailBlog";

const BlogDetail = () => {
  const blogId = useParams<IParams>().slug;
  // const { socket } = useSelector((state: RootStore) => state);

  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!blogId) return;

    setLoading(true);

    getAPI(`blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => setBlog(undefined);
  }, [blogId]);

  // useEffect(() => {
  //   if (!blogId || !socket) return;
  //   socket.emit("joinRoom", blogId);

  //   return () => {
  //     socket.emit("outRoom", blogId);
  //   };
  // }, [blogId, socket]);

  if (loading) return <Loading />;

  return (
    <>
      {blog && (
        <div className="my-4">
          <DetailBlog blog={blog} />
        </div>
      )}
    </>
  );
};

export default BlogDetail;
