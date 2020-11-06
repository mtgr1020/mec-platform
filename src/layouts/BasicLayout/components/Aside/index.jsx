import { defineComponent, ref } from "@vue/runtime-core";
import { useRequest } from "@/utils/request";
import { getAsideMenus } from "@/config/dataSource";
import styleModule from "./index.module.less";

export default defineComponent({
  setup() {
    const asideMenuList = ref([]);
    const { request } = useRequest(getAsideMenus);
    request().then((res) => {
      asideMenuList.value = res.asideMenuList;
    });

    return () => (
      <div className={styleModule["g-aside"]}>
        <ul>
          {asideMenuList.value.map((item) => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  },
});
