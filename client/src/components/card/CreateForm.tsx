import React from "react";
import { useSelector } from "react-redux";
import { RootStore, InputChange } from "../../utils/TypeScript";
import { IBlog } from "../../redux/types/blogType";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {
  const { category } = useSelector((state: RootStore) => state);

  const handleChangeInput = (e: InputChange) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleChangeThumbnail = (e: InputChange) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };

  return (
    <form>
      <div className="form-group position-relative">
        <input
          type="text"
          className="form-control"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
        />
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="form-group my-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>

      <div className="form-group position-relative">
        <textarea
          className="form-control"
          rows={4}
          value={blog.description}
          style={{ resize: "none" }}
          name="description"
          onChange={handleChangeInput}
        />
        <small
          className="text-muted position-absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/200
        </small>
      </div>

      <div className="form-group my-3">
        <select
          className="form-control text-capitalize"
          value={blog.category}
          name="category"
          onChange={handleChangeInput}
        >
          <option value="">Choose a category</option>
          {category.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
