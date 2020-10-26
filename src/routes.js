import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import("./App/components/Dashboard"));
const Orders = React.lazy(() => import("./App/components/Orders"));
const Products = React.lazy(() => import("./App/components/Products"));
const Customers = React.lazy(() => import("./App/components/Customers"));

const routes = [
  {
    path: "/panel/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    authRoute: true,
  },
  {
    path: "/panel/orders",
    exact: true,
    name: "Orders",
    component: Orders,
    authRoute: true,
  },
  {
    path: "/panel/products",
    exact: true,
    name: "Products",
    component: Products,
    authRoute: true,
  },
  {
    path: "/panel/customers",
    exact: true,
    name: "Customers",
    component: Customers,
    authRoute: true,
  },
];

export default routes;
