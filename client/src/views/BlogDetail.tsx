import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IParams } from "../utils/TypeScript";
import { IBlog } from "../redux/types/blogType";
import { getAPI } from "../utils/FetchData";
import Loading from "../components/Loading";
import DetailBlog from "../components/blog/DetailBlog";

const BlogDetail = () => {
  const blogId = useParams<IParams>().slug;

  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    getAPI(`blog/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [blogId]);

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
