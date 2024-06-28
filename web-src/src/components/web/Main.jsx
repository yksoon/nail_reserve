import React, { useEffect, useState } from "react";
import MainContents from "./main/mainComponents/MainContents";
import Header from "components/web/common/Header";
import MainMainvisual from "components/web/main/mainComponents/MainMainvisual";
import Footer from "components/web/common/Footer";
import MainPopupModal from "./main/mainComponents/mainContentsComponents/modal/MainPopupModal";
import { CommonErrModule } from "etc/lib/Common";
import { useRecoilValue } from "recoil";
import { successCode } from "etc/lib/resultCode";
import apiPath from "etc/lib/path/apiPath";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";

// ------------------- import End --------------------

function Main() {
    const err = CommonErrModule();

    // 브라우저 창 크기 변화를 상태로 관리
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    // 브라우저 창 크기 변화시 상태 업데이트 핸들러
    const handleResize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        // getPopupList(1, 20, "");

        window.addEventListener("resize", handleResize);

        handleResize(); // 초기 렌더링 시 한번 실행

        window.addEventListener("resize", handleResize); // 창 크기 변화 감지

        return () => {
            window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, []);

    return (
        <>
            {/*헤더*/}
            <Header />

            {/*메인비주얼*/}
            <MainMainvisual />

            {/*메인 컨텐츠*/}
            <MainContents />

            {/* 푸터 */}
            <Footer />
        </>
    );
}

export default Main;
