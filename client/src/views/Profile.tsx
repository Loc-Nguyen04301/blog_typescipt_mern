import React from "react";
import { useParams } from "react-router-dom";
import { IParams } from "../utils/TypeScript";
import { useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";
import UserInfo from "../components/profile/UserInfo";
import OtherInfo from "../components/profile/OtherInfo";
import UserBlogs from "../components/profile/UserBlogs";
import "../styles/profile.css";

const Profile = () => {
  const { slug } = useParams<IParams>();
  const { access_token, user } = useSelector((state: RootStore) => state.auth);

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {user && user._id === slug ? <UserInfo /> : <OtherInfo id={slug} />}
      </div>

      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
