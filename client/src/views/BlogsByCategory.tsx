import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./NotFound";
import CardVert from "../components/card/CardVert ";
import { RootStore, IParams } from "../utils/TypeScript";
import { IBlog } from "../redux/types/blogType";

import { getBlogsByCategoryId } from "../redux/actions/blogAction";
import "../styles/blogs_category.css";

const BlogsByCategory = () => {
  const { category, blogsCategory } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug } = useParams<IParams>();

  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const selectedCategory = category.find((item) => item.name === slug);
    if (selectedCategory) setCategoryId(selectedCategory._id);
  }, [slug, category]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsCategory.every((item) => item.id !== categoryId)) {
      dispatch(getBlogsByCategoryId(categoryId));
    } else {
      const data = blogsCategory.find((item) => item.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [categoryId, blogsCategory, dispatch]);

  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;
