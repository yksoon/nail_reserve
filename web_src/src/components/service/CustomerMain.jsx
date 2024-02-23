import React from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Sitemap from "components/common/Sitemap";

const CustomerMain = () => {
    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div className="costomer">
                        <div className="top">
                            <span>
                                <img src="/img/sub/center.png" alt="" />
                            </span><br /><br />
                            <h3 className="title">고객센터</h3>
                        </div>
                        <div className="contact">
                            <div>
                                <span><img src="/img/sub/center_mail.png" alt="" /></span>
                                <h5>이메일 문의</h5>
                                <p>support@medi-city.co.kr</p>
                                <table>
                                    <tr>
                                        <th>업무시간</th>
                                        <td>
                                            09:00 ~ 18:00<br/>
                                            점심시간 11:30 ~ 13:00<br/>
                                            토, 일 공휴일 휴무
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <span><img src="/img/sub/center_call.png" alt="" /></span>
                                <h5>전화 문의</h5>
                                <p>031-926-3181</p>
                                <table>
                                    <tr>
                                        <th>업무시간</th>
                                        <td>
                                            09:00 ~ 18:00<br/>
                                            점심시간 11:30 ~ 13:00<br/>
                                            토, 일 공휴일 휴무
                                        </td>
                                    </tr>
                                </table>
                            </div>
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

export default CustomerMain;
