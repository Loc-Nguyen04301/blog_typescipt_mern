import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login-lite";

const SocialLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    console.log(googleUser);
  };

  const onFailure = (err: any) => {
    console.log(err);
  };

  return (
    <div className="mt=2">
      <GoogleLogin
        client_id={import.meta.env.VITE_MAIL_CLIENT_ID}
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default SocialLogin;
