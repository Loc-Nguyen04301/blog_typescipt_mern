import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, InputChange, FormSubmit } from "../../utils/TypeScript";
import NotFound from "../../views/NotFound";
import { updateUser, resetPassword } from "../../redux/actions/profileAction";

const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const [user, setUser] = useState({
    name: "",
    account: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  const { name, account, avatar, password, confirmPassword } = user;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: InputChange) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    if (avatar || name) dispatch(updateUser(avatar as File, name, auth));

    if (password && auth.access_token)
      dispatch(resetPassword(password, confirmPassword, auth));
  };

  if (!auth.user) return <NotFound />;
  return (
    <form className="profile_info" onSubmit={handleSubmit}>
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          alt="avatar"
        />

        <span>
          <i className="fas fa-camera" />
          <p>Change</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file_up"
            onChange={handleChangeFile}
          />
        </span>
      </div>

      <div className="form-group my-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>

      <div className="form-group my-3">
        <label htmlFor="password">Password</label>

        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <div className="form-group my-3">
        <label htmlFor="confirmPassword">Confirm Password</label>

        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button className="btn btn-dark w-100" type="submit">
        Update
      </button>
    </form>
  );
};

export default UserInfo;
