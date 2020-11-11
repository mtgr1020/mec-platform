import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { canUserAccess } from "../utils/authenticate"

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  return canUserAccess(to, next)
})

export {
  router
}
