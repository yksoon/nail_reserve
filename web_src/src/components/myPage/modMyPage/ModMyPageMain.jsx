import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    isModUserAtom,
    isSpinnerAtom,
    modUserAtom,
    userInfoAtom,
    userTokenAtom,
} from "recoils/atoms";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useNavigate } from "react-router";

const ModMyPageMain = () => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);
    const setIsModUser = useSetRecoilState(isModUserAtom);
    const setUserToken = useSetRecoilState(userTokenAtom);

    const setModUser = useSetRecoilState(modUserAtom);

    const navigate = useNavigate();

    const userInfo = useRecoilValue(userInfoAtom);
    const userToken = useRecoilValue(userTokenAtom);

    const inputPw = useRef(null);

    useEffect(() => {
        // 비밀번호 인증 안했을경우 다시 페이지 이동
        if (!userToken) {
            navigate(routerPath.main_url);
        }
    }, []);
    const signIn = () => {
        if (!inputPw.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "비밀번호를 입력해주세요",
            });

            inputPw.current.focus();
            return false;
        }

        doSignin();
    };

    const doSignin = () => {
        setIsSpinner(true);

        const url = apiPath.api_login;

        const data = {
            signup_type: "000",
            user_id: userInfo.user_id,
            user_pwd: inputPw.current.value,
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            let result_code = res.headers.result_code;

            if (result_code === successCode.success) {
                setIsSpinner(false);

                setUserToken(res.data.result_info.token);

                setIsModUser(true);

                setModUser(res.data.result_info);
                navigate(routerPath.mod_mypage_user);
            } else if (result_code === "1003") {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "비밀번호를 확인해주세요.",
                });
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            signIn(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    return (
        <>
            <Header />

            <div id="con_area">
                <div className="form modify" id="sign_form">
                    <h3 className="title">회원정보 수정</h3>
                    <div className="modify_form">
                        <h5>비밀번호를 입력해주세요</h5>
                        <input
                            type="password"
                            className="input w370"
                            onKeyDown={handleOnKeyPress}
                            ref={inputPw}
                        />
                    </div>
                </div>
                <div className="btn_box">
                    <Link onClick={signIn} className="mainbtn btn01">
                        다음
                    </Link>
                    <Link to={routerPath.myPage_url} className="mainbtn btn02">
                        뒤로가기
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ModMyPageMain;
