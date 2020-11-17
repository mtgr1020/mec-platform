import axios from "axios";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { router } from "../router"

// Set baseURL when debugging production url in dev mode
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";
axios.defaults.withCredentials = true;

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object} response data
 */
export const request = async function (option) {
  try {
    const response = await axios(option);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      return { response, data };
    }
  } catch (error) {
    showError(error.message);
    console.error(error);
  }
};

export const useRequest = function (options) {
  let loading = ref(false);
  async function request(config) {
    try {
      loading.value = true;
      const response = await axios({
        ...options,
        ...config,
      });
      const { data, error } = handleResponse(response);
      if (error) {
        throw error;
      } else {
        return data;
      }
    } catch (error) {
      showError(`${options.method || 'GET'} ${options.url} ${error.message}`);
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    request,
  };
};

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (data.status === "SUCCESS") {
    return { data };
  } else if (data.status === "NOT_LOGIN") {
    router.push({
      name: 'Login'
    })
    const error = new Error("用户认证失败,请重新登录");
    return { error };
  } else {
    const error = new Error(data.message || "后端接口异常");
    return { error };
  }
}

/**
 * Display error message
 *
 * @param {string} errorMessage - error message
 */
function showError(errorMessage) {
  message.error(errorMessage);
}
