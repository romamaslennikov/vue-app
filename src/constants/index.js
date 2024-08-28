import { version } from '../../package.json';

const BASE_API = import.meta.env.VITE_BASE_API;
const TOKEN_KEY = import.meta.env.VITE_APP_TOKEN_KEY;
const IS_DEV = import.meta.env.DEV;
const VERSION = version || '';

export { BASE_API, TOKEN_KEY, IS_DEV, VERSION };
