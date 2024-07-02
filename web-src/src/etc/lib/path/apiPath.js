// 콜론, slash
const colon = ":";
const slash = "/";

const gateway = import.meta.env.VITE_API_GATEWAY;
const prefix = import.meta.env.VITE_API_PREFIX;
const version = "v1";
const base_api_url = `${gateway}/${prefix}/${version}`;

// api
const apiPath = {};

export default apiPath;
