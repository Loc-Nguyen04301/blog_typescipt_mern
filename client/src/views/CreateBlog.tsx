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
import { createBlog } from "../redux/actions/blogAction";

const CreateBlog = () => {
  const [blog, setBlog] = useState<IBlog>({
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  });
  const [body, setBody] = useState("");

  const divRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");

  const { auth, category } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const div = divRef.current;
    console.log(div?.innerText);
    if (!div) return;

    const text = div.innerText as string;
    setContent(text);
  }, [body]);

  const handleSubmit = () => {
    if (!auth.access_token) return;
    // check Validate Blog
    const check = validCreateBlog({ ...blog, content });
    if (check.errorsLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errorMessage } });

    let newData = { ...blog, content: body };

    dispatch(createBlog(newData, auth.access_token));
  };

  if (!auth.access_token) return <NotFound />;
  return (
    <div className="my-4 create_blog">
      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className="col-md-6">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <ReactQuill setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        // style={{ display: "none" }}
      />

      <small>{content.length}</small>
      <button
        className="btn btn-dark mt-3 d-block mx-auto"
        onClick={handleSubmit}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreateBlog;
