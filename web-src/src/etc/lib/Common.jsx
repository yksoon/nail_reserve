// Create By YKSoon_

import { React } from "react";
import { CircularProgress, Modal, Typography } from "@mui/material";
import tokenExpire from "etc/lib/tokenExpire";
import { errorCode } from "etc/lib/resultCode";
import useAlert from "hook/useAlert";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
    isSpinnerAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "etc/lib/recoils/atoms";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import imageCompression from "browser-image-compression";
import { imageResizeOptions } from "etc/lib/static";

// Alert (props)
// isOpen = state 상태값
// title = 제목
// content = 내용
// btn = 확인버튼
// closeModal = 닫기 (state를 변경할 수 있는 handler)
// data

// -- 디버깅용 콘솔 --
// 파라미터:
// type - String
// responseData - 객체
const CommonConsole = (type, responseData) => {
    let resultMessageKo;
    let resultMessageEn;
    let resultCode;
    let message;

    // response 설정
    let response;
    !responseData.response
        ? (response = responseData)
        : (response = responseData.response);

    if (response.headers) {
        resultMessageKo = response.headers.resultMessageKo;
        resultMessageEn = response.headers.resultMessageEn;
        resultCode = response.headers.resultCode;
        message = response.headers.message;
    } else {
        response = responseData;
    }

    switch (type) {
        case "log":
            return console.log(responseData);

        case "decLog":
            // 규격상 http request header는 영어밖에 안되기때문에 디코딩 해준다
            return console.log(
                decodeURI(resultMessageKo),
                decodeURI(resultMessageEn),
                decodeURI(resultCode),
                decodeURI(message),
            );

        case "alertMsg":
            return alert(decodeURI(resultMessageKo).replace("%20", " "));

        case "alert":
            return alert(responseData);

        default:
            break;
    }
};

// 스피너
const CommonSpinner = (props) => {
    return (
        <>
            <div className="spinner">
                <CircularProgress />
            </div>
        </>
    );
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
                    ok: "Ok",
                    cancel: "cancel",
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

// 공용 날짜 체킹
/* 
-- restParams --
dispatch : useDispatch
alert : useAlert
type: ""
callback : callback()
*/
const CommonCheckDate = async (
    checkSchedule,
    ip,
    alert,
    callbackFunc,
    // dispatch
    setIsSpinner,
) => {
    setIsSpinner(true);

    if (Object.keys(checkSchedule).length !== 0) {
        const allowedIp = checkSchedule.allowed_ip;
        // TODO: 추후 아이디 추가, role 추가
        // const allowedId = checkSchedule.allowed_id;

        const nowDate = new Date();

        const startDate = checkSchedule.start_date;
        const startTime = checkSchedule.start_time;
        const endDate = checkSchedule.end_date;
        const endTime = checkSchedule.end_time;

        const startDateTime = new Date(startDate + " " + startTime);
        const endDateTime = new Date(endDate + " " + endTime);

        if (nowDate > startDateTime && nowDate < endDateTime) {
            // 사전등록기간 내
            console.log("checkSchedule OK");

            return true;
        } else {
            // 사전등록기간 외
            if (allowedIp.indexOf(ip) === -1) {
                // 예외 아이피가 없으면
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "사전등록 기간이 아닙니다",
                    callback: callbackFunc,
                });

                return false;
            }
        }
    } else {
        callbackFunc();

        return false;
    }

    return true;
};

// 공용 url 열기
// 파라미터 : url(string)
const CommonOpenUrl = (url, e) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener, noreferrer");
};

const CommonErrModule = () => {
    const { alert } = useAlert();
    // const { confirm } = useConfirm();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);
    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);
    const err = {
        setIsSpinner,
        alert,
        resetUserInfoAdmin,
        resetUserTokenAdmin,
    };

    return err;
};

const CommonPieChart = (props) => {
    const data = props.data ?? [];
    const title = props.title ?? "";

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <Typography variant="h5" align="center">
                    {title}
                </Typography>
                <PieChart
                    series={[
                        {
                            data: data,
                            highlightScope: {
                                faded: "global",
                                highlighted: "item",
                            },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                cornerRadius: 0,
                                color: "gray",
                            },
                        },
                    ]}
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: {
                                vertical: "bottom",
                                horizontal: "middle",
                            },
                            padding: 0,
                        },
                    }}
                    margin={{
                        top: 20,
                        bottom: 100,
                        left: 50,
                        right: 50,
                    }}
                    {...props}
                />
            </div>
        </>
    );
};

const CommonBarChart = (props) => {
    const data = props.data ?? [];
    const title = props.title ?? "";

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <Typography variant="h5" align="center">
                    {title}
                </Typography>
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: "band", dataKey: "label" }]}
                    series={[
                        {
                            dataKey: "value",
                        },
                    ]}
                    margin={{
                        top: 20,
                        bottom: 60,
                        left: 100,
                        right: 100,
                    }}
                    {...props}
                />
            </div>
        </>
    );
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

const CommonInputNumberPattern = (e) => {
    return e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};

const CommonMakeThumbnailImage = async (file) => {
    try {
        const compressedFile = await imageCompression(file, imageResizeOptions);
        const resizingFile = new File([compressedFile], file.name, {
            type: file.type,
        });
        return resizingFile;
    } catch (error) {
        console.error(error.message);
        throw error; // Propagate the error for handling at a higher level if needed
    }
};

const CommonParseHTMLString = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
};

const CommonGetYoutubeThumbnailUrl = (url) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    const videoId = matches ? matches[1] : null;

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export {
    CommonConsole,
    CommonSpinner,
    CommonNotify,
    CommonOpenUrl,
    CommonCheckDate,
    CommonErrModule,
    CommonPieChart,
    CommonBarChart,
    CommonCommaPattern,
    CommonInputNumberPattern,
    CommonMakeThumbnailImage,
    CommonParseHTMLString,
    CommonGetYoutubeThumbnailUrl,
};
