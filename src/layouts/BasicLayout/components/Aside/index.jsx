import { defineComponent, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useRequest } from "@/utils/request";
import { getAsideMenus } from "@/config/dataSource";
import Logo from "@/layouts/MuseumLayout/Logo";
import styleModule from "./index.module.less";

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route.path);
    const asideMenuList = ref([]);
    const { request } = useRequest(getAsideMenus);
    request().then(async (res) => {
      asideMenuList.value = await asyncComponent(res.asideMenuList);
    });

    return () => (
      <>
        <Logo></Logo>
        <ul className={styleModule["m-list-wrap"]}>
          {asideMenuList.value.map((item) => {
            return (
              <li>
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
