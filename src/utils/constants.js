import {ApiOption} from '@p/requestApi.js';

globalThis.Env = 'dev' // ‘dev’ or ‘pro’
globalThis.Version = '1.0.0'
globalThis.BaseURL = ApiOption.get_base_path
