import React from "react";
import { routerPath } from "webPath";
import { Link, useNavigate } from "react-router-dom";
import useAlert from "hook/useAlert";
import { useRecoilState } from "recoil";
import { userTokenAtom } from "recoils/atoms";
import { CommonNotify } from "common/js/Common";

function MainBanner() {
    const { alert } = useAlert();

    const navigate = useNavigate();

    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    // 로그인 필요
    const needToken = (url) => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스입니다.",
                callback: () => inputId.current.focus(),
            });
        } else {
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("html").style.paddingRight = "0";
            // hotelIdx 변수를 올바르게 사용하도록 수정
            navigate(url);
        }
    };

    return (
        <>
            <div className="main_banner">
                <div className="banner01">
                    <Link
                        //   onClick={() =>
                        //     navigate(routerPath.tax_consulting)
                        // }
                        to={routerPath.tax_consulting}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "instant" })
                        }
                    >
                        <div>
                            <span>SERVICE</span>
                            <h5>효율적인 병원 운영을 위한</h5>
                            <h3>종합 컨설팅 서비스!</h3>
                        </div>
                        <img src="img/main/banner01_icon.png" alt="" />
                    </Link>
                </div>
                <div className="banner02">
                    <a
                        style={{ cursor: "pointer" }}
                        onClick={() => needToken(routerPath.event_list)}
                    >
                        <div>
                            <span>EVENT</span>
                            <h5>이벤트 응모하고 해외여행 가자!</h5>
                            <h3>호텔 응모 이벤트 바로가기</h3>
                        </div>
                        <img src="img/main/banner02_icon.png" alt="" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default MainBanner;
