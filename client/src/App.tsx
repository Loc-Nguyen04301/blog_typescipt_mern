import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Alert from "./components/alert/Alert";

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
          <Route exact path="/notfound" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
