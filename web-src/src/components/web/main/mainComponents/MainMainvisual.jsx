import { Skeleton } from "@mui/material";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const MainMainvisual = (props) => {
    const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

    return (
        <>
            <div id="mainvisual">
                <div className="main_txt">
                    <h3>{t("mainvisual.subtitle")}</h3>
                    <h2>{t("mainvisual.title")}</h2>
                    <p>
                        {/*메디씨티는 의료기관, 학회, Webinar(웨비나), MICE*/}
                        {/*서비스를 통해 4만여명의 의료인 데이터 베이스와 수술,*/}
                        {/*강의 영상을 보유하고 있으며*/}
                        {/*<br />*/}
                        {/*개원 컨설팅부터 홍보, 의료서비스 대상과의 연계,*/}
                        {/*제휴기관의 다양한 혜택을 메디씨티 회원들에게 제공합니다.*/}
                        <Trans
                            i18nKey={"mainvisual.content"}
                            components={[<br></br>]}
                        />
                    </p>
                </div>
            </div>
        </>
    );
};

export default MainMainvisual;
