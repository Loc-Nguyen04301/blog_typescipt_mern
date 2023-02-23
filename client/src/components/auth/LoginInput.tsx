import React, { useState } from "react";
import { InputChange } from "../../utils/TypeScript";

const LoginInput = () => {
  const [userLogin, setUserLogin] = useState({ account: "", password: "" });
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: InputChange) => {
    e.preventDefault();
  };

  return (
    <form>
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
      </div>
    </form>
  );
};

export default LoginInput;
