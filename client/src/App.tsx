import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Alert from "./components/alert/Alert";

import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import CreateBlog from "./views/CreateBlog";
import Category from "./views/Category";
import UpdateBlog from "./views/UpdateBlog";

import { refreshToken } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";
import { useDispatch } from "react-redux";
import BlogsByCategory from "./views/BlogsByCategory";
import BlogDetail from "./views/BlogDetail";

//Socket.io
import { io } from "socket.io-client";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getCategories());
    dispatch(getHomeBlogs());
  }, [dispatch]);

  // useEffect(() => {
  //   const socket = io();
  //   dispatch({ type: "SOCKET", payload: socket });
  //   return () => {
  //     socket.close();
  //   };
  // }, [dispatch]);

  return (
    <Router>
      <Alert />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/create_blog" component={CreateBlog} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/:slug" component={Profile} />
          <Route exact path="/blogs/:slug" component={BlogsByCategory} />
          <Route exact path="/blog/:slug" component={BlogDetail} />
          <Route exact path="/update_blog/:slug" component={UpdateBlog} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
