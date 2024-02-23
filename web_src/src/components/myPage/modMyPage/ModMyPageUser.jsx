import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    isModUserAtom,
    isSpinnerAtom,
    modUserAtom,
    userInfoAtom,
    userTokenAtom,
} from "recoils/atoms";
import { useLocation, useNavigate } from "react-router";
import Footer from "components/common/Footer";
import IDComponent from "src/components/myPage/modMyPage/modMyPageUserComponents/IDComponent";
import Header from "components/common/Header";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import PWComponent from "components/myPage/modMyPage/modMyPageUserComponents/PWComponent";
import NameComponent from "components/myPage/modMyPage/modMyPageUserComponents/NameComponent";
import { apiPath, routerPath } from "webPath";
import MobileComponent from "components/myPage/modMyPage/modMyPageUserComponents/MobileComponent";
import DepartmentLicenseComponent from "components/myPage/modMyPage/modMyPageUserComponents/DepartmentLicenseComponent";
import { Link } from "react-router-dom";
import TermsComponent from "components/myPage/modMyPage/modMyPageUserComponents/TermsComponent";
import { successCode } from "common/js/resultCode";

const ModMyPageUser = () => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const userInfo = useRecoilValue(modUserAtom);

    const navigate = useNavigate();

    useEffect(() => {
        Object.keys(userInfo).length === 0 && navigate(routerPath.main_url);
    }, [userInfo]);

    const refs = {
        userId: useRef(null),
        userPwd: useRef(null),
        userPwdCheck: useRef(null),
        userNameFirstKo: useRef(null),
        userNameLastKo: useRef(null),
        userNameFirstEn: useRef(null),
        userNameLastEn: useRef(null),
        interPhoneNumber: useRef(null),
        mobile1: useRef(null),
        mobile2: useRef(null),
        mobile3: useRef(null),
        mdLicensesNumber: useRef(null),
        organizationNameKo: useRef(null),
        departmentNameKo: useRef(null),
        specializedNameKo: useRef(null),
        marketing_sms: useRef(null),
        marketing_mail: useRef(null),
    };

    const [chkPw, setChkPw] = useState(false);
    const [terms, setTerms] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [marketing, setMarketing] = useState("");
    // const [mdLicensesNumber, setMdLicensesNumber] = useState("");
    // const [isMod, setIsMod] = useState(false);

    // 비밀번호 상태 확인
    const pwStatus = (status) => {
        setChkPw(status);
    };

    const termChkMain = (status) => {
        setTerms(status);
    };
    const privacyChkMain = (status) => {
        setPrivacy(status);
    };
    const marketingChkMain = (status) => {
        setMarketing(status);
    };

    const terms_idx_func = () => {
        let arr = [];

        terms && arr.push(terms);
        privacy && arr.push(privacy);
        marketing && arr.push(marketing);

        let terms_idx = arr.join();

        // if (terms_idx.slice(-1) === ",") {
        //     terms_idx = terms_idx.slice(0, -1);
        // }

        return terms_idx;
    };

    const clickModUser = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "회원정보를 수정하시겠습니까?",
            callback: () => modUser(),
        });
    };

    const modUser = () => {
        setIsSpinner(true);

        const url = apiPath.api_user;

        const data = {
            signup_type: userInfo.signup_type_cd,
            user_name_first_ko: userInfo.user_name_first_ko,
            user_name_last_ko: userInfo.user_name_last_ko,
            user_name_first_en: userInfo.user_name_first_en,
            user_name_last_en: userInfo.user_name_last_en,
            inter_phone_number: userInfo.inter_phone_number,
            user_role: userInfo.user_role_cd,
            user_status: userInfo.user_status_cd,
            user_idx: userInfo.user_idx,
            user_id: userInfo.user_id,

            user_pwd: refs.userPwd.current.value,
            organization_name_ko: refs.organizationNameKo.current.value,
            department_name_ko: refs.departmentNameKo.current.value,
            specialized_name_ko: refs.specializedNameKo.current.value,
            mobile1: refs.mobile1.current.value,
            mobile2: refs.mobile2.current.value,
            mobile3: refs.mobile3.current.value,
            sms_yn: refs.marketing_sms.current.checked ? "Y" : "N",
            email_yn: refs.marketing_mail.current.checked ? "Y" : "N",
            terms_idx: terms_idx_func(),
        };

        // 파라미터
        const restParams = {
            method: "put",
            url: url,
            data: data,
            err: err,
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            const result_code = res.headers.result_code;

            if (result_code === successCode.success) {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "회원 정보 수정이 정상처리 되었습니다.",
                    callback: () => navigate(routerPath.myPage_url),
                });
            } else {
                CommonConsole("log", res);

                // alert
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });

                // Spinner
                setIsSpinner(false);
            }
        };
    };

    return (
        <>
            {Object.keys(userInfo).length !== 0 && (
                <>
                    <Header />

                    <div id="con_area">
                        <div className="form sign" id="sign_form">
                            <h3 className="title">회원정보수정</h3>
                            <div>
                                {/*아이디*/}
                                <IDComponent userInfo={userInfo} ref={refs} />

                                <PWComponent
                                    userInfo={userInfo}
                                    ref={refs}
                                    pwStatus={pwStatus}
                                />

                                <NameComponent userInfo={userInfo} ref={refs} />

                                <MobileComponent
                                    userInfo={userInfo}
                                    ref={refs}
                                />

                                <DepartmentLicenseComponent
                                    userInfo={userInfo}
                                    ref={refs}
                                />

                                <div className="term_wrap">
                                    {/* 약관 영역 */}
                                    <TermsComponent
                                        userInfo={userInfo}
                                        ref={refs}
                                        termChkMain={termChkMain}
                                        privacyChkMain={privacyChkMain}
                                        marketingChkMain={marketingChkMain}
                                        // props = {[termChk, privacyChk, marketingChk]}
                                    />
                                </div>
                            </div>
                            <div className="btn_box">
                                <Link
                                    // href="mypage_modify_step3.html"
                                    to=""
                                    className="mainbtn btn01"
                                    onClick={clickModUser}
                                >
                                    수정하기
                                </Link>
                                <Link
                                    to={routerPath.myPage_url}
                                    className="mainbtn btn02"
                                >
                                    뒤로가기
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </>
            )}
        </>
    );
};

export default ModMyPageUser;
