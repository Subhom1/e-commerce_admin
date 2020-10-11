export default {
  items: [
    {
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/panel/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "orders",
          title: "Orders",
          type: "item",
          url: "/panel/orders",
          icon: "feather icon-package",
        },
        {
          id: "products",
          title: "Products",
          type: "item",
          url: "/panel/products",
          icon: "feather icon-list",
        },
        {
          id: "customers",
          title: "Customers",
          type: "item",
          url: "/panel/customers",
          icon: "feather icon-users",
        },
      ],
    },
  ],
};
