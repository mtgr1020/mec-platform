<template>
  <div class="login">
    <img class="logo-image" src="../../assets/img/Logo.png" />
    <div>
      <div class="login-right">
        <a-form name="custom-validation" ref="ruleForm">
          <a-form-item>
            <a-input placeholder="用户名" v-model:value="userInfo.userName">
              <template v-slot:suffix><UserOutlined /></template>
            </a-input>
          </a-form-item>
          <a-form-item required has-feedback>
            <a-input-password
              placeholder="密码"
              v-model:value="userInfo.pass"
              type="password"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
            <a-button
              type="primary"
              block
              :disabled="loading"
              :loading="loading"
              @click="onLogin"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined } from "@ant-design/icons-vue";
import { useRequest } from "@/utils/request";
import { userLogin } from "@/config/dataSource";
export default {
  setup() {
    const router = useRouter();
    const userInfo = reactive({
      userName: "zhang",
      pass: "zhang",
    });
    const { loading, request } = useRequest(userLogin);
    const onLogin = async () => {
      try {
        const res = await request({ data: userInfo });
        if (res) {
          sessionStorage.setItem("isLogin", true);
          router.push({
            path: "/",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    return {
      userInfo,
      loading,
      onLogin,
    };
  },
  components: {
    UserOutlined,
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bigbg.png) no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-image {
  position: relative;
  left: 8%;
  width: 5rem;
}
.login-right {
  box-sizing: border-box;
  width: 3.3rem;
  border-radius: 2px;
  padding: 0.3rem;
  background-color: #fff;
  position: relative;
  right: 40%;
}
</style>