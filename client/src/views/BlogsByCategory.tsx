import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./NotFound";
import CardVert from "../components/card/CardVert ";
import { RootStore, IParams } from "../utils/TypeScript";
import { IBlog } from "../redux/types/blogType";
import { getBlogsByCategoryId } from "../redux/actions/blogAction";
import Pagination from "../components/Pagination";
import "../styles/blogs_category.css";

const BlogsByCategory = () => {
  const { category, blogsCategory } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  const history = useHistory();
  // get category by params in URL path
  useEffect(() => {
    const selectedCategory = category.find((item) => item.name === slug);
    if (selectedCategory) setCategoryId(selectedCategory._id);
  }, [slug, category]);
  // Call API to get BLog by CategoryId with option is search, initially is ""
  useEffect(() => {
    if (categoryId)
      dispatch(getBlogsByCategoryId(categoryId, history.location.search));
  }, [dispatch, categoryId, history.location.search]);

  useEffect(() => {
    const data = blogsCategory.find(
      (item) =>
        item.id === categoryId && item.search === history.location.search
    );
    data && setBlogs(data.blogs);
    data && setTotal(data.total);
  }, [blogsCategory, categoryId, history]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategoryId(categoryId, search));
  };

  if (!blogs) return <NotFound />;
  return (
    <div className="blogs_category">
      <div className="show_blogs">
        {blogs.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>

      <Pagination total={total} callback={handlePagination} />
    </div>
  );
};

export default BlogsByCategory;
