import React, { useEffect, useState } from "react";
import { CommonErrModule } from "etc/lib/Common";
import { successCode } from "etc/lib/resultCode";
import apiPath from "etc/lib/path/apiPath";
import {CommonRestAPI} from "etc/lib/CommonRestAPI";

// ------------------- import End --------------------

const MainPopupModal = ({popupIdx, onClose, width, height, top, left, scrollbars, windowSize}) => {
    const [popupInfo, setPopupInfo] = useState({});
    const [isMobile, setIsMobile] = useState(windowSize < 768);
    const [popupWrapStyle, setPopupWrapStyle] = useState({});
    const [popupContentStyle, setPopupContentStyle] = useState({});

    const handleClose = () => {
        onClose(); // 부모 컴포넌트에서 전달된 닫기 함수 호출
    };

    const err = CommonErrModule();

    const fileBaseUrl = apiPath.api_file;

    // 브라우저의 창 크기를 기반으로 모바일 여부를 확인
    const handleResize = () => {
        setIsMobile(windowSize < 768); // 예시로 768px 미만을 모바일로 간주
        setPopupWrapStyle({
            width: isMobile ? '90%' : 'auto',
            position: 'absolute',
            top: isMobile ? 100 : (top ? top : 0),
            left: isMobile ? '5%' : (left ? left : 0),
        })
        setPopupContentStyle({
            width: isMobile ? '100%' : (width ? width : 300),
            height: isMobile ? 'auto' : (height ? height : 500),
            overflow: isMobile ? "auto" : (scrollbars === "Y" ? "auto" : "hidden")
        })
    };

    useEffect(() => {
        getPopupDetail(popupIdx);
    }, []);
    
    useEffect(() => {
        handleResize();
    }, [windowSize])

    const mobileImgStyle = {
        width: '100%',
        height: 'auto',
    }

    // 팝업 정보 상세
    const getPopupDetail = (popup_idx) => {
        // /v1/_popup/{popup_idx}
        // GET
        // 팝업 정보 상세
        const url = apiPath.api_admin_get_popup + popup_idx;

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: {},
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                setPopupInfo(result_info);
            } else {
                // 피드백 없음
                handleClose();
            }
            handleResize();
        };
    };

    const closePopup = (popupIdx) => {
        let closeTime = new Date().getTime(); // 현재 시간
        let expires = closeTime + 24 * 60 * 60 * 1000; // 현재 시간으로부터 24시간 뒤

        localStorage.setItem(`popup_viewed_${popupIdx}`, expires);

        handleClose();
    };

    return (
        <>
            {popupInfo && (
                <div className="popup_wrap" id="modal_wrap" style={popupWrapStyle}>
                    <div className="popup" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <div className="form" style={popupContentStyle}>
                            {/* 팝업 컨텐츠 START */}
                            <div dangerouslySetInnerHTML={{ __html: popupInfo.view_content }}></div>
                            <div id="transition-modal-popup-content">
                                { popupInfo.file_info && popupInfo.file_info.map((file) => <img style={isMobile ? mobileImgStyle : {}} src={`${fileBaseUrl + file.file_path_enc}`} alt={file.file_name} key={file.file_idx} />)}
                            </div>
                            {/* 팝업 컨텐츠 END */}
                        </div>
                        <div className="popup_btm">
                            { popupInfo.option_24_hours_yn === "Y" ? (
                                <div>
                                    <input
                                        type="checkbox"
                                        id="popup_24"
                                        value="Y"
                                        onClick={() => closePopup(popupIdx)}
                                    />
                                    <label htmlFor="popup_24">
                                        24시간동안 보지 않기
                                    </label>
                                </div>
                            ) : <div></div> }
                            <div onClick={handleClose}>
                                X 닫기
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPopupModal;
