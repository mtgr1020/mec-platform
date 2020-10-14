<template>
  <div class="login">
    <img
      class="logo-image"
      src="../assets/img/LenovoLogo-Chinese_POS-Cyan-H.png"
    />
    <div>
      <div class="login-right">
        <a-form name="custom-validation" ref="ruleForm">
          <a-form-item>
            <a-input placeholder="用户名" v-model:value="form.userName">
              <template v-slot:suffix><UserOutlined /></template>
            </a-input>
          </a-form-item>
          <a-form-item required has-feedback>
            <a-input-password
              placeholder="密码"
              v-model:value="form.pass"
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
import { useRequest } from "../utils/request";
import { userLogin } from "../config/dataSource";
export default {
  setup() {
    const router = useRouter();
    const form = reactive({
      userName: "zhang",
      pass: "111",
    });
    const { loading, request } = useRequest(userLogin);
    const onLogin = async () => {
      try {
        await request({ data: form });
        router.push({
          name: "home",
        });
      } catch (error) {
        console.error(error);
      }
    };
    return {
      form,
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
  background: url(../assets/img/bigbg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-image {
  position: relative;
  top: -5%;
  left: 10%;
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