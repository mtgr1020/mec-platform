import { defineComponent } from "@vue/runtime-core";
import Header from "./components/Header";
import Aside from "./components/Aside";

export default defineComponent({
  setup() {
    return {};
  },
  render() {
    const layoutStyle = {
      minHeight: "100vh"
    }
    const headerStyle = {
      background: "#fff",
    }
    return (
      <div>
        <a-layout>
          <a-layout-sider>
            <Aside />
          </a-layout-sider>
          <a-layout style={layoutStyle}>
            <a-layout-header style={headerStyle}>
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
