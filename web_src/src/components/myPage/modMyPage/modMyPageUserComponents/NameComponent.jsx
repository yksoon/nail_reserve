import React, { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";

const NameComponent = forwardRef((props, ref) => {
    const userInfo = props.userInfo;

    const { userNameFirstKo, userNameLastKo, userNameFirstEn, userNameLastEn } =
        ref;

    /**
     * 이름 변경 핸들러
     */
    const changeNameHandler = () => {
        userNameFirstKo.current.readOnly = false;
        userNameLastKo.current.readOnly = false;
        userNameFirstEn.current.readOnly = false;
        userNameLastEn.current.readOnly = false;

        userNameFirstKo.current.className = "input w180";
        userNameLastKo.current.className = "input w180";
        userNameFirstEn.current.className = "input w180";
        userNameLastEn.current.className = "input w180";
    };

    return (
        <>
            <div className="flex">
                <div>
                    <div className="flex mb15">
                        <h5 className="m0">성명 (국문)</h5>
                        <div
                            id="phone_check_after_btn"
                            style={{ display: "block" }}
                        >
                            <Link
                                to=""
                                className="font-12"
                                onClick={changeNameHandler}
                            >
                                이름을 변경할까요?
                            </Link>
                        </div>
                    </div>
                    <input
                        type="name"
                        className="input w180 hold"
                        placeholder="성"
                        defaultValue={userInfo.user_name_first_ko}
                        ref={userNameFirstKo}
                        readOnly
                    />
                    <input
                        type="name"
                        className="input w180 hold"
                        placeholder="이름"
                        defaultValue={userInfo.user_name_last_ko}
                        ref={userNameLastKo}
                        readOnly
                    />
                </div>
                <div>
                    <h5>성명 (영문)</h5>
                    <input
                        type="name"
                        className="input w180 hold"
                        placeholder="First name"
                        defaultValue={userInfo.user_name_first_en}
                        ref={userNameFirstEn}
                        readOnly
                    />
                    <input
                        type="name"
                        className="input w180 hold"
                        placeholder="Last name"
                        defaultValue={userInfo.user_name_last_en}
                        ref={userNameLastEn}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
});

export default NameComponent;
