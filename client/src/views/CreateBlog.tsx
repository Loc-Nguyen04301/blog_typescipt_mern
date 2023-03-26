import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../utils/TypeScript";
import { IBlog } from "../redux/types/blogType";
import NotFound from "./NotFound";
import CreateForm from "../components/card/CreateForm";
import CardHoriz from "../components/card/CardHoriz";
import ReactQuill from "../components/editor/ReactQuill";
import { validCreateBlog } from "../utils/Valid";
import { ALERT } from "../redux/types/alertType";
import { createBlog, updateBlog } from "../redux/actions/blogAction";
import Loading from "../components/Loading";
import { getAPI } from "../utils/FetchData";
interface IProps {
  blog_id?: string;
}

const CreateBlog: React.FC<IProps> = ({ blog_id }) => {
  const initialBlog = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  const [blog, setBlog] = useState<IBlog>(initialBlog);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const div = divRef.current;
    console.log(div?.innerText);
    if (!div) return;

    const text = div.innerText as string;
    setContent(text);
  }, [body]);

  useEffect(() => {
    if (!blog_id) return;
    setLoading(true);
    getAPI(`blog/${blog_id}`)
      .then((res) => {
        setBlog(res.data);
        setBody(res.data.content);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      setBlog(initialBlog);
      setBody("");
      setContent("");
    };
  }, [blog_id]);

  const handleSubmit = () => {
    if (!auth.access_token) return;
    // check Validate Blog
    const check = validCreateBlog({ ...blog, content });
    if (check.errorsLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errorMessage } });

    let newData = { ...blog, content: body };
    if (blog_id) {
      dispatch(updateBlog(newData, auth.access_token));
    } else {
      dispatch(createBlog(newData, auth.access_token));
    }
  };

  if (!auth.access_token) return <NotFound />;

  if (loading) return <Loading />;
  return (
    <div className="my-4 create_blog">
      <div className="row mt-4">
        <div className="col-md-6">
          <h5> {blog_id ? "Update" : "Create"}</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <ReactQuill body={body} setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />

      <small>{content.length}</small>
      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        {blog_id ? "Update Post" : "Create Post"}
      </button>
    </div>
  );
};

export default CreateBlog;
