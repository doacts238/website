import axios from 'axios';
// import { toast } from 'react-toastify';
// import logApi from './logService';

axios.interceptors.response.use(null, error => {
  let valReturn = null;
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    valReturn = Promise.reject(error);
  } else {
    // logApi.log(error);
    // toast.error('An unexpected error occurred.');
  }
  return valReturn;
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
