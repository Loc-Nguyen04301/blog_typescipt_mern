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

import { refreshToken } from "./redux/actions/authAction";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <Alert />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/create_blog" component={CreateBlog} />
          <Route exact path="/:slug" component={Profile} />
          <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
