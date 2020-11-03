import { defineComponent, ref } from "@vue/runtime-core";
import { useRequest } from "@/utils/request";
import { getAsideMenus } from "@/config/dataSource";

export default defineComponent({
  setup() {
    const asideMenuList = ref([]);
    const { request } = useRequest(getAsideMenus);
    request().then((res) => {
      asideMenuList.value = res.asideMenuList;
    });
    const listMenus = asideMenuList.value.map((menu) => {
      return <div keys="menu.name">{menu.name}</div>;
    });
    return () => {
      <>
        <listMenus />
      </>;
    };
  },
});
