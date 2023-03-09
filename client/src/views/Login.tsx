import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/auth.css";
import LoginAccount from "../components/auth/LoginAccount";
import LoginSMS from "../components/auth/LoginSMS";
import SocialLogin from "../components/auth/SocialLogin";

import { RootStore } from "../utils/TypeScript";

const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useHistory();

  const { access_token } = useSelector((state: RootStore) => state.auth);

  useEffect(() => {
    if (access_token) history.push("/");
  }, [access_token, history]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        {sms ? <LoginSMS /> : <LoginAccount />}

        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password">Forgot password?</Link>
          </span>

          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with SMS"}
          </span>
        </small>

        <p>
          You don't have an account?
          <Link to={`/register`} style={{ color: "crimson" }}>
            {` Register Now`}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
