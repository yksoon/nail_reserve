import React, { forwardRef, useState } from "react";
import { pwPattern } from "common/js/Pattern";

const PWComponent = forwardRef((props, ref) => {
    const { userPwd, userPwdCheck } = ref;

    const [inputPW1, setInputPW1] = useState("");
    const [inputPW2, setInputPW2] = useState("");
    const [patternChk1, setPatternChk1] = useState(false);
    const [patternChk2, setPatternChk2] = useState(false);

    // 1 : 비번 서로 X, 패턴 X
    // 2 : 비번 서로 X, 패턴 O
    // 3 : 비번 서로 O, 패턴 X
    // 4 : 비번 서로 O, 패턴 O
    const [pwChk, setPwChk] = useState("1");

    const pwStatus = props.pwStatus;

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
        if (inputPW1 === inputPW2) {
            if (!patternChk1 || !patternChk2) {
                setPwChk("3");
                pwStatus(false);
            } else {
                setPwChk("4");
                pwStatus(true);
            }
        } else {
            if (!patternChk1 || !patternChk2) {
                setPwChk("1");
                pwStatus(false);
            } else {
                setPwChk("2");
                pwStatus(false);
            }
        }
    };

    const notice = (pwChk) => {
        switch (pwChk) {
            case "1":
                return (
                    <p className="mark" id="mark_pw">
                        비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로
                        입력해주세요
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
                        비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로
                        입력해주세요
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
                        비밀번호는 특수문자, 문자, 숫자 포함 형태의 6~16자리로
                        입력해주세요
                    </p>
                );
        }
    };

    return (
        <>
            <div className="flex">
                <div>
                    <h5>비밀번호</h5>
                    <input
                        type="password"
                        className="input w370"
                        ref={userPwd}
                        onKeyUp={(e) => pwPatternCheck1(e)}
                        autoComplete="new-password"
                        onBlur={checkPw}
                    />
                </div>
                <div>
                    <h5>비밀번호 확인</h5>
                    <input
                        type="password"
                        className="input w370"
                        ref={userPwdCheck}
                        onKeyUp={(e) => pwPatternCheck2(e)}
                        autoComplete="new-password"
                        onBlur={checkPw}
                    />
                </div>
                <div>
                    <h5>&nbsp;</h5>
                    {notice(pwChk)}
                </div>
            </div>
        </>
    );
});

export default PWComponent;
