/**
 * 网络请求配置
 */
import axios from "axios";
const instance = axios.create();
instance.defaults.timeout = -1;
instance.defaults.baseURL = "http://192.168.3.200:8085/my-blog-react/myblog/api/";
// instance.defaults.baseURL = "http://192.168.0.100:8085/my-blog-react/myblog/api/";

instance.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截
instance.interceptors.request.use(config => {
  if (!window.navigator.onLine) {
    console("网络不给力！");
  }
  return config;
});
// 响应拦截
instance.interceptors.response.use(
  res => {
    if (res.data.code === "000001") {
      console(`${res.data.msg}`);
    } else {
      return res;
    }
  },
  err => {
    if (err.response) {
      return Promise.reject(err);
    }
  }
);

export default {
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  patch(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .patch(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
