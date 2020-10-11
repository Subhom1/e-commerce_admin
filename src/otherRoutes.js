import React from "react";

const SignUp = React.lazy(() => import("./App/components/SignUp"));
const LogIn = React.lazy(() => import("./App/components/LogIn"));
const ForgotPassword = React.lazy(() =>
  import("./App/components/ForgotPassword")
);

const otherRoutes = [
  { path: "/signup", exact: true, name: "SignUp", component: SignUp },
  { path: "/", exact: true, name: "LogIn", component: LogIn },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
  },
];

export default otherRoutes;
