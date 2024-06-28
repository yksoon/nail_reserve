import { routerPath } from "webPath";
import { RestServer } from "src/etc/lib/Rest";
import { CommonConsole, CommonNotify } from "etc/lib/Common";
import { successCode } from "etc/lib/resultCode";

export default function Login(
    url,
    data,
    resultCode,
    // dispatch,
    setIsSpinner,
    alert,
    setUserInfo,
    setUserToken,
) {
    RestServer("post", url, data)
        .then(function (response) {
            // response
            let userInfo;

            let resultCode = response.headers.resultCode;

            if (resultCode === successCode.success) {
                userInfo = response.data.resultInfo;

                // 블랙리스트 (추가한것은 제외)
                let deleteKey = [
                    "mdLicensesNumber",
                    "signinPolicy",
                    "signinPolicyCd",
                    "userIdx",
                    "userPwd",
                    "userRole",
                    "userRoleCd",
                    "userSalt",
                ];

                for (let i = 0; i < deleteKey.length; i++) {
                    delete userInfo[deleteKey[i]];
                }

                // user_info
                // dispatch(set_user_info(JSON.stringify(user_info)));
                setUserInfo(userInfo);

                // user_token
                // dispatch(set_user_token(JSON.stringify(user_info)));
                setUserToken(userInfo.token);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);

                window.location.replace(routerPath.web_main_url);
            } else if (resultcode === "1003") {
                CommonConsole("log", response);

                CommonConsole("decLog", response);
                // CommonConsole("alertMsg", response);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: response.headers.resultmessageko,
                });

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);
            }
        })
        .catch(function (error) {
            // 오류발생시 실행
            CommonConsole("decLog", error);
            // CommonConsole("alertMsg", error);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.resultmessageko
                    ? error.response.headers.resultmessageko
                    : "잠시 후 다시 시도해주세요.",
            });

            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );
            setIsSpinner(false);
        });
}
