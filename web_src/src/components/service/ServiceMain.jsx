import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonRest, CommonNotify } from "common/js/Common";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Sitemap from "components/common/Sitemap";
import { Link, useNavigate } from "react-router-dom";

const ServiceMain = () => {
    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div className="service">
                        <Sitemap />
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
export default ServiceMain;