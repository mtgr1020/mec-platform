/**
 * 所有路由集合
 * @author zhangzy44
 */
const Login = () => import("@/pages/UserLogin");
const BasicLayout = () => import("@/layouts/BasicLayout/index.jsx");
const WorkSpace = () => import("@/pages/WorkSpace");
const DragDemo = () => import("@/pages/DragDemo")

const routes = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/app",
    name: "app",
    component: BasicLayout,
    children: [
      {
        path: "workspace",
        component: WorkSpace,
      },
      {
        path: "dragdemo",
        component: DragDemo,
      },
      {
        path: "",
        redirect: "/app/workspace",
      },
    ],
  },
];

export default routes;
