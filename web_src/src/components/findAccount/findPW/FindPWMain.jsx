import { RestServer } from "common/js/Rest";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import ResetPW from "./ResetPW";
import ResetPWComplete from "./ResetPWComplete";
import {
  CommonConsole,
  CommonErrModule,
  CommonNotify,
  CommonRest,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useSetRecoilState } from "recoil";
import { certInfoAtom, isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

function FindPWMain() {
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const err = CommonErrModule();
  const setIsSpinner = useSetRecoilState(isSpinnerAtom);

  const [isFind, setIsFind] = useState("1");
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [certStatus, setCertStatus] = useState(false);

  const setCertInfo = useSetRecoilState(certInfoAtom);

  // 인증정보
  const form_url = useRef(null);
  const enc_data = useRef(null);
  const integrity_value = useRef(null);
  const m = useRef(null);
  const token_version_id = useRef(null);

  const inputUserID = useRef(null);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputMobile1 = useRef(null);
  const inputMobile2 = useRef(null);
  const inputMobile3 = useRef(null);

  const [sec, setSec] = useState(300);
  const timerId = useRef(null); // 간격 타이머의 Id 저장
  const [timerStatus, setTimerStatus] = useState(false); // 타이머 상태

  // const dispatch = useDispatch();

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
  };

  // 타이머 재시작
  const restartTimer = () => {
    setSec(300);
    setTimerStatus(true);
  };

  const handleInput = (ref, e) => {
    switch (ref) {
      case "userID":
        setUserID(e.currentTarget.value);
        break;

      case "firstName":
        setFirstName(e.currentTarget.value);
        break;

      case "lastName":
        setLastName(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  // 인증번호 발송
  const sendCert = () => {
    if (!userID) {
      // alert
      CommonNotify({
        type: "alert",
        hook: alert,
        message: "아이디를 입력해주세요",
      });

      inputUserID.current.focus();
      return;
    } else if (!firstName || !lastName) {
      // alert
      CommonNotify({
        type: "alert",
        hook: alert,
        message: "성명을 입력해주세요",
      });

      inputFirstName.current.focus();
      return;
    } else {
      setIsSpinner(true);

      const url = apiPath.api_user_cert;

      const data = {
        certification_tool: "000",
        certification_type: "200",
        user_id: userID,
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
        const resData = res.data.result_info;

        localStorage.setItem("certification_idx", resData.certification_idx);

        insertFormData(resData);
      };
    }
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
          // 인증 확인 시 인터벌 해제
          stopTimer();

          // Spinner
          // dispatch(
          //     set_spinner({
          //         isLoading: false,
          //     })
          // );
          setIsSpinner(false);

          setCertStatus(true);

          // dispatch(set_cert_info(null));
          setCertInfo(resData);
          // 인증 완료 후 로직
          setIsFind("2");
        } else {
          // alert

          CommonNotify({
            type: "alert",
            hook: alert,
            message: "잠시 후 다시 시도해주세요",
          });
        }
      };
    }
  };

  const changeIsFind = (status) => {
    setIsFind(status);
  };

  return (
    <>
      <Header />

      {isFind === "1" ? (
        <div id="con_area">
          <div className="form sign" id="sign_form">
            <h3 className="title">비밀번호 찾기</h3>
            <div className="find pwfind">
              <div>
                <h5>아이디</h5>
                <div>
                  <input
                    type="email"
                    className="input w460"
                    onChange={(e) => handleInput("userID", e)}
                    ref={inputUserID}
                  />
                </div>
              </div>
              <div>
                <h5>성명</h5>
                <input
                  type="name"
                  className="input w230"
                  placeholder="성"
                  onChange={(e) => handleInput("firstName", e)}
                  ref={inputFirstName}
                />
                <input
                  type="name"
                  className="input w230"
                  placeholder="이름"
                  onChange={(e) => handleInput("lastName", e)}
                  ref={inputLastName}
                />
              </div>
              <div>
                <h5>휴대전화</h5>
                <div className="flex" style={{ justifyContent: "flex-start" }}>
                  <div id="phone_num" className="m0">
                    <input
                      type="tel"
                      className="input w120 hold"
                      id="phone_num1"
                      ref={inputMobile1}
                      value="010"
                      readOnly
                    />
                    <input
                      type="tel"
                      className="input w140 hold"
                      id="phone_num2"
                      ref={inputMobile2}
                      readOnly
                    />
                    <input
                      type="tel"
                      className="input w180 hold"
                      id="phone_num3"
                      ref={inputMobile3}
                      readOnly
                    />
                  </div>
                </div>
                {certStatus ? (
                  <div id="phone_check_before" style={{ marginTop: 10 }}>
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
                  <div id="phone_check_before" style={{ marginTop: 10 }}>
                    <Link
                      className="subbtn on m0"
                      onClick={(e) => {
                        sendCert();
                      }}
                    >
                      인증 번호
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btn_box">
            {/* <Link className="mainbtn btn01" onClick={resetPw}>
                            비밀번호 찾기
                        </Link> */}
            <Link to={routerPath.findId_url} className="mainbtn btn02">
              뒤로가기
            </Link>
          </div>
        </div>
      ) : isFind === "2" ? (
        <ResetPW userID={userID} changeIsFind={changeIsFind} />
      ) : isFind === "3" ? (
        <ResetPWComplete />
      ) : (
        <></>
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
        <input type="hidden" id="enc_data" name="enc_data" ref={enc_data} />
        <input
          type="hidden"
          id="integrity_value"
          name="integrity_value"
          ref={integrity_value}
        />
      </form>
      <Footer />
    </>
  );
}

export default FindPWMain;
