// 공용 REST
/*
-- restParams --
dispatch : useDispatch
alert : useAlert
method : "post", "get", "delete", "put", "post_multi", "put_multi"
url : ""
data : {}
callback : callback()
admin: ""
*/

import {
    Instance,
    Instance_admin,
    Instance_admin_file,
    Instance_admin_file_multi,
    Instance_admin_multi,
    Instance_file,
    Instance_multi,
    Instance_multi_file,
} from "etc/lib/Instance";
import { CommonConsole, CommonNotify } from "etc/lib/Common";
import { errorCode } from "etc/lib/resultCode";
import tokenExpire from "etc/lib/tokenExpire";
import { restTimeOut } from "etc/lib/static";

const RestServer = (method, url, data, admin, file) => {
    switch (method) {
        case "get":
            const retGet =
                admin === "Y"
                    ? Instance_admin.get(url, data)
                    : Instance.get(url, data);
            return retGet;

        case "post":
            const retPost =
                admin === "Y"
                    ? file === "Y"
                        ? Instance_admin_file.post(url, data)
                        : Instance_admin.post(url, data)
                    : file === "Y"
                    ? Instance_file(url, data)
                    : Instance.post(url, data);
            return retPost;

        case "put":
            const retPut =
                admin === "Y"
                    ? Instance_admin.put(url, data)
                    : Instance.put(url, data);
            return retPut;

        case "delete":
            const retDelete =
                admin === "Y"
                    ? Instance_admin.delete(url, data)
                    : Instance.delete(url, data);
            return retDelete;

        case "post_multi":
            const retMultiPost =
                admin === "Y"
                    ? file === "Y"
                        ? Instance_admin_file_multi.post(url, data)
                        : Instance_admin_multi.post(url, data)
                    : file === "Y"
                    ? Instance_multi_file.post(url, data)
                    : Instance_multi.post(url, data);
            return retMultiPost;

        case "put_multi":
            const retMultiPut =
                admin === "Y"
                    ? Instance_admin_multi.put(url, data)
                    : Instance_multi.put(url, data);
            return retMultiPut;

        default:
            break;
    }
};

// --에러처리--
// 파라미터:
// error - error객체
// dispatch - useDispatch()
// alert - useAlert()
const CommonErrorCatch = async (
    error,
    setIsSpinner,
    alert,
    resetUserInfoAdmin,
    resetUserTokenAdmin,
) => {
    // 오류발생시 실행
    CommonConsole("log", error);

    if (error.response) {
        if (
            error.response.status === errorCode.timeOut || // 타임아웃 - 500
            error.response.status === errorCode.timeOut2 // 타임아웃 - 503
        ) {
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: "잠시 후 다시 시도해주세요",
            });
        }
        // 비정상접근 or 비정상토큰
        else if (
            // error.response.headers.resultCode === errorCode.abnormalApproach || // 비정상 접근 - "9995"
            // error.response.headers.resultCode === errorCode.emptyToken || // 토큰이 없음 - "2000"
            // error.response.headers.resultCode === errorCode.tokenExpired || // 토큰 만료 - "2001"
            // error.response.headers.resultCode === errorCode.tokenTamperWith || // 올바른 토큰 아닐 시 - "2002"
            // error.response.headers.resultCode === errorCode.invalidToken // 올바른 토큰 아닐 시 - "2003"
            error.response.status === errorCode.unauthorized
        ) {
            tokenExpire(
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfoAdmin,
                resetUserTokenAdmin,
            );
        }
        // 에러
        else {
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.resultmessageen,
            });
        }
    } else {
        setIsSpinner(true);
    }

    // TODO: 타임아웃 전역 사용 가능하도록
    const timeOut = restTimeOut;

    // 타임아웃 (axios 타임아웃 걸릴경우)
    if (error.message === `timeout of ${timeOut}ms exceeded`) {
        setIsSpinner(false);

        CommonNotify({
            type: "alert",
            hook: alert,
            message: "잠시 후 다시 시도해주세요",
        });
    }
};

const CommonRestAPI = async (restParams = {}) => {
    // const dispatch = restParams.err.dispatch;
    const setIsSpinner = restParams.err.setIsSpinner;
    const alert = restParams.err.alert ? restParams.err.alert : "";
    const resetUserInfoAdmin = restParams.err.resetUserInfoAdmin;
    const resetUserTokenAdmin = restParams.err.resetUserTokenAdmin;

    const method = restParams.method;
    const url = restParams.url;
    const data = restParams.data;
    const admin = restParams.admin;
    const file = restParams.file;

    await RestServer(method, url, data, admin, file)
        .then((response) => {
            restParams.callback(response);
        })
        .catch((error) => {
            CommonErrorCatch(
                error,
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfoAdmin,
                resetUserTokenAdmin,
            );
        });
};

export { RestServer, CommonRestAPI };
