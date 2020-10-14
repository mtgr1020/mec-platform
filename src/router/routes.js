/**
 * 所有路由集合
 * @author zhangzy44
 */
const Login = () => import("@/pages/login.vue");

const routes = [
  {
    path: "",
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
    path: "/home",
    name: "home",
    component: Login,
  },
];

export default routes;
