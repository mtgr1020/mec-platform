import { defineComponent, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "@/utils/request";
import { getAsideMenus } from "@/config/dataSource";
import Logo from "@/layouts/MuseumLayout/Logo";
import styleModule from "./index.module.less";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const asideMenuList = ref([]);
    const { request } = useRequest(getAsideMenus);
    request().then(async (res) => {
      asideMenuList.value = await asyncComponent(res.asideMenuList);
    });

    const handleMenuClick = (path) => {
      router.push({
        path,
      });
    };

    return () => (
      <>
        <Logo></Logo>
        <ul className={styleModule["m-list-wrap"]}>
          {asideMenuList.value.map((item) => {
            return (
              <li
                className={
                  route.path === item.path ? styleModule["m-list-active"] : ""
                }
                onClick={handleMenuClick.bind(null, item.path)}
              >
                <item.IconComponent />
                <span className={styleModule["m-list-font"]}>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  },
});

async function asyncComponent(menuList) {
  const iconModules = await import("@ant-design/icons-vue");
  menuList = menuList.map((menu) => {
    menu["IconComponent"] = iconModules[menu["icon"] || "QuestionOutlined"];
    return menu;
  });
  return menuList;
}
