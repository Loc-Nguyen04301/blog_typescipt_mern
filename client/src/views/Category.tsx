import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { FormSubmit, RootStore, InputChange } from "../utils/TypeScript";
import { useSelector, useDispatch } from "react-redux";
import "../styles/category.css";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../redux/actions/categoryAction";
import { ICategory } from "../redux/types/categoryType";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);

  const { auth, category } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleChangeName = (e: InputChange) => {
    setName(e.target.value);
  };

  const handleEdit = (item: ICategory) => {
    setEdit(item);
  };

  const handleDelete = (id) => {
    if (!auth.access_token) return;
    dispatch(deleteCategory(id, auth.access_token));
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    if (!auth.access_token || !name) return;

    if (edit) {
      const updateData = { ...edit, name };
      dispatch(updateCategory(updateData, auth.access_token));
    } else {
      dispatch(createCategory(name, auth.access_token));
    }
    setName("");
    setEdit(null);
  };

  useEffect(() => {
    if (edit) {
      setName(edit.name);
    }
  }, [edit]);


  if (auth.user && auth.user.role !== "admin") return <NotFound />;
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <div className="d-flex">
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={handleChangeName}
          />

          <button type="submit">{edit ? "Edit" : "Create"}</button>
        </div>
      </form>

      <div>
        {category &&
          category.map((item) => (
            <div className="category_row" key={item._id}>
              <p className="m-0 text-capitalize">{item.name}</p>

              <div>
                <i
                  className="fas fa-edit mx-2"
                  onClick={() => handleEdit(item)}
                />
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
