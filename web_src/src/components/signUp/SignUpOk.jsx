import React from "react";
import { Link } from "react-router-dom";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { routerPath } from "webPath";

// 가입 완료
function SignUpOk() {
    return (
        <>
            <Header />
            <div className="signup-ok-wrapper">
                <div className="con_area">
                    <div className="ok">
                        <span>
                            <img src="/img/common/sign.png" alt="" />
                        </span>
                        <h3>회원가입이 완료되었습니다!</h3>
                        <p>
                            다양한 회원전용 서비스를 마음껏 누리세요!
                            감사합니다.
                        </p>
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
            </div>
            <Footer />
        </>
    );
}

export default SignUpOk;
