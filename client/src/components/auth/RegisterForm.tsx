import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormSubmit, InputChange } from "../../utils/TypeScript";
import { register } from "../../redux/actions/authAction";

const RegisterForm = () => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    account: "",
    password: "",
    confirmPassword: "",
  });
  const { name, account, password, confirmPassword } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPassword, setTypeCfPassword] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>

        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          placeholder="Enter your name"
        />
      </div>

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
        {/* css for password */}
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

      <div className="form-group mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        {/* css for password */}
        <div className="pass">
          <input
            type={typeCfPassword ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPassword(!typeCfPassword)}>
            {typeCfPassword ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 mt-1"
        disabled={name && account && password && confirmPassword ? false : true}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
