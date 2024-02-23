import Footer from "components/common/Footer";
import Header from "components/common/Header";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import {
  CommonConsole,
  CommonErrModule,
  CommonErrorCatch,
  CommonNotify,
  CommonRest,
  CommonSpinner,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

function FindIDMain() {
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const err = CommonErrModule();
  const setIsSpinner = useSetRecoilState(isSpinnerAtom);

  const [finded, setFinded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [mobile3, setMobile3] = useState("");
  const [findList, setFindList] = useState([]);

  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputMobile1 = useRef(null);
  const inputMobile2 = useRef(null);
  const inputMobile3 = useRef(null);

  // const dispatch = useDispatch();

  useEffect(() => {
    setFinded(false);
  }, []);

  const handleInput = (ref, e) => {
    let mobile1 = /^[0-9]{1,3}$/;
    let mobile2 = /^[0-9]{1,4}$/;
    let mobile3 = /^[0-9]{1,4}$/;

    switch (ref) {
      case "firstName":
        // console.log(e.currentTarget.value);
        setFirstName(e.currentTarget.value);
        break;

      case "lastName":
        // console.log(e.currentTarget.value);
        setLastName(e.currentTarget.value);
        break;
      case "mobile1":
        // console.log(e.currentTarget.value);
        if (!mobile1.test(e.currentTarget.value)) {
          e.currentTarget.value = e.currentTarget.value.slice(0, -1);
        }
        if (e.currentTarget.value.length >= 3) {
          inputMobile2.current.focus();
        }
        setMobile1(e.currentTarget.value);
        break;
      case "mobile2":
        // console.log(e.currentTarget.value);
        if (!mobile2.test(e.currentTarget.value)) {
          e.currentTarget.value = e.currentTarget.value.slice(0, -1);
        }
        if (e.currentTarget.value.length >= 4) {
          inputMobile3.current.focus();
        }
        setMobile2(e.currentTarget.value);
        break;
      case "mobile3":
        // console.log(e.currentTarget.value);
        if (!mobile3.test(e.currentTarget.value)) {
          e.currentTarget.value = e.currentTarget.value.slice(0, -1);
        }
        setMobile3(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const findIdClick = () => {
    if (!firstName || !lastName) {
      // alert
      CommonNotify({
        type: "alert",
        hook: alert,
        message: "성명을 입력해 주세요",
      });

      inputFirstName.current.focus();
      return;
    }
    if (!mobile1 || !mobile2 || !mobile3) {
      // alert
      CommonNotify({
        type: "alert",
        hook: alert,
        message: "전화번호를 입력해 주세요",
      });

      inputMobile1.current.focus();
      return;
    }

    sendFindId();
  };
  const sendFindId = () => {
    // Spinner
    setIsSpinner(true);

    const url = apiPath.api_user_find_id;
    const data = {
      user_name_first_ko: firstName,
      user_name_last_ko: lastName,
      inter_phone_number: "82",
      mobile1: mobile1,
      mobile2: mobile2,
      mobile3: mobile3,
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
      // CommonConsole("log", res);

      let result_info;

      let result_code = res.headers.result_code;

      if (result_code === successCode.success) {
        result_info = res.data.result_info;

        // CommonConsole("log", result_info);

        setFindList(result_info);

        // Spinner
        setIsSpinner(false);

        setFinded(true);
      } else {
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
  };

  return (
    <>
      <Header />

      {!finded ? (
        <div id="con_area">
          <div className="form sign" id="sign_form">
            <h3 className="title">아이디 찾기</h3>
            <div className="find">
              <div className="flex">
                <div>
                  <h5>성명</h5>
                  <input
                    type="name"
                    className="input w180"
                    placeholder="성"
                    ref={inputFirstName}
                    onChange={(e) => handleInput("firstName", e)}
                  />
                  <input
                    type="name"
                    className="input w180"
                    placeholder="이름"
                    ref={inputLastName}
                    onChange={(e) => handleInput("lastName", e)}
                  />
                </div>
                <div>
                  <h5>휴대전화</h5>
                  <div id="phone_num" className="m0">
                    <input
                      type="tel"
                      className="input w120"
                      id="phone_num1"
                      onChange={(e) => handleInput("mobile1", e)}
                      ref={inputMobile1}
                    />
                    <input
                      type="tel"
                      className="input w140"
                      id="phone_num2"
                      onChange={(e) => handleInput("mobile2", e)}
                      ref={inputMobile2}
                    />
                    <input
                      type="tel"
                      className="input w140"
                      id="phone_num3"
                      onChange={(e) => handleInput("mobile3", e)}
                      ref={inputMobile3}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="find mb15">
              <div className="flex">
                <Link to={routerPath.findPw_url} className="font-12">
                  비밀번호가 기억나지 않으신가요?
                </Link>
              </div>
            </div>
          </div>
          <div className="btn_box">
            <Link className="mainbtn btn01" onClick={findIdClick}>
              아이디 찾기
            </Link>
            <Link to={routerPath.main_url} className="mainbtn btn02">
              뒤로가기
            </Link>
          </div>
        </div>
      ) : (
        <div className="con_area">
          <div className="ok">
            <span>
              <img src="/img/common/id_find.png" alt="" />
            </span>
            <h3>회원님의 아이디는 다음과 같습니다.</h3>
            {findList ? (
              findList.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={`user_id_${index}`}
                >
                  <h4 style={{ marginRight: "70px" }}>{item.user_id}</h4>
                  <h4>{item.reg_dttm.split(" ")[0]}</h4>
                </div>
              ))
            ) : (
              <></>
            )}
            <Link to={routerPath.findPw_url} className="font-12">
              비밀번호가 기억나지 않으신가요?
            </Link>
            <div className="btn_box">
              <Link to={routerPath.main_url} className="backbtn">
                메인화면 바로가기{" "}
                <span>
                  <img src="/img/common/arrow.png" alt="" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default FindIDMain;
