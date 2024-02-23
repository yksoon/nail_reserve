import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { pwPattern } from "common/js/Pattern";
import { apiPath } from "webPath";
import {
  CommonConsole,
  CommonErrModule,
  CommonNotify,
  CommonRest,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

function ResetPW({ userID, changeIsFind }) {
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const err = CommonErrModule();
  const setIsSpinner = useSetRecoilState(isSpinnerAtom);

  let user_id = userID;
  const [patternChk1, setPatternChk1] = useState(false);
  const [patternChk2, setPatternChk2] = useState(false);

  const [inputPW1, setInputPW1] = useState("");
  const [inputPW2, setInputPW2] = useState("");

  // 1 : 비번 서로 X, 패턴 X
  // 2 : 비번 서로 X, 패턴 O
  // 3 : 비번 서로 O, 패턴 X
  // 4 : 비번 서로 O, 패턴 O
  const [pwChk, setPwChk] = useState("1");

  const inputPW = useRef();
  const inputPWChk = useRef();

  const [pwStatus, setPwStatus] = useState(false);

  // /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/
  const pwPatternCheck1 = (e) => {
    let pw = e.target.value;

    setPatternChk1(pwPattern.test(pw));
    setInputPW1(pw);
  };

  const pwPatternCheck2 = (e) => {
    let pw = e.target.value;

    setPatternChk2(pwPattern.test(pw));
    setInputPW2(pw);
  };

  const checkPw = () => {
    // CommonConsole("log", inputPW1);
    // CommonConsole("log", inputPW2);
    // if (inputPW1 === inputPW2) {
    if (inputPW.current.value === inputPWChk.current.value) {
      if (!patternChk1 || !patternChk2) {
        setPwChk("3");
        setPwStatus(false);
      } else {
        setPwChk("4");
        setPwStatus(true);
      }
    } else {
      if (!patternChk1 || !patternChk2) {
        setPwChk("1");
        setPwStatus(false);
      } else {
        setPwChk("2");
        setPwStatus(false);
      }
    }
  };

  const notice = (pwChk) => {
    switch (pwChk) {
      case "1":
        return (
          <p className="mark" id="mark_pw">
            비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로 입력해주세요
          </p>
        );
      case "2":
        return (
          <p className="mark red" id="mark_pw">
            비밀번호를 확인해주세요
          </p>
        );
      case "3":
        return (
          <p className="mark" id="mark_pw">
            비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로 입력해주세요
          </p>
        );
      case "4":
        return (
          <p className="mark green" id="mark_pw">
            사용 가능한 비밀번호 입니다
          </p>
        );
      default:
        return (
          <p className="mark" id="mark_pw">
            비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로 입력해주세요
          </p>
        );
    }
  };

  const changePW = () => {
    // Spinner
    if (!pwStatus) {
      // alert
      CommonNotify({
        type: "alert",
        hook: alert,
        message: "비밀번호를 확인 해주세요",
      });

      return;
    } else {
      restChangePw();
    }
  };

  const restChangePw = () => {
    setIsSpinner(true);

    const url = apiPath.api_user_reset_pw;
    const data = {
      user_id: user_id,
      user_pwd: inputPW1,
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
      const result_info = res.data.result_info;

      if (res.headers.result_code === successCode.success) {
        // Spinner
        setIsSpinner(false);

        changeIsFind("3");
      } else {
        // alert
        CommonNotify({
          type: "alert",
          hook: alert,
          message: "잠시 후 다시 시도해주세요",
        });

        // Spinner
        setIsSpinner(false);
      }
    };
  };

  return (
    <div id="con_area">
      <div className="form sign" id="sign_form">
        <h3 className="title">비밀번호 재설정</h3>
        <div className="find pwfind">
          <div className="flex">
            <div>
              <h5>새로운 비밀번호</h5>
              <div>
                <input
                  type="password"
                  className="input w370"
                  onKeyUp={(e) => {
                    pwPatternCheck1(e);
                    checkPw();
                  }}
                  ref={inputPW}
                  // onBlur={checkPw}
                />
              </div>
            </div>
            <div>
              <h5>새로운 비밀번호 확인</h5>
              <div>
                <input
                  type="password"
                  className="input w370"
                  onKeyUp={(e) => {
                    pwPatternCheck2(e);
                    checkPw();
                  }}
                  ref={inputPWChk}
                  // onBlur={checkPw}
                />
              </div>
            </div>
          </div>
          <div>
            {/* <p className="mark pw_find_mark" id="mark_pw">
                            비밀번호는 특수문자, 문자, 숫자 포함 형태의
                            6~16자리로 입력해주세요
                        </p> */}
            {notice(pwChk)}
          </div>
        </div>
      </div>
      <div className="btn_box">
        <Link className="mainbtn btn01" onClick={changePW}>
          확인
        </Link>
      </div>
    </div>
  );
}

export default ResetPW;
