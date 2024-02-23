import axios from "axios";
import { restHeaderSrcName, restHeaderTokenName } from "common/js/static";

let ip;
let token;

const timeOut = 180000;

const Instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    timeout: timeOut,
});

// const userInfo;
Instance.interceptors.request.use(
    (config) => {
        // const recoilSession = JSON.parse(
        //     sessionStorage.getItem("recoilSession"),
        // );
        //
        // ip =
        //     recoilSession === null
        //         ? sessionStorage.getItem("ipInfo")
        //         : recoilSession.ipInfo;
        // token = recoilSession === null ? "" : recoilSession.userToken;
        //
        // config.headers[restHeaderSrcName] = ip ? ip : "";
        // config.headers[restHeaderTokenName] = token ? token : "";
        setInterceptors(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

// multipart/form-data
const Instance_multi = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "multipart/mixed",
    },
    timeout: timeOut,
});

Instance_multi.interceptors.request.use(
    (config) => {
        // ip = store.getState().ipInfo.ipInfo;
        // token = store.getState().userInfo.userToken;

        // config.headers["Medicity-Src"] = ip ? ip : "";
        // config.headers["Medicity-Token"] = token ? token : "";
        // return config;

        setInterceptors(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

const setInterceptors = (config) => {
    // ip = store.getState().ipInfo.ipInfo;
    // token = store.getState().userInfo.userToken;

    // ip =
    //     JSON.parse(sessionStorage.getItem("recoilSession")).ipInfo !== null
    //         ? JSON.parse(sessionStorage.getItem("recoilSession")).ipInfo
    //         : sessionStorage.getItem("ipInfo");
    const recoilSession = JSON.parse(sessionStorage.getItem("recoilSession"));

    ip =
        recoilSession === null
            ? sessionStorage.getItem("ipInfo")
            : recoilSession.ipInfo;
    token = recoilSession === null ? "" : recoilSession.userToken;

    config.headers[restHeaderSrcName] = ip ? ip : "";
    config.headers[restHeaderTokenName] = token ? token : "";

    return config;
};

const Instance_kakao = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    timeout: timeOut,
});

// const userInfo;
Instance_kakao.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = "Basic ClientId ClientSecret";
        config.headers["version"] = "v1";
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export { Instance, Instance_multi, Instance_kakao };
