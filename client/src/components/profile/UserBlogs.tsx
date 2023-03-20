import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { IParams, RootStore } from "../../utils/TypeScript";
import { IBlog } from "../../redux/types/blogType";
import CardHoriz from "../card/CardHoriz";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { getBlogsByUserId } from "../../redux/actions/blogAction";

const UserBlogs = () => {
  const { blogsUser } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const userId = useParams<IParams>().slug;

  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  const history = useHistory();
  // Call API to get BLog by userId with option is search, initially is ""
  useEffect(() => {
    if (userId) dispatch(getBlogsByUserId(userId, history.location.search));
  }, [dispatch, userId, history.location.search]);

  useEffect(() => {
    const data = blogsUser.find(
      (item) => item.id === userId && item.search === history.location.search
    );
    data && setBlogs(data.blogs);
    data && setTotal(data.total);
  }, [blogsUser]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserId(userId, search));
  };

  if (!blogs) return <Loading />;
  if (blogs.length === 0) return <h3 className="text-center">No Blogs</h3>;
  return (
    <>
      <div>
        {blogs.map((blog) => (
          <CardHoriz key={blog._id} blog={blog} />
        ))}
      </div>

      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </>
  );
};

export default UserBlogs;
