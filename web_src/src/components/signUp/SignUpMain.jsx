import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import { RestServer } from "common/js/Rest";

import Header from "components/common/Header";
import Footer from "components/common/Footer";

import IdComponent from "./signupComponents/IdComponent";
import PwComponent from "./signupComponents/PwComponent";
import NameComponent from "./signupComponents/NameComponent";
import MobileComponent from "./signupComponents/MobileComponent";
import LicenseComponent from "./signupComponents/LicenseComponent";
import DepartmentComponent from "./signupComponents/DepartmentComponent";
import TermsComponent from "./signupComponents/TermsComponent";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useRecoilState, useSetRecoilState } from "recoil";
import { certInfoAtom, isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

function SignUpMain() {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const signupRefs = {
        accountType: useRef(null),
        signupInputID: useRef(null),
        signupInputPW: useRef(null),
        user_name_first_ko: useRef(null),
        user_name_last_ko: useRef(null),
        user_name_first_en: useRef(null),
        user_name_last_en: useRef(null),
        md_licenses_number: useRef(null),
        organization_name_ko: useRef(null),
        department_name_ko: useRef(null),
        specialized_name_ko: useRef(null),
        inter_phone_number: useRef(null),
        inputMobile1: useRef(null),
        inputMobile2: useRef(null),
        inputMobile3: useRef(null),
        termsChk: useRef(null),
        privacyChk: useRef(null),
        marketingChk: useRef(null),
        marketing_sms: useRef(null),
        marketing_mail: useRef(null),
    };

    // 사용 가능한 아이디 확인
    const [chkId, setChkId] = useState(false);
    const [chkPw, setChkPw] = useState(false);
    const [chkMobile, setChkMobile] = useState(false);
    const [terms, setTerms] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [marketing, setMarketing] = useState("");

    const [certInfo, setCertInfo] = useRecoilState(certInfoAtom);
    // const certInfo = useSelector((state) => state.certInfo.certInfo);

    const certification_idx = localStorage.getItem("certification_idx");

    const sendSignupForm = () => {
        if (validation()) {
            setIsSpinner(true);

            let birth_yyyy = certInfo.birth_date.slice(0, 4);
            let birth_mm = certInfo.birth_date.slice(4, 6);
            let birth_dd = certInfo.birth_date.slice(-2);
            let gender;
            let certification_tool;

            // nice = 0: 여자, 1: 남자
            if (certInfo.gender === "1") {
                gender = "0";
            } else if (certInfo.gender === "0") {
                gender = "1";
            }

            // auth_type
            // M	휴대폰인증
            // C	카드본인확인
            // X	공동인증서
            // F	금융인증서
            // S	PASS인증서

            // 인증 도구 = 000 : 휴대폰, 100 : 인증서, 200 : 이메일, 900 : 기타등등
            if (certInfo.auth_type === "M") {
                certification_tool = "000";
            } else if (
                certInfo.auth_type === "X" ||
                certInfo.auth_type === "F"
            ) {
                certification_tool = "100";
            } else if (
                certInfo.auth_type === "C" ||
                certInfo.auth_type === "S"
            ) {
                certification_tool = "900";
            }

            let mobile_agency;
            // 통신사
            switch (certInfo.mobile_co) {
                // SK Telecom
                case "1":
                    mobile_agency = "000";
                    break;

                // KT
                case "2":
                    mobile_agency = "100";
                    break;

                // LGU+
                case "3":
                    mobile_agency = "200";
                    break;

                // SK Telecom 알뜰폰
                case "5":
                    mobile_agency = "300";
                    break;

                // KT 알뜰폰
                case "6":
                    mobile_agency = "400";
                    break;

                // LGU+ 알뜰폰
                case "7":
                    mobile_agency = "500";
                    break;

                // 기타
                default:
                    mobile_agency = "900";
                    break;
            }

            let data = {
                user_id: signupRefs.signupInputID.current.value,
                user_pwd: signupRefs.signupInputPW.current.value,
                user_name_first_ko: signupRefs.user_name_first_ko.current.value,
                user_name_last_ko: signupRefs.user_name_last_ko.current.value,
                user_name_first_en: signupRefs.user_name_first_en.current.value,
                user_name_last_en: signupRefs.user_name_last_en.current.value,
                md_licenses_number: signupRefs.md_licenses_number.current.value,
                auth_code: certification_idx,
                inter_phone_number: signupRefs.inter_phone_number.current.value,
                mobile1: signupRefs.inputMobile1.current.value,
                mobile2: signupRefs.inputMobile2.current.value,
                mobile3: signupRefs.inputMobile3.current.value,
                signup_type: signupRefs.accountType.current.value,
                organization_name_ko:
                    signupRefs.organization_name_ko.current.value,
                specialized_name_ko:
                    signupRefs.specialized_name_ko.current.value,
                department_name_ko: signupRefs.department_name_ko.current.value,
                sms_yn: signupRefs.marketing_sms.current.checked ? "Y" : "N",
                email_yn: signupRefs.marketing_mail.current.checked ? "Y" : "N",
                certification_idx: certification_idx,
                birth_yyyy: birth_yyyy,
                birth_mm: birth_mm,
                birth_dd: birth_dd,
                gender: gender,
                user_ci: certInfo.ci,
                user_di: certInfo.di,
                certification_tool: certification_tool,
                certification_type: "000",
                terms_idx: terms_idx_func(),
                mobile_agency: mobile_agency,
            };

            const url = apiPath.api_user;

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
                const result_code = res.headers.result_code;

                if (result_code === successCode.success) {
                    localStorage.removeItem("certification_idx");
                    setCertInfo(null);

                    // dispatch(set_cert_info(null));

                    // Spinner
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

                    setIsSpinner(false);

                    navigate(routerPath.signup_ok_url);
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
        }
    };

    const terms_idx_func = () => {
        let termsIdx = String(terms) + String(privacy) + String(marketing);
        let arr = [...termsIdx];
        let terms_idx = arr.join();

        if (terms_idx.slice(-1) === ",") {
            terms_idx = terms_idx.slice(0, -1);
        }

        return terms_idx;
    };

    const idStatus = (status) => {
        setChkId(status);
    };
    const pwStatus = (status) => {
        setChkPw(status);
    };
    const mobileStatus = (status) => {
        setChkMobile(status);
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

    const validation = () => {
        if (!chkId) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "아이디를 확인해주세요",
            });

            signupRefs.signupInputID.current.focus();

            return false;
        }
        if (!chkPw) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "비밀번호를 확인해주세요",
            });

            signupRefs.signupInputPW.current.focus();

            return false;
        }
        if (
            signupRefs.user_name_first_ko.current.value === "" ||
            signupRefs.user_name_last_ko.current.value === "" ||
            signupRefs.user_name_first_en.current.value === "" ||
            signupRefs.user_name_last_en.current.value === ""
        ) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "성명을 입력해주세요",
            });

            signupRefs.user_name_first_ko.current.focus();

            return false;
        }
        if (!chkMobile) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "휴대폰 인증을 완료해주세요",
            });

            signupRefs.inputMobile2.current.focus();

            return false;
        }
        if (
            signupRefs.user_name_first_ko.current.value +
                signupRefs.user_name_last_ko.current.value !==
            certInfo.name
        ) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "인증하신 정보와 입력한 정보가 일치하지 않습니다",
            });

            signupRefs.user_name_first_ko.current.focus();

            return false;
        }
        if (
            !signupRefs.termsChk.current.checked ||
            !signupRefs.privacyChk.current.checked
        ) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "약관에 동의해주세요",
            });

            signupRefs.termsChk.current.focus();

            return false;
        }
        return true;
    };

    return (
        <>
            <Header />
            <div id="con_area">
                <div className="form sign" id="sign_form">
                    <h3 className="title">회원가입</h3>
                    <div>
                        {/* 아이디 영역 */}
                        <IdComponent ref={signupRefs} idStatus={idStatus} />

                        {/* 패스워드 영역 */}
                        <PwComponent ref={signupRefs} pwStatus={pwStatus} />

                        <div className="flex">
                            {/* 성명 영역 */}
                            <NameComponent ref={signupRefs} />
                        </div>
                        <div className="flex end">
                            {/* 휴대폰 인증 영역 */}
                            <MobileComponent
                                ref={signupRefs}
                                mobileStatus={mobileStatus}
                            />
                        </div>
                        <div>
                            {/* 면허번호 영역 */}
                            <LicenseComponent ref={signupRefs} />
                        </div>
                        <div className="flex">
                            {/* 소속기관, 전공과, 전공분야 영역 */}
                            <DepartmentComponent ref={signupRefs} />
                        </div>
                        <div className="term_wrap">
                            {/* 약관 영역 */}
                            <TermsComponent
                                ref={signupRefs}
                                termChkMain={termChkMain}
                                privacyChkMain={privacyChkMain}
                                marketingChkMain={marketingChkMain}
                                // props = {[termChk, privacyChk, marketingChk]}
                            />
                            <div className="btn_box">
                                <Link
                                    className="mainbtn btn01"
                                    onClick={sendSignupForm}
                                >
                                    가입하기
                                </Link>
                                <Link to="/" className="mainbtn btn02">
                                    뒤로가기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUpMain;
