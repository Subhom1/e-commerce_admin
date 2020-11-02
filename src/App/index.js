import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import Firebase from "../firebase";
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import otherRoutes from "../otherRoutes";
import ProtectedRoute from "../ProtectedRoute";
const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  componentWillMount() {
    Firebase.authObserver();
  }
  render() {
    let isLoggedIn =
      localStorage.is_user_loggedIn &&
      JSON.parse(localStorage.getItem("is_user_loggedIn"));
    const others = otherRoutes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });
    if (isLoggedIn) {
      return (
        <Aux>
          <ScrollToTop>
            <Suspense fallback={<Loader />}>
              <Switch>
                <ProtectedRoute path="/panel" component={AdminLayout} />
                <Redirect from="*" to="/panel/dashboard" />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Aux>
      );
    } else
      return (
        <Aux>
          <ScrollToTop>
            <Suspense fallback={<Loader />}>
              <Switch>
                {others}
                <Redirect from="*" to="/" />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Aux>
      );
  }
}

export default App;
