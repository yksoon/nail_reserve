import React from "react";
import { Link } from "react-router-dom";
import Arrow from "components/web/common/Arrow";
import routerPath from "etc/lib/path/routerPath";
import { Trans, useTranslation } from "react-i18next";
import LineBreak from "etc/lib/language/web/LineBreak";

const Section06 = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="section06">
                <div className="sec_in">
                    <div className="title">
                        <h5>{t("main.sec06.subtitle")}</h5>
                        <div>
                            <h3>{t("main.sec06.title")}</h3>
                        </div>
                        <p>
                            {/*메디씨티는 한국의 의료기술을 세계에 알림으로써<br />*/}
                            {/*전세계의 많은 환자들이 보다 좋은 의료서비스를 통해<br />*/}
                            {/*건강해지기를 진심으로 기원합니다.*/}
                            <Trans
                                i18nKey={"main.sec06.content"}
                                components={[<br></br>]}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Section06;
