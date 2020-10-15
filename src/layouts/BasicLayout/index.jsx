import { defineComponent } from "@vue/runtime-core";
import Header from "./components/Header";
import Aside from "./components/Aside";

export default defineComponent({
  setup() {},
  render() {
    return (
      <div>
        <a-layout>
          <a-layout-sider>
            <Aside />
          </a-layout-sider>
          <a-layout style={{ minHeight: "100vh" }}>
            <a-layout-header>
              <Header />
            </a-layout-header>
            <a-layout-content>
              <router-view></router-view>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div>
    );
  },
});
