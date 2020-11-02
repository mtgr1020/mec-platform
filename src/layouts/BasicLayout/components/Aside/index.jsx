import { defineComponent } from "@vue/runtime-core";
import { useRequest } from "@/utils/request";
import { getAsideMenus } from "@/config/dataSource"

export default defineComponent({
  async setup() {
    const { request } = useRequest(getAsideMenus);
    const memus = await request()
    console.log(memus)
  },
  render() {
    return (
      <div>
        <p>Aside</p>
      </div>
    );
  },
});
