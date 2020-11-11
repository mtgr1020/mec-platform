import { defineComponent } from "@vue/runtime-core";
import AsideLogo from "@/assets/img/AsideLogo.png";

export default defineComponent({
  setup() {},
  render() {
    return (
      <div>
        <a
          style="display:inline-block;width:100%;height:100%;"
          href="https://github.com/mtgr1020/mec-platform"
          target="_blank"
        >
          <img style="width:100%;" src={AsideLogo} />
        </a>
      </div>
    );
  },
});
