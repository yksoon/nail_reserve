import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
} from "etc/lib/Common";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import $ from "jquery";
import useAlert from "hook/useAlert";
import { successCode } from "etc/lib/resultCode";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    isSpinnerAtom,
    pageAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "etc/lib/recoils/atoms";
import apiPath from "etc/lib/path/apiPath";
import CommonModal from "etc/lib/CommonModalMiddleware";
import {CommonRestAPI} from "etc/lib/CommonRestAPI";
import routerPath from "etc/lib/path/routerPath";

const SideNav = (props) => {
    // const dispatch = useDispatch();
    // const { alert } = useAlert();
    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);
    // const err = { dispatch, alert, resetUserInfoAdmin, resetUserTokenAdmin };

    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modUserData, setModUserData] = useState(null);
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const navigate = useNavigate();

    let userInfoAdmin;
    const switchPage = props.switchPage;

    (() => {
        userInfoAdmin = props.userInfoAdmin;
    })();

    const navList = props.menuList;

    const page = useRecoilValue(pageAtom);

    // console.log($(`#${page}`).parents());

    useEffect(() => {
        // 새로고침 하더라도 현재 메뉴 활성화
        if (page) {
            $(".sub_2depth").hide();
            $(".sub_3depth").hide();

            $(".depth1").removeClass("on");
            $(".depth2").removeClass("on");

            $(`#${page}`).parents("li").children(".depth1").addClass("on");
            $(`#${page}`).parents("li").children(".depth2").addClass("on");
            $(`#${page}`).parents("li").children(".sub_2depth").slideToggle();
            $(`#${page}`).parents("li").children(".sub_3depth").slideToggle();
        }
    }, [navList]);

    // 모달창 닫기
    const handleModalClose = () => {
        setModUserData(null);
        setIsOpen(false);
    };

    // 화면 재 렌더
    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
    };

    // 회원 정보 수정
    const modUser = (user_idx) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        let userIdx = String(user_idx);

        // account/v1/user/info/{user_idx}
        // GET
        const url = apiPath.api_admin_user_info + `/${userIdx}`;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };
        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            let resultCode = res.headers.resultcode;
            let resultInfo = res.data.resultInfo;

            // 성공
            if (resultCode === successCode.success) {
                setIsSpinner(false);

                setModUserData(resultInfo);

                setModalTitle("회원수정");
                setIsOpen(true);
            }
            // 에러
            else {
                CommonConsole("log", res);

                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.resultmessageko,
                });
            }
        };
    };

    // 로그아웃
    const signOut = () => {
        setIsSpinner(true);

        // signout
        // url : /v1/signout
        // method : POST
        const url = apiPath.api_auth_signout;
        let data = {};

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };
        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            // response
            let resultCode = res.headers.resultcode;

            if (resultCode === successCode.success) {
                resetUserInfoAdmin();
                resetUserTokenAdmin();

                setIsSpinner(false);

                navigate(routerPath.admin_signin_url);
            }
        };
    };

    const depth1click = (e) => {
        $(".sub_2depth").hide();
        $(".sub_3depth").hide();

        $(".depth1").removeClass("on");

        if (e.target.nextElementSibling.style.display === "none") {
            e.target.classList.add("on");

            $(e.target).siblings(".sub_2depth").slideToggle();
        } else {
            $(e.target).siblings(".sub_2depth").slideUp();
        }
    };

    const depth2click = (e) => {
        if (e.target.nextElementSibling.style.display === "none") {
            $(".sub_3depth").slideUp();

            $(e.target).siblings(".sub_3depth").slideToggle();
        } else {
            $(e.target).siblings(".sub_3depth").slideUp();
        }
    };

    // 홈페이지 열기
    const openToHomepage = () => {
        window.open(routerPath.web_main_url, "_blank");
    };

    return (
        <>
            <header>
                <div className="gnb">
                    <div className="adm_profile">
                        {/*<Link*/}
                        {/*// onClick={(e) => modUser(userInfoAdmin.user_idx)}*/}
                        {/*>*/}
                        <p>
                            {userInfoAdmin && userInfoAdmin.userNameKo}(
                            {userInfoAdmin && userInfoAdmin.userId})
                        </p>
                        {/*</Link>*/}

                        <div>
                            <Link onClick={signOut} className="font-12">
                                로그아웃
                            </Link>{" "}
                            <Link
                                // to={routerPath.web_main_url}
                                onClick={openToHomepage}
                                className="font-12"
                            >
                                HOMEPAGE
                            </Link>
                        </div>
                    </div>
                    <ul className="sub_gnb">
                        {/* <li id="all_gnb">전체 메뉴 보기</li> */}
                        {navList.map((item1, idx1) => (
                            <li key={`depth1_${idx1}`}>
                                <Link
                                    className="depth1"
                                    onClick={(e) => {
                                        depth1click(e);
                                        item1.page !== "" &&
                                            switchPage(item1.page);
                                    }}
                                    id={item1.page ? item1.page : ""}
                                >
                                    {item1.title}
                                </Link>
                                <ul className="sub_2depth">
                                    {item1.child &&
                                        item1.child.map((item2, idx2) => (
                                            <li key={`depth2_${idx2}`}>
                                                <Link
                                                    onClick={(e) => {
                                                        depth2click(e);
                                                        item2.page !== "" &&
                                                            switchPage(
                                                                item2.page,
                                                            );
                                                    }}
                                                    id={
                                                        item2.page
                                                            ? item2.page
                                                            : ""
                                                    }
                                                >
                                                    {item2.title}{" "}
                                                    {item2.child.length !==
                                                        0 && (
                                                        <img
                                                            src="img/common/arrow_drop.png"
                                                            alt=""
                                                        />
                                                    )}
                                                </Link>
                                                <ul className="sub_3depth">
                                                    {item2.child &&
                                                        item2.child.map(
                                                            (item3, idx3) => (
                                                                <li
                                                                    key={`depth2_${idx3}`}
                                                                >
                                                                    <Link
                                                                        onClick={(
                                                                            e,
                                                                        ) =>
                                                                            item3.page !==
                                                                                "" &&
                                                                            switchPage(
                                                                                item3.page,
                                                                            )
                                                                        }
                                                                        id={
                                                                            item3.page
                                                                                ? item3.page
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {
                                                                            item3.title
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                </ul>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"800"}
                handleModalClose={handleModalClose}
                component={"RegUserModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modUserData={modUserData}
            />
        </>
    );
};

export default SideNav;
