/**
 * 所有路由集合
 * @author zhangzy44
 */
const Login = () => import("@/pages/UserLogin");
const BasicLayout = () => import("@/layouts/BasicLayout/index.jsx");
const WorkSpace = () => import("@/pages/WorkSpace");

const routes = [

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: BasicLayout,
    children: [
      {
        path: "workspace",
        component: WorkSpace,
      },
      {
        path: "menu",
        component: WorkSpace,
      },
      {
        path: "chart",
        component: WorkSpace,
      },
      {
        path: "table",
        component: WorkSpace,
      },
      {
        path: "list",
        component: WorkSpace,
      },
      {
        path: "profile",
        component: WorkSpace,
      },
      {
        path: "exception",
        component: WorkSpace,
      },
      {
        path: "",
        redirect: "/workspace",
      },
    ],
  },
];

export default routes;
