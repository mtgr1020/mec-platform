import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
/** 引入less,可以通过对less-loader配置修改来定制主题,见vue.config.js */
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

import "./utils/fontsize";

const app = createApp(App);
// 阻止vue在启动时生成生产提示
app.config.productionTip = false;

app.use(Antd);
app.use(router);
app.mount("#app");
