import { CommonConsole, CommonNotify } from "etc/lib/Common";
import { successCode } from "etc/lib/resultCode";
import apiPath from "etc/lib/path/apiPath";
import routerPath from "etc/lib/path/routerPath";
import { RestServer } from "etc/lib/CommonRestAPI";

const tokenExpire = (
    // dispatch,
    setIsSpinner,
    alert,
    resetUserInfoAdmin,
    resetUserTokenAdmin,
) => {
    // dispatch(
    //     set_spinner({
    //         isLoading: true,
    //     })
    // );
    setIsSpinner(true);

    // CommonNotify({
    //     type: "alert",
    //     hook: alert,
    //     message: "잠시후 다시 시도해주세요",
    // });

    // signout
    // url : /v1/signout
    // method : POST
    const url = apiPath.api_auth_signout;
    let data = {};

    RestServer("post", url, data)
        .then(function (response) {
            // response
            let result_code = response.headers.resultcode;

            if (result_code === successCode.success) {
                // localStorage.removeItem("userInfo");
                // dispatch(set_user_info(null));
                // dispatch(init_user_info_admin(null));

                resetUserInfoAdmin();

                resetUserTokenAdmin();

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);

                window.location.replace(routerPath.admin_signin_url);
            }
        })
        .catch(function (error) {
            // 오류발생시 실행
            CommonConsole("log", error);
            CommonConsole("decLog", error);
            // CommonConsole("alertMsg", error);

            // dispatch(init_user_info_admin(null));

            resetUserInfoAdmin();

            resetUserTokenAdmin();
            // Spinner
            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.resultmessageko,
                callback: () => goToSignIn(),
            });

            const goToSignIn = () => {
                window.location.replace(routerPath.admin_signin_url);
            };
        });
};

export default tokenExpire;
