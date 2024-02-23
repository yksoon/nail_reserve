import React from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Sitemap from "components/common/Sitemap";

const PartnershipMain = () => {
    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div className="partner">
                        <h3 className="title">제휴문의</h3>
                        <div>
                            <h5>메디씨티 기업제휴 문의를 메일로 보내주시면<br/>검토 후 연락 드리겠습니다.</h5>
                            <p>support@medi-city.co.kr</p>
                            <ul>
                                <li>호텔 서비스</li>
                                <li>아트(갤러리)</li>
                                <li>세무 관련 서비스</li>
                                <li>기타 서비스 제휴</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/*content E*/}

            {/*footer //S*/}
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default PartnershipMain;
