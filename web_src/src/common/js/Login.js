import { routerPath } from "webPath";
import { RestServer } from "./Rest";
import { set_user_info, set_user_token } from "redux/actions/userInfoAction";
import {
    CommonConsole,
    CommonErrorCatch,
    CommonNotify,
} from "src/common/js/Common";
import { set_spinner } from "redux/actions/commonAction";

export default function Login(url, data, resultCode, dispatch, alert) {
    RestServer("post", url, data)
        .then(function (response) {
            // response
            let user_info;

            let result_code = response.headers.result_code;

            if (result_code === "0000") {
                user_info = response.data.result_info;

                let deleteKey = [
                    "md_licenses_number",
                    "signin_policy",
                    "signin_policy_cd",
                    "user_idx",
                    "user_pwd",
                    "user_role",
                    "user_role_cd",
                    "user_salt",
                ];

                for (let i = 0; i < deleteKey.length; i++) {
                    delete user_info[deleteKey[i]];
                }

                dispatch(set_user_info(JSON.stringify(user_info)));
                dispatch(set_user_token(JSON.stringify(user_info)));

                dispatch(
                    set_spinner({
                        isLoading: false,
                    }),
                );

                window.location.replace(routerPath.main_url);
            } else if (result_code === "1003") {
                CommonConsole("log", response);

                CommonConsole("decLog", response);
                // CommonConsole("alertMsg", response);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: response.headers.result_message_ko,
                });

                dispatch(
                    set_spinner({
                        isLoading: false,
                    }),
                );
            }
        })
        .catch(function (error) {
            // 오류발생시 실행
            CommonErrorCatch(error, dispatch, alert);
        });
}
