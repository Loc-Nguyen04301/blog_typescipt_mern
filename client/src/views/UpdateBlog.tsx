import React from "react";
import { useParams } from "react-router-dom";
import { IParams } from "../utils/TypeScript";
import CreateBlog from "./CreateBlog";

const UpdateBlog = () => {
  const { slug } = useParams<IParams>();
  return <CreateBlog blog_id={slug} />;
};

export default UpdateBlog;
