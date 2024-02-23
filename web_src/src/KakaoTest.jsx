import React from "react";
import { Link } from "react-router-dom";
import useAlert from "./hook/useAlert";
import useConfirm from "./hook/useConfirm";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "src/common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "./recoils/atoms";
import { successCode } from "./common/js/resultCode";
import { routerPath } from "./webPath";

// 앱키
// b1e7077c4c917170b5b175d1c06cb357

const KakaoTest = () => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const sendPush = () => {
        const url = "https://bizmsg-web.kakaoenterprise.com/v1/oauth/token";
        const data = {};

        // 파라미터
        const restParams = {
            method: "post_kakao",
            url: url,
            data: data,
            err: err,
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            console.log(res);
            console.log(res);
        };
    };
    return (
        <div>
            <Link to="" onClick={sendPush}>
                푸시전송
            </Link>
        </div>
    );
};

export default KakaoTest;
