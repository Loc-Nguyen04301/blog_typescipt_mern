import React, { useEffect, useState } from "react";
import { getAPI } from "../utils/FetchData";
import { IBlog } from "../redux/types/blogType";
import CardHoriz from "./card/CardHoriz";

const Search = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchingData = async () => {
      if (search.length < 2) return setBlogs([]);
      await getAPI(`blog/search/blogs?title=${search}`)
        .then((res) => setBlogs(res.data))
        .catch((error) => console.log(error));
    };

    const timer = setTimeout(() => {
      fetchingData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="search w-100 position-relative me-4">
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="Enter your search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length >= 2 && (
        <div
          className="position-absolute pt-2 px-1 w-100 rounded"
          style={{
            background: "#eee",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            overflow: "auto",
          }}
        >
          {blogs.length ? (
            blogs.map((blog) => <CardHoriz key={blog._id} blog={blog} />)
          ) : (
            <h3 className="text-center">No Blogs</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
