import { React, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Dialog, Modal } from "@mui/material";
import { apiPath, routerPath } from "webPath";
import tokenExpire from "./tokenExpire";
import { RestServer } from "./Rest";
import useAlert from "hook/useAlert";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userInfoAtom, userTokenAtom } from "recoils/atoms";
import { errorCode } from "./resultCode";
import ReserveRoomDetailModal from "components/hotel/reserve/modal/ReserveRoomDetailModal";
import HotelDetailRoomsModal from "components/hotel/detail/components/HotelDetailRoomsModal";
import TermsModal from "components/signUp/signupComponents/TermsModal";
import HotelDetailModal from "components/hotel/detail/modal/HotelDetailModal";
import ReserveGuestDetailTermsModal from "components/hotel/reserve/modal/ReserveGuestDetailTermsModal";
import ReserveDetailModal from "components/myPage/myPage/reserve/modal/ReserveDetailModal";
import TermsModalMain from "components/common/TermsModalMain";

// Alert (props)
// isOpen = state 상태값
// title = 제목
// content = 내용
// btn = 확인버튼
// closeModal = 닫기 (state를 변경할 수 있는 handler)
// data
const CommonModal = (props) => {
    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        handleModalClose: props.handleModalClose,
        width: props.width,
        noLine: props.noLine ?? "",
    };

    const component = props.component;

    const handleNeedUpdate = props.handleNeedUpdate
        ? props.handleNeedUpdate
        : null;

    const handleNeedUpdateComment = props.handleNeedUpdateComment
        ? props.handleNeedUpdateComment
        : null;

    // 모달 컴포넌트 렌더
    const renderComponent = (component) => {
        switch (component) {
            // case "RegUserModalMain":
            //     return (
            //         <RegUserModalMain
            //             handleNeedUpdate={handleNeedUpdate}
            //             handleModalClose={modalOption.handleModalClose}
            //             modUserData={props.modUserData}
            //         />
            //     );

            // 상담문의
            // case "ConsultingBoardModalMain":
            //     return (
            //         <ConsultingBoardModalMain
            //             handleNeedUpdate={handleNeedUpdate}
            //             handleNeedUpdateComment={handleNeedUpdateComment}
            //             handleModalClose={modalOption.handleModalClose}
            //             modData={props.modData}
            //         />
            //     );

            case "TermsModal":
                return (
                    <TermsModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            case "ReserveRoomDetailModal":
                return (
                    <ReserveRoomDetailModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            case "HotelDetailRoomsModal":
                return (
                    <HotelDetailRoomsModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            case "HotelDetailModal":
                return (
                    <HotelDetailModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            case "ReserveGuestDetailTermsModal":
                return (
                    <ReserveGuestDetailTermsModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            case "ReserveDetailModal":
                return (
                    <ReserveDetailModal
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                        handleNeedUpdate={handleNeedUpdate}
                    />
                );

            case "TermsModalMain":
                return (
                    <TermsModalMain
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData ?? {}}
                    />
                );

            default:
                return;
        }
    };
    return (
        <>
            <Modal
                open={modalOption.isOpen}
                onClose={modalOption.handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal_wrap" id="modal_wrap">
                    <div className={`modal w${modalOption.width}`}>
                        <div
                            className="modal_content form hotel"
                            id="hotelInsert"
                        >
                            <div
                                className={modalOption.noLine ? "" : "mo_title"}
                            >
                                <h4>{modalOption.title}</h4>
                                <div
                                    className="modal_close"
                                    onClick={modalOption.handleModalClose}
                                >
                                    <img
                                        src="img/common/modal_close.png"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* 모달 컨텐츠 드가자 */}

                            {renderComponent(component)}

                            {/* 모달 컨텐츠 드가자 END */}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

// Alert (props)
// isOpen = state 상태값
// title = 제목
// content = 내용
// btn = 확인버튼
// closeModal = 닫기 (state를 변경할 수 있는 handler)
const CommonModalChild = (props) => {
    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        handleModalClose: props.handleModalClose,
        width: props.width,
    };

    const component = props.component;

    const handleNeedUpdate = props.handleNeedUpdate
        ? props.handleNeedUpdate
        : null;

    // 미리보기 데이터
    const previewData = props.previewData;

    // 모달 컴포넌트 렌더
    const renderComponent = (component) => {
        switch (component) {
            // case "HotelPreview":
            //     return (
            //         <HotelPreview
            //             handleNeedUpdate={handleNeedUpdate}
            //             handleModalClose={modalOption.handleModalClose}
            //             previewData={previewData}
            //         />
            //     );

            default:
                return;
        }
    };
    return (
        <>
            <Modal
                open={modalOption.isOpen}
                onClose={modalOption.handleModalClose}
                aria-labelledby="modal2-modal2-title"
                aria-describedby="modal2-modal2-description"
            >
                <div className="modal_wrap" id="modal_wrap">
                    <div
                        className={`modal w${modalOption.width}`}
                        style={{ zIndex: 11 }}
                    >
                        <div
                            className="modal_content form hotel"
                            id="hotelInsert"
                        >
                            <div className="mo_title">
                                <h4>{modalOption.title}</h4>
                                <div
                                    className="modal_close"
                                    onClick={modalOption.handleModalClose}
                                >
                                    <img
                                        src="img/common/modal_close.png"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* 모달 컨텐츠 드가자 */}

                            {renderComponent(component)}

                            {/* 모달 컨텐츠 드가자 END */}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

// 디버깅용 콘솔
const CommonConsole = (type, responseData) => {
    let response;

    let result_message_ko;
    let result_message_en;
    let result_code;
    let message;

    if (!responseData.response) {
        response = responseData;
    } else {
        response = responseData.response;
    }

    if (response.headers) {
        result_message_ko = response.headers.result_message_ko;
        result_message_en = response.headers.result_message_en;
        result_code = response.headers.result_code;
        message = response.headers.message;
    } else {
        response = responseData;
    }

    switch (type) {
        case "log":
            return console.log(responseData);

        case "decLog":
            return console.log(
                decodeURI(result_message_ko),
                decodeURI(result_message_en),
                decodeURI(result_code),
                decodeURI(message),
            );

        case "alertMsg":
            return alert(decodeURI(result_message_ko).replace("%20", " "));

        case "alert":
            return alert(responseData);

        default:
            break;
    }
};

// 스피너
const CommonSpinner = (props) => {
    const spinner = useRef();

    const isLoading = props.option.isLoading;
    const alertMsg = props.option.alert ? props.option.alert : "";
    const error = props.option.error ? props.option.error : "";

    useEffect(() => {
        if (error === "Y") {
            if (!alertMsg) {
                let spnin = spinner.current.childNodes[0];
                spnin.classList.add("error");
            } else {
                alert(decodeURI(alertMsg).replace("%20", " "));
            }
        }
    }, [props]);

    return (
        <>
            {isLoading && (
                <div className="spinner" ref={spinner}>
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

const CommonSpinner2 = (props) => {
    return (
        <>
            <div className="spinner">
                <CircularProgress />
            </div>
        </>
    );
};

const CommonErrorCatch = (
    error,
    setIsSpinner,
    alert,
    resetUserInfo,
    resetUserToken,
) => {
    // 오류발생시 실행
    CommonConsole("log", error);

    if (error.response) {
        if (
            error.response.status === errorCode.timeOut || // 타임아웃 - 500
            error.response.status === errorCode.timeOut2 // 타임아웃 - 503
        ) {
            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );

            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: "잠시 후 다시 시도해주세요",
            });
        }
        // 비정상접근 or 비정상토큰
        else if (
            error.response.headers.result_code === errorCode.abnormalApproach || // 비정상 접근 - "9995"
            error.response.headers.result_code === errorCode.emptyToken || // 토큰이 없음 - "2000"
            error.response.headers.result_code === errorCode.tokenExpired || // 토큰 만료 - "2001"
            error.response.headers.result_code === errorCode.tokenTamperWith || // 올바른 토큰 아닐 시 - "2002"
            error.response.headers.result_code === errorCode.invalidToken // 올바른 토큰 아닐 시 - "2003"
        ) {
            tokenExpire(
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfo,
                resetUserToken,
            );
        } else if (
            error.request.responseURL.indexOf(apiPath.api_user_cert) === 0 ||
            error.request.responseURL.indexOf(apiPath.api_user_check) === 0
        ) {
            return false;
        }
        // 에러
        else {
            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.result_message_ko
                    ? error.response.headers.result_message_ko
                    : "잠시 후 다시 시도해주세요",
            });
        }
    }
    // 타임아웃
    const timeOut = 20000;
    if (error.message === `timeout of ${timeOut}ms exceeded`) {
        // dispatch(
        //     set_spinner({
        //         isLoading: false,
        //     })
        // );
        setIsSpinner(false);

        CommonNotify({
            type: "alert",
            hook: alert,
            message: "잠시 후 다시 시도해주세요",
        });
    }
};

// 알림창
const CommonNotify = async (option) => {
    const type = option.type;
    const hook = option.hook;
    const message = option.message;
    const callback = option.callback ? option.callback : null;

    switch (type) {
        case "confirm":
            const resultConfirm = await hook({
                message: message,
                buttons: {
                    ok: "확인",
                    cancel: "취소",
                },
            });

            if (resultConfirm) {
                if (callback) {
                    const type = typeof callback;

                    if (type === "function") {
                        callback();
                    }
                }
            }

            break;

        case "alert":
            const resultAlert = await hook({
                message: message,
                buttons: {
                    ok: "확인",
                    cancel: "취소",
                },
            });

            if (resultAlert) {
                if (callback) {
                    const type = typeof callback;

                    if (type === "function") {
                        callback();
                    }
                }
            }

            break;
        default:
            break;
    }
};

// 공용 REST
/* 
-- restParams --
dispatch : useDispatch
alert : useAlert
method : "post", "get", "delete", "put", "post_multi", "put_multi"
url : ""
data : {}
callback : callback()
admin: ""
*/
const CommonRest = (restParams = {}) => {
    // const dispatch = restParams.err.dispatch;
    const setIsSpinner = restParams.err.setIsSpinner;
    const alert = restParams.err.alert ? restParams.err.alert : "";
    const resetUserInfo = restParams.err.resetUserInfo;
    const resetUserToken = restParams.err.resetUserToken;

    const method = restParams.method;
    const url = restParams.url;
    const data = restParams.data;
    const admin = restParams.admin;

    RestServer(method, url, data, admin)
        .then((response) => {
            restParams.callback(response);
        })
        .catch((error) => {
            CommonErrorCatch(
                error,
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfo,
                resetUserToken,
            );

            // console.log(restParams);

            // restParams.errCallback(error);
            // console.log(error);
            // func(error);
        });
};

const CommonErrModule = () => {
    const { alert } = useAlert();
    // const { confirm } = useConfirm();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);
    const resetUserInfo = useResetRecoilState(userInfoAtom);
    const resetUserToken = useResetRecoilState(userTokenAtom);
    const err = {
        setIsSpinner,
        alert,
        resetUserInfo,
        resetUserToken,
    };

    return err;
};

/**
 * 숫자 세자리 콤마
 * @param str
 * @param digit
 * @returns {string}
 * @constructor
 */
const CommonCommaPattern = (str, digit) => {
    const pattern_3 = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const pattern_4 = /\B(?<!\.\d*)(?=(\d{4})+(?!\d))/g;

    let returnValue = "";

    if (digit === 3) {
        returnValue = str.toString().replace(pattern_3, ",");
    } else if (digit === 4) {
        returnValue = str.toString().replace(pattern_4, ",");
    } else {
        returnValue = str.toString().replace(pattern_3, ",");
    }

    return returnValue;
};

/**
 * 날짜 포맷 변환
 * @param date
 * @param format
 * @returns {*|string}
 * @constructor
 */
const CommonDateFormatter = (date, format) => {
    const inputDate = new Date(date);

    let formattedDate;

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    switch (format) {
        case "YYYY-MM-DD":
            formattedDate = `${year}-${month}-${day}`;

            return formattedDate;

        case "YYYY/MM/DD":
            formattedDate = `${year}/${month}/${day}`;

            return formattedDate;

        case "YYYY.MM.DD":
            formattedDate = `${year}.${month}.${day}`;

            return formattedDate;
        case "ko":
            formattedDate = `${year}년 ${month}월 ${day}일`;

            return formattedDate;

        default:
            return date;
    }
};

const CommonInputNumberPattern = (e) => {
    return e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

const CommonNullCheck = (item) => {
    let result;
    const type = typeof item;

    switch (type) {
        case "object":
            if (item === null) {
                result = false;
            } else if (Object.keys(item).length === 0) {
                result = false;
            } else {
                result = true;
            }
            break;

        case "undefined":
            result = false;
            break;

        case "boolean":
            result = item;
            break;

        default:
            result = true;
            break;
    }

    return result;
};

export {
    CommonModal,
    CommonConsole,
    CommonSpinner,
    CommonErrorCatch,
    CommonNotify,
    CommonRest,
    CommonSpinner2,
    CommonErrModule,
    CommonModalChild,
    CommonCommaPattern,
    CommonDateFormatter,
    CommonInputNumberPattern,
    CommonNullCheck,
};
