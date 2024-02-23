import React, { useState, useEffect, forwardRef } from "react";
import { apiPath } from "webPath";
import { RestServer } from "common/js/Rest";
import { CommonConsole, CommonErrModule, CommonRest } from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

const IdComponent = forwardRef((props, ref) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const { accountType, signupInputID } = ref;
    const idStatus = props.idStatus;

    // 0000 = 성공
    // 1000 = 중복
    // 400 = 형식 안맞음
    const [idchkCode, setIdchkCode] = useState("0");

    const idDuplicateCheck = (e) => {
        const user_chk_url = apiPath.api_user_check;
        const data = {
            signup_type: `${accountType.current.value}`,
            user_id: `${signupInputID.current.value}`,
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: user_chk_url,
            data: data,
            err: err,
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                setIdchkCode("0000");
                idStatus(true);
            } else if (res.headers.result_code === successCode.duplication) {
                setIdchkCode("1000");
                idStatus(false);
            }
        };

        // RestServer("post", user_chk_url, data)
        //     .then((response) => {
        //         let res = response;

        //         if (res.headers.result_code === successCode.success) {
        //             setIdchkCode("0000");
        //             idStatus(true);
        //         } else if (
        //             res.headers.result_code === successCode.duplication
        //         ) {
        //             setIdchkCode("1000");
        //             idStatus(false);
        //         }
        //     })
        //     .catch((error) => {
        //         CommonConsole("log", error);
        //         CommonConsole("decLog", error);

        //         setIdchkCode("400");
        //         idStatus(false);
        //     });
    };

    return (
        <>
            <h5>
                아이디 <span className="red">*</span>
            </h5>
            <div className="flex">
                <div>
                    <input type="hidden" ref={accountType} value="000" />
                    <input
                        type="email"
                        className="input w600"
                        onKeyUp={idDuplicateCheck}
                        ref={signupInputID}
                    />
                </div>
                {idchkCode === "0000" ? (
                    <p className="mark green" id="mark_id">
                        사용 가능한 아이디 입니다
                    </p>
                ) : idchkCode === "400" ? (
                    <p className="mark red" id="mark_id">
                        아이디는 이메일 형식으로 입력하세요
                    </p>
                ) : idchkCode === "1000" ? (
                    <p className="mark red" id="mark_id">
                        이미 사용중인 아이디입니다
                    </p>
                ) : (
                    <p className="mark red" id="mark_id">
                        아이디는 이메일 형식으로 입력하세요
                    </p>
                )}
            </div>
        </>
    );
});

export default IdComponent;
