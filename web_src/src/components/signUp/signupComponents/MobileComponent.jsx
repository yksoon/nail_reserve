import React, { useRef, forwardRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
    CommonSpinner,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useRecoilState, useSetRecoilState } from "recoil";
import { certInfoAtom, isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

// 인증 idx
let certNumIdxFromServer;

const MobileComponent = forwardRef((props, ref) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const setCertInfo = useSetRecoilState(certInfoAtom);

    const { inputMobile1, inputMobile2, inputMobile3, inter_phone_number } =
        ref;

    const mobileStatus = props.mobileStatus;

    // 모달 데이터
    // const [modData, setModData] = useState({});
    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);

    // const dispatch = useDispatch();

    // 인증정보
    const form_url = useRef(null);
    const enc_data = useRef(null);
    const integrity_value = useRef(null);
    const m = useRef(null);
    const token_version_id = useRef(null);

    const [sec, setSec] = useState(180);
    const timerId = useRef(null); // 간격 타이머의 Id 저장
    const [timerStatus, setTimerStatus] = useState(false); // 타이머 상태

    const [certStatus, setCertStatus] = useState(false);

    const [timer, setTimer] = useState(180); // 5 minutes in seconds
    const intervalId = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // let intervalId;

        if (isRunning) {
            intervalId.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            setIsRunning(false);
        }

        return () => clearInterval(intervalId.current); // Cleanup on component unmount
    }, [isRunning]); // Run effect whenever isRunning changes

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    // 타이머 시작
    // - 의존성 배열이 비어있으므로 한 번만 실행됨
    // - setInterval 1초마다 실행
    // - 나중에 사용하기 위해 timerId.current ref에 저장되는 Id를 반환
    // - 간격 함수 내에서 남은 시간을 분과 초를 반환하여 min,sec 상태 변수 업데이트
    useEffect(() => {
        if (timerStatus) {
            timerId.current = setInterval(() => {
                setSec((sec) => sec - 5);

                chkCert();
            }, 5000);

            return () => clearInterval(timerId.current); // 컴포넌트가 마운트 해제될 때 간격을 지우기 위해 clearInterval 함수 반환
        } else {
            clearInterval(timerId.current);
        }
    }, [timerStatus]);

    // 시간이 0에 도달했을 때 확인
    // sec 상태 변수가 변경될 때마다 실행
    useEffect(() => {
        if (sec <= 0) {
            CommonConsole("log", "time out");
            clearInterval(timerId.current); // 간격지우고 콘솔에 메시지 기록

            stopTimer();

            // alert
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "인증을 다시 진행해주세요",
            });
        }
    }, [sec]);

    // setInterval()를 멈추기 위한 clearInterval() 호출
    const stopTimer = () => {
        setTimerStatus(false);
        clearInterval(timerId.current);

        setIsRunning(false);
        clearInterval(intervalId.current);
    };

    // 타이머 재시작
    const restartTimer = () => {
        setSec(300);
        setTimerStatus(true);
    };

    // 04. 휴대폰 인증
    function phoneCheck(checkNum) {
        // let before_msg = "인증번호를 ";
        // let div_msg = "";
        // let after_msg = " 하였습니다.";
        // let last_msg = "";
        // let clickAction = true;

        switch (checkNum) {
            case 1:
                // 인증번호 발송
                phoneDisplay("phone_check_after_btn", "block");
                sendCert();
                setIsRunning(true);
                break;
            case 2:
                // 재발송
                sendCert();
                setIsRunning(true);
                break;

            default:
                break;
        }
    }

    // // 모달창 열기
    // const handleModalOpen = () => {
    //     setModalTitle("본인인증");
    //     setIsOpen(true);
    // };

    // // 모달창 닫기
    // const handleModalClose = () => {
    //     setModalTitle("");
    //     setModData({});
    //     setIsOpen(false);
    // };

    function phoneDisplay(idName, displayType) {
        document.getElementById(idName).style.display = displayType;
    }

    // 휴대전화 숫자만
    const onlyNum = (e) => {
        // 패턴
        let mobile1 = /^[0-9]{1,3}$/;
        let mobile2 = /^[0-9]{1,4}$/;
        let mobile3 = /^[0-9]{1,4}$/;

        if (e.target === inputMobile1.current) {
            if (!mobile1.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
            }
            // 다음칸으로 이동
            if (e.target.value.length >= 3) {
                inputMobile2.current.focus();
            }
        }
        if (e.target === inputMobile2.current) {
            if (!mobile2.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
            }
            if (e.target.value.length >= 4) {
                inputMobile3.current.focus();
            }
        }
        if (e.target === inputMobile3.current) {
            if (!mobile3.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
            }
        }
    };

    // 인증번호 발송
    const sendCert = () => {
        // setIsSpinner(true);

        const url = apiPath.api_user_cert;

        const data = {
            certification_tool: "000",
            certification_type: "000",
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
            let resData = res.data.result_info;

            localStorage.setItem(
                "certification_idx",
                resData.certification_idx,
            );

            insertFormData(resData);

            // setModData(resData);

            // handleModalOpen();

            setTimerStatus(true);
        };
    };

    const insertFormData = (resData) => {
        token_version_id.current.value = resData.token_version_id;
        enc_data.current.value = resData.enc_data;
        integrity_value.current.value = resData.integrity_value;
        m.current.value = resData.m;

        sendForm(resData.form_url);
    };

    const sendForm = (form_url) => {
        let form = document.getElementById("form");

        // 인증 모달 오픈

        // 5초마다 타이머 시작
        setTimerStatus(true);

        let popup = window.open(
            "",
            "auth",
            "width=200,height=200,resizeable,scrollbars",
        );

        form.action = form_url;
        form.mothod = "POST";
        form.target = "auth";

        form.submit();
    };

    // 인증번호 확인
    const chkCert = () => {
        const certification_idx = localStorage.getItem("certification_idx");
        const url = apiPath.api_user_cert_result + `/${certification_idx}`;

        if (certification_idx) {
            // 파라미터
            const restParams = {
                method: "get",
                url: url,
                data: {},
                err: err,
                callback: (res) => responseLogic(res),
            };

            CommonRest(restParams);

            const responseLogic = (res) => {
                CommonConsole("log", res);

                let resData = res.data.result_info;
                let result_code = res.headers.result_code;

                if (result_code === successCode.success) {
                    // dispatch(set_cert_info(resData));
                    setCertInfo(resData);

                    mobileStatus(true);

                    // 인증 확인 시 인터벌 해제
                    stopTimer();

                    // Spinner
                    // setIsSpinner(false);

                    setCertStatus(true);

                    // 인증 완료 후 로직
                    certComplete(resData);
                } else {
                    CommonConsole("log", res);

                    // alert
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });

                    // Spinner
                    // setIsSpinner(false);
                }
            };
        }
    };

    const certComplete = (resData) => {
        // {
        //     "result_code": "0000",
        //     "request_no": "000000000000000000000000000206",
        //     "enc_time": "20230710161222",
        //     "site_code": "Q0I1OTM=",
        //     "response_no": "MCB59320230710161205WrHS",
        //     "auth_type": "M",
        //     "name": "용광순",
        //     "utf8_name": "%EC%9A%A9%EA%B4%91%EC%88%9C",
        //     "gender": "1",
        //     "national_info": "0",
        //     "birth_date": "19901108",
        //     "mobile_co": null,
        //     "mobile_no": null,
        //     "ci": null,
        //     "di": "MC0GCCqGSIb3DQIJAyEAFCkcy8A6zbBvA+XLEvyzjuvTlSl44WFuenYgwIbP67o=",
        //     "business_no": null,
        //     "receive_data": null
        // }

        const mobileAll = resData.mobile_no;
        // const mobileAll = "01050907526";

        const mobile1 = mobileAll.slice(0, 3);
        const mobile2 = mobileAll.slice(3, 7);
        const mobile3 = mobileAll.slice(-4);

        inputMobile1.current.value = mobile1;
        inputMobile2.current.value = mobile2;
        inputMobile3.current.value = mobile3;
        // nasd
    };

    return (
        <>
            <div>
                <div className="flex mb15">
                    <h5 className="m0">
                        휴대전화 <span className="red">*</span>{" "}
                        <span>
                            {isRunning &&
                                `${minutes}:${
                                    seconds < 10 ? "0" : ""
                                }${seconds}`}
                        </span>
                    </h5>
                    <div id="phone_check_after_btn">
                        <Link
                            className="font-12 mr10 ml10"
                            onClick={(e) => {
                                phoneCheck(2);
                            }}
                        >
                            인증번호가 오지 않았나요?
                        </Link>
                    </div>
                </div>
                <div className="flex">
                    <div id="phone_num" className="m0">
                        <input
                            type="hidden"
                            ref={inter_phone_number}
                            value="82"
                        />
                        <input
                            type="tel"
                            className="input w120 hold"
                            id="phone_num1"
                            ref={inputMobile1}
                            onKeyUp={(e) => {
                                onlyNum(e);
                            }}
                            value="010"
                            readOnly
                        />
                        <input
                            type="tel"
                            className="input w140 hold"
                            id="phone_num2"
                            ref={inputMobile2}
                            onKeyUp={(e) => {
                                onlyNum(e);
                            }}
                            readOnly
                        />
                        <input
                            type="tel"
                            className="input w140 hold"
                            id="phone_num3"
                            ref={inputMobile3}
                            onKeyUp={(e) => {
                                onlyNum(e);
                            }}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            {certStatus ? (
                <div id="phone_check_before">
                    <div className="flex">
                        <Link
                            className="subbtn hold m0"
                            id="phoneCheck"
                            style={{ cursor: "auto" }}
                        >
                            인증 완료
                        </Link>
                    </div>
                </div>
            ) : (
                <div id="phone_check_before">
                    <Link
                        className="subbtn on m0"
                        onClick={(e) => {
                            phoneCheck(1);
                        }}
                    >
                        인증 번호
                    </Link>
                </div>
            )}

            {certStatus ? (
                <p className="mark green" id="mark_tel">
                    휴대폰 인증을 완료했습니다.
                </p>
            ) : (
                <p className="mark" id="mark_tel">
                    휴대폰 인증을 진행해주세요.
                </p>
            )}

            {/* formData */}
            <form name="form" id="form" ref={form_url}>
                <input type="hidden" id="m" name="m" value="" ref={m} />
                <input
                    type="hidden"
                    id="token_version_id"
                    name="token_version_id"
                    value=""
                    ref={token_version_id}
                />
                <input
                    type="hidden"
                    id="enc_data"
                    name="enc_data"
                    ref={enc_data}
                />
                <input
                    type="hidden"
                    id="integrity_value"
                    name="integrity_value"
                    ref={integrity_value}
                />
            </form>

            {/* <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1000"}
                handleModalClose={handleModalClose}
                component={"CertModal"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            /> */}
        </>
    );
});

export default MobileComponent;
