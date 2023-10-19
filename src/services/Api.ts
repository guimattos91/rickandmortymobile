import axios from 'axios';
import { Config } from 'config/index';

const Api = axios.create({
  baseURL: Config.baseUrl,
});

// eslint-disable-next-line prettier/prettier
Api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
    },
  };
});

export default Api;
