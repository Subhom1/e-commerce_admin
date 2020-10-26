import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => {
  const [pending, setPending] = useState(true);
  let isLogin = !!currentUser;

  useEffect(() => {
    !!currentUser && setPending(false);
  }, [currentUser]);

  let isLoggedIn =
    localStorage.is_user_loggedIn &&
    JSON.parse(localStorage.getItem("is_user_loggedIn"));
  console.log(isLogin, isLoggedIn, "isLoggedIn");
  if (pending && isLoggedIn) {
    return <>Loading...</>;
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLogin ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
const mapStateToProps = (state) => ({ ...state.auth });
export default connect(mapStateToProps)(ProtectedRoute);
