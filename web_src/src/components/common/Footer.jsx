import {
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonSpinner2,
    CommonRest,
    CommonConsole,
} from "common/js/Common";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { routerPath, apiPath } from "webPath";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { successCode } from "common/js/resultCode";

const adminPage = import.meta.env.VITE_ADMIN_PAGE;
function Footer() {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    // const isSpinner = useRecoilValue(isSpinnerAtom);
    // const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [isSpinner, setIsSpinner] = useRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    /**
     * modal
     */
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modData, setModData] = useState({});

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const notReady = () => {
        CommonNotify({
            type: "alert",
            hook: alert,
            message: "준비중입니다.",
        });
    };

    const termsOpen = (type) => {
        getBoardList(type);
    };

    const getBoardList = (type) => {
        setIsSpinner(true);

        // /v1/_regs
        // POST
        // 사전등록 목록
        const url = apiPath.api_terms_list;
        const data = {
            page_num: 1,
            page_size: 1,
            search_keyword: "",
            terms_type:
                type === "privacy" ? "000" : type === "term" ? "100" : "000", // 개인정보 취급 방침
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;
                const page_info = res.data.page_info;

                setModData(result_info[0]);
                setModalTitle(
                    type === "privacy"
                        ? "개인 정보 처리 방침"
                        : type === "term"
                        ? "이용 약관"
                        : "",
                );
                setIsOpen(true);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    /**
     * 모달창 닫기
     */
    const handleModalClose = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
    };

    return (
        <>
            <ul className="floating" id="floating">
                <li>
                    <Link
                        to={routerPath.main_url}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "instant" })
                        }
                    >
                        <img src="/img/main/quick14.png" alt="" />
                    </Link>
                </li>
                <li id="top" className="top">
                    <Link onClick={moveTop}>TOP</Link>
                </li>
            </ul>
            <footer>
                <div className="footer_content">
                    <img src="/img/common/logo.png" alt="" />
                    <ul className="sitemap">
                        <li>
                            <Link
                                to="https://medi-city.co.kr/index.php?hCode=INTRO_01_02"
                                target="_blank"
                            >
                                회사소개
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="https://medi-city.co.kr/index.php?hCode=SERVICE_02_01"
                                target="_blank"
                            >
                                서비스 소개
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={routerPath.notice_list}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "instant",
                                    })
                                }
                            >
                                공지사항
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                onClick={() => termsOpen("term")}
                                className="blue"
                            >
                                이용약관
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                onClick={() => termsOpen("privacy")}
                                className="blue"
                            >
                                개인정보처리방침
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={routerPath.customer}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "instant",
                                    })
                                }
                            >
                                고객센터
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={routerPath.partnership}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "instant",
                                    })
                                }
                            >
                                제휴문의
                            </Link>
                        </li>
                    </ul>
                    <address>
                        <Link to={adminPage} target="_blank">
                            법인명:
                        </Link>
                        (주)메디씨티 &nbsp; | &nbsp; 경기도 고양시 일산동구
                        무궁화로 성우사카르타워 43-55, 304호 &nbsp; | &nbsp;
                        대표:박성민 &nbsp; | &nbsp; 사업자등록번호:588-86-02555
                        <br />
                        대표전화 : 031-926-3181 (업무시간 09:00 ~ 18:00 /
                        점심시간 11:30 ~ 13:00) &nbsp; | &nbsp; 이메일 :
                        support@medi-city.co.kr &nbsp; | &nbsp; 제휴문의 :
                        support@medi-city.co.kr
                        <br />
                        통신판매번호:제2023-경기고양-12345호 &nbsp; | &nbsp;
                        개인정보관리책임자 : 이지선 &nbsp; | &nbsp; 메일 :
                        security@medi-city.co.kr
                        <br />
                        Copyright©Medi-City All Rights Reserved.
                    </address>
                </div>
            </footer>
            {/*모달*/}
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"TermsModalMain"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
                // handleProgress={handleProgress}
            />
            {isSpinner && <CommonSpinner2 />}
        </>
    );
}

export default Footer;
