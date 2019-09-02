import axios from 'axios';

const url = process.env.REACT_APP_URL;

const handleSuccess = response => response.data;
const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return Promise.reject(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    return error.message;
  }
};

const useApi = () => {
  let service = axios.create({
    baseURL: url,
    'Content-Type': 'application/json'
  });
  service.interceptors.response.use(handleSuccess, handleError);

  const get = (path, params) => {
    return service.get(path, params);
  };
  const post = (path, body) => {
    return service.post(path, body);
  };
  const put = (path, body) => {
    return service.put(path, body);
  };
  const remove = path => {
    service.delete(path);
  };

  return {
    get,
    post,
    put,
    remove
  };
};

export default useApi;
