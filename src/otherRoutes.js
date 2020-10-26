import React from "react";

const SignUp = React.lazy(() => import("./App/components/SignUp"));
const LogIn = React.lazy(() => import("./App/components/LogIn"));
const ForgotPassword = React.lazy(() =>
  import("./App/components/ForgotPassword")
);

const otherRoutes = [
  {
    path: "/signup",
    exact: true,
    name: "SignUp",
    component: SignUp,
    authRoute: false,
  },
  { path: "/", exact: true, name: "LogIn", component: LogIn, authRoute: false },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
    authRoute: false,
  },
];

export default otherRoutes;
