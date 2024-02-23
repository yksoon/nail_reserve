import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userInfoAtom, userTokenAtom } from "recoils/atoms";
import useAlert from "hook/useAlert";
import { successCode } from "common/js/resultCode";
import useConfirm from "hook/useConfirm";
import Sitemap from "components/common/Sitemap";

const Header = forwardRef((props, ref) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();

    // const inputId = useRef(null);
    const inputId = ref ? ref.inputId : useRef(null);
    const inputPw = useRef(null);
    // const inputHomeID = ref

    const navigate = useNavigate();

    const setIsSpinner = useSetRecoilState(isSpinnerAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    const menu_show = () => {
        const nav = document.getElementById("menu");
        const sitemap = document.getElementById("sitemap");
        if (nav.classList.contains("nav_on")) {
            sitemap.style.left = "-200vh";
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("html").style.paddingRight = "0";
            nav.classList.remove("nav_on");
        } else {
            sitemap.style.left = 0;
            document.querySelector("html").style.overflowY = "hidden";
            document.querySelector("html").style.paddingRight = "16px";
            nav.classList.add("nav_on");
        }
    };

    const signIn = () => {
        if (!inputId.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "아이디를 입력해주세요",
                callback: () => inputId.current.focus(),
            });

            return false;
        }
        if (!inputPw.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "비밀번호를 입력해주세요",
                callback: () => inputPw.current.focus(),
            });

            return false;
        }

        doSignin();
    };

    const doSignin = () => {
        setIsSpinner(true);

        const url = apiPath.api_login;

        const data = {
            signup_type: "000",
            user_id: inputId.current.value,
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
                let user_info = res.data.result_info;

                // 블랙리스트
                let deleteKey = [
                    "md_licenses_number",
                    // "signin_policy",
                    // "signin_policy_cd",
                    "user_pwd",
                    "user_role",
                    "user_salt",
                ];

                for (let i = 0; i < deleteKey.length; i++) {
                    delete user_info[deleteKey[i]];
                }

                setUserInfo(user_info);
                setUserToken(user_info.token);

                // sessionStorage.setItem("userInfo", JSON.stringify(user_info));
                // dispatch(set_user_info(JSON.stringify(user_info)));

                // dispatch(set_user_token(JSON.stringify(user_info)));
                // setUserToken(user_info.token);

                setIsSpinner(false);

                navigate(routerPath.main_url);
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

    const signout = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "로그아웃 하시겠습니까?",
            callback: () => doSignOut(),
        });

        const doSignOut = () => {
            setIsSpinner(true);

            const url = apiPath.api_signout;
            let data = {};

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
                    setUserInfo({});
                    setUserToken("");

                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "로그아웃 되었습니다.",
                        callback: () => navigate(routerPath.main_url),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: res.headers.result_message_ko,
                    });

                    setUserInfo({});
                    setUserToken("");
                }
            };
        };
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            signIn(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    // 로그인 필요
    const needToken = (url) => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스입니다.",
                callback: () => inputId.current.focus(),
            });
        } else {
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("html").style.paddingRight = "0";
            // hotelIdx 변수를 올바르게 사용하도록 수정
            navigate(url);
        }
    };

    // const adminUserRole = ["000", "100", "110", "120", "130", "140", "150"];

    return (
        <>
            <header>
                <div className="header_content">
                    <h1 className="logo">
                        <Link to={routerPath.main_url}>
                            <img src="/img/common/logo.png" alt="" />
                        </Link>
                    </h1>
                    <div className="flex">
                        <div className="login">
                            {!userToken ? (
                                <>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            placeholder="ID"
                                            className="login"
                                            onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
                                            ref={inputId}
                                        />
                                        <input
                                            type="password"
                                            placeholder="PASSWORD"
                                            className="login"
                                            onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
                                            ref={inputPw}
                                        />

                                        <Link
                                            className="login"
                                            id="header_login"
                                            onClick={signIn}
                                        >
                                            LOGIN
                                        </Link>

                                        <Link
                                            to={routerPath.signup_url}
                                            className="login"
                                        >
                                            SIGN UP
                                        </Link>
                                    </div>
                                    {/* <Link to={"/mobile_test"}>!</Link> */}
                                    <Link
                                        to={routerPath.findId_url}
                                        className="font-12"
                                    >
                                        로그인에 문제가 발생하였나요?
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex profile">
                                        <div>
                                            <h5>
                                                <img
                                                    src={`/img/common/role_${userInfo.user_role_cd}.png`}
                                                    alt=""
                                                />
                                                {`${userInfo.user_name_first_ko}${userInfo.user_name_last_ko}`}
                                                님
                                            </h5>
                                            <Link
                                                className="font-12"
                                                id="header_logout"
                                                onClick={signout}
                                            >
                                                로그아웃
                                            </Link>
                                            <Link
                                                to={routerPath.mod_mypage}
                                                className="font-12"
                                            >
                                                회원정보수정
                                            </Link>
                                            <Link
                                                to={routerPath.myPage_url}
                                                className="font-12"
                                            >
                                                마이페이지
                                            </Link>
                                        </div>
                                        {/*<Link*/}
                                        {/*    to={routerPath.myPage_url}*/}
                                        {/*    className="profile_img_wrap"*/}
                                        {/*>*/}
                                        {/*    <span className="profile_img">*/}
                                        {/*        <img*/}
                                        {/*            src="img/common/profile01.png"*/}
                                        {/*            alt=""*/}
                                        {/*        />*/}
                                        {/*    </span>*/}
                                        {/*    <div*/}
                                        {/*        id="gradeLabel"*/}
                                        {/*        className="grade"*/}
                                        {/*        name="gold"*/}
                                        {/*    >*/}
                                        {/*        <img*/}
                                        {/*            src="img/common/grade_gold.png"*/}
                                        {/*            alt=""*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</Link>*/}
                                    </div>
                                </>
                            )}
                        </div>

                        <nav id="menu" onClick={menu_show}>
                            <div className="menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </nav>
                        {/*sitemap//S*/}
                        <Sitemap
                        // needToken={needToken}
                        />
                        {/*sitemap//E*/}
                        <Link to={routerPath.main_url} className="home">
                            <img src="/img/common/header_home.png" alt="" />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
});

export default Header;
