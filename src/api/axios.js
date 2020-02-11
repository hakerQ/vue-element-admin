import axios from 'axios'


axios.defaults.baseURL = process.env.API_HOST; 
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export function post(url, data, otherConfig) {
  return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
  return axios.get(url, { params: data, ...otherConfig });
}