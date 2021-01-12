import axios from "axios";
import store from "@/store";

// 设置网络请求超时时间
axios.defaults.timeout = 5000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 判断是否为手机运行环境
if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL = globalThis.BaseURL;
}

// request interceptor
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    store.commit("updateLoadingStatus", {showLoading: false});
    return Promise.reject(error);
  }
);

// respone interceptor
axios.interceptors.response.use(
  (response) => {
    store.commit("updateLoadingStatus", {showLoading: false});
    return checkStatus(response);
  },
  (error) => {
    store.commit("updateLoadingStatus", {showLoading: false});
    return Promise.reject(error);
  }
);

// setup
function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    return response.data;
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    data: {
      result: 500,
    },
    message: "信息或网络异常,请重试!",
  };
}

export default axios;
