import React, { useRef } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

const CreatorMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const refs = {
        subjectKo: useRef(null),
        userNameFirstKo: useRef(null),
        userNameLastKo: useRef(null),
        contentKo: useRef(null),
        inputAttachmentFile: useRef(null),
    };

    const clickRegBoard = () => {
        if (validation()) {
            CommonNotify({
                type: "confirm",
                hook: confirm,
                message: "상담문의를 등록 하시겠습니까?",
                callback: () => regBoard(),
            });
        }
    };

    const regBoard = () => {
        setIsSpinner(true);

        const formData = new FormData();

        let data = {};
        let fileArr = [];
        const url = apiPath.api_board_reg;

        data = {
            showYn: "Y",
            boardType: "400", // 상담문의
            categoryType: "900", // 기타
            subjectKo: refs.subjectKo.current.value,
            userNameFirstKo: refs.userNameFirstKo.current.value,
            userNameLastKo: refs.userNameLastKo.current.value,
            contentKo: refs.contentKo.current.value,
        };

        // 기본 formData append
        for (const key in data) {
            formData.append(key, data[key]);
        }

        // 파일 formData append
        fileArr = Array.from(refs.inputAttachmentFile.current.files);
        let len = fileArr.length;
        for (let i = 0; i < len; i++) {
            formData.append("attachmentFile", fileArr[i]);
        }

        const restParams = {
            method: "post_multi",
            url: url,
            data: formData,
            err: err,
            admin: "Y",
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            let result_code = res.headers.result_code;
            if (result_code === successCode.success) {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "상담 문의 등록이 완료되었습니다.",
                    callback: () => navigate(routerPath.main_url),
                });
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "잠시 후 다시 시도해주세요",
                });
            }
        };
    };

    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref.current.focus();
            };
        };

        if (!refs.subjectKo.current.value) {
            noti(refs.subjectKo, "제목을 입력해주세요");

            return false;
        }

        if (!refs.userNameFirstKo.current.value) {
            noti(refs.userNameFirstKo, "성을 입력해주세요");

            return false;
        }

        if (!refs.userNameLastKo.current.value) {
            noti(refs.userNameLastKo, "이름을 입력해주세요");

            return false;
        }

        if (!refs.contentKo.current.value) {
            noti(refs.contentKo, "내용을 입력해주세요");

            return false;
        }

        return true;
    };

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">
                    <h2 className="subtitle">
                        K-Medi Platform Service
                    </h2>
                    <div className="tax">
                        <div className="tax_info">
                            <div>
                                <h4>
                                    K-MEDI APP Arcitecture
                                </h4>
                                <p>
                                대한민국 의료인들의 우수한 강의, 수술 및 실험 영상들을 의료동영상 플랫폼(K-Medi)에 제공하여 개발도상국 의료진들의 의료 수준 향상을 목적으로 하는 구독형 미디어 서비스입니다.
                                </p>
                                <ul>
                                    <li>콘텐츠발굴 <span>학회, 강의, 수술 등</span></li>
                                    <li>
                                        영상편집
                                        <span>
                                            분야별 편집, 영문화
                                        </span>
                                    </li>
                                    <li>
                                        인니배포
                                        <span>
                                            B2B, B2C 광고 연계
                                        </span>
                                    </li>
                                    <li>크리에이터 Reward<span>조회수 인기도 Reward</span></li>
                                </ul>
                            </div>
                            <div className="img">
                                <img src="/img/sub/kmedi.png" alt="" />
                            </div>
                        </div>
                        {/* <div className="tax_form">
                            <h4>Inquire</h4>
                            <table className="tax_table">
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td>
                                            <input
                                                type="text"
                                                className="input wp100"
                                                placeholder="제목"
                                                ref={refs.subjectKo}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>작성자</th>
                                        <td>
                                            <input
                                                type="text"
                                                className="input input_30"
                                                placeholder="성"
                                                ref={refs.userNameFirstKo}
                                            />
                                            <input
                                                type="text"
                                                className="input input_30"
                                                placeholder="이름"
                                                ref={refs.userNameLastKo}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>문의분야</th>
                                        <td>
                                            세무/회계
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>문의내용</th>
                                        <td>
                                            <textarea
                                                name=""
                                                id=""
                                                placeholder="내용"
                                                ref={refs.contentKo}
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>파일첨부</th>
                                        <td>
                                            <input
                                                type="file"
                                                ref={refs.inputAttachmentFile}
                                                // multiple
                                                // accept="image/*"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn_box">
                                <Link
                                    to=""
                                    className="mainbtn btn01"
                                    onClick={clickRegBoard}
                                >
                                    문의하기
                                </Link>
                                <Link
                                    to={routerPath.main_url}
                                    className="mainbtn btn02"
                                >
                                    뒤로가기
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/*footer//S*/}
            <Footer />
            {/*footer//E*/}
        </>
    );
};

export default CreatorMain;
