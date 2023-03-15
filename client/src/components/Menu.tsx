import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../utils/TypeScript";
import { logout } from "../redux/actions/authAction";

const Menu = () => {
  const { access_token, user } = useSelector((state: RootStore) => state.auth);

  const bfLoginLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];

  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "CreateBlog", path: "/create_blog" },
  ];

  const navlinks = access_token ? afLoginLinks : bfLoginLinks;

  const location = useLocation();

  const dispatch = useDispatch();

  const isActive = (pn: string) => {
    if (pn === location.pathname) return "active";
  };

  return (
    <ul className="navbar-nav ms-auto">
      {navlinks.map((link, index) => (
        <li key={index} className={`nav-item ${isActive(link.path)}`}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
      {user && user.role === "admin" && (
        <li className={`nav-item ${isActive("/category")}`}>
          <Link to="/category" className="nav-link">
            Category
          </Link>
        </li>
      )}

      {user && (
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={user.avatar} alt="avatar" className="avatar" />
          </span>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to={`/${user._id}`}>
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
