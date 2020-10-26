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
import routes from "../routes";
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
    let allRoutes = [...routes, otherRoutes];
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

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {others}
              <ProtectedRoute path="/panel" component={AdminLayout} />
              {/* {allRoutes.map((i, indx) =>
                i.authRoute ? (
                  <ProtectedRoute
                    key={indx}
                    path="/panel"
                    component={AdminLayout}
                  />
                ) : !isLoggedIn ? (
                  <Route
                    key={indx}
                    path={i.path}
                    exact={i.exact}
                    name={i.name}
                    render={(props) => <i.component {...props} />}
                  />
                ) : (
                  
                  <ProtectedRoute
                    key={indx}
                    path="/panel"
                    component={AdminLayout}
                  />
                )
              )} */}
              {/* <Route path="*" component={() => <div>404 NOT FOUND</div>} /> */}
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

export default App;
