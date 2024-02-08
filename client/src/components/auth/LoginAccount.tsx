import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormSubmit, InputChange } from "../../utils/TypeScript";
import { login } from "../../redux/actions/authAction";

const LoginAccount = () => {
  const [userLogin, setUserLogin] = useState({ account: "", password: "" });
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Email / Phone number
        </label>

        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>

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

      <button
        type="submit"
        className="btn btn-dark w-100 mt-1"
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginAccount;
