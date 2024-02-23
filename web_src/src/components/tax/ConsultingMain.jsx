import React, { useEffect, useRef } from "react";
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

const ConsultingMain = () => {
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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, []);

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
                        Tax / Accounting Consulting Service
                    </h2>
                    <div className="tax">
                        <div className="tax_info">
                            <div>
                                <h4>
                                    개원의 대상 맞춤 전용 세무 회계 컨설팅
                                    서비스
                                </h4>
                                <p>
                                    국가는 재정의 수요를 충당할 재원으로 소득,
                                    재산, 소비를 과세대상으로 하여 그 귀속자에게
                                    세금을 부담하도록 하고 있습니다.<br></br>
                                    사업자의 모든 거래는 세금에 직·간접적으로
                                    영향을 미치고 있기에 부담해야 하는 세금을
                                    최소화하기 위해서 (주)메디씨티 제휴사인
                                    스마트 세무회계에서는 보다 정확하고 신속한
                                    세무·회계 1:1상담을 제공합니다.
                                </p>
                                <ul>
                                    <li>사전 세무컨설팅 (Tax Planning)</li>
                                    <li>
                                        신고납부세목 신고대행
                                        <span>
                                            (법인세, 소득세, 부가가치세 등)
                                        </span>
                                    </li>
                                    <li>
                                        조세불복대행
                                        <span>
                                            (이의신청, 심사청구, 심판청구)
                                        </span>
                                    </li>
                                    <li>세무조사지원</li>
                                </ul>
                            </div>
                            <div className="img">
                                <img src="/img/sub/tax.png" alt="" />
                            </div>
                        </div>
                        <div className="tax_partner">
                            <h4>Partners</h4>
                            <ul>
                                <li>
                                    <img src="/img/sub/tax_logo.png" alt="" />
                                </li>
                            </ul>
                        </div>
                        <div className="tax_form">
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
                                        <td>세무/회계</td>
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
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "instant",
                                        })
                                    }
                                    className="mainbtn btn02"
                                >
                                    뒤로가기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*footer//S*/}
            <Footer />
            {/*footer//E*/}
        </>
    );
};

export default ConsultingMain;
