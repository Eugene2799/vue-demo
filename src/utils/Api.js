import axios from '@/config/request.js';
import {ApiOption} from '@p/requestApi.js';

export const TSBBData = {
  get: () => axios.post(ApiOption.get_base_path).then(res => {
    return res
  })
};
