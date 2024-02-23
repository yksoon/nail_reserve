import React from "react";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";

function ResetPWComplete() {
    return (
        <div className="con_area">
            <div className="ok">
                <span>
                    <img src="/img/common/id_find.png" alt="" />
                </span>
                <h3>비밀번호 변경이 완료되었습니다.</h3>
                <p>메인페이지에서 로그인 하신 후 이용 부탁드립니다.</p>
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
    );
}

export default ResetPWComplete;
