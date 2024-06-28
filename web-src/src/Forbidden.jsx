import React from "react";
import { Link } from "react-router-dom";

// 404 페이지
function Forbidden() {
    return (
        <>
            <div className="wrap">
                <div className="con_area">
                    <div className="error_page">
                        <span>
                            <img src="/img/common_old/error.png" alt="" />
                        </span>
                        <h3>잡아라 페스티벌이 종료 되었습니다.</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forbidden;
