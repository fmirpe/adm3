const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Pos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PosPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Cash",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CashPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/SalesToday",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/SalesTodayPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Categories",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CategoriesPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Locations",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LocationsPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Products",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ProductsPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Customers",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CustomersPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Suppliers",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/SuppliersPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Setting",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/StorePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Sales",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/SalesPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/Login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/Register",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/RegisterPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
