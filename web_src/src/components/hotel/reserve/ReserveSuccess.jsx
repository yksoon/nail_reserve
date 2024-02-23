import React from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";

const ReserveSuccess = () => {
    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
            <div className="con_area">
                <div className="ok_page">
                    <span>
                        <img src="img/common/reservation.jpg" alt="" />
                    </span>
                    <h3>예약이 완료되었습니다.</h3>
                    <p>
                        <strong className="red">
                            본 예약은 예약 확정이 아닙니다.
                        </strong>
                        <br />
                        예약 확정 시 문자 안내 드리오니 문자 확인하여 예약에
                        착오없으시길 바랍니다.
                        <br />
                        감사합니다.
                    </p>
                    <div className="btn_box">
                        <Link
                            to={routerPath.my_page_reserve_url}
                            className="backbtn"
                        >
                            예약내역 확인하기{" "}
                            <span>
                                <img src="img/common/arrow.png" alt="" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Content E */}

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default ReserveSuccess;
