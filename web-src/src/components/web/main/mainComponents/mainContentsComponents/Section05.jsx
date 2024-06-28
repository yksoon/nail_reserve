import React from "react";
import { Link } from "react-router-dom";
import Arrow from "components/web/common/Arrow";
import routerPath from "etc/lib/path/routerPath";
import { useTranslation } from "react-i18next";
import Partners from "components/web/common/Partners";

const Section05 = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className="section05">
                <div className="sec_in">
                    <div className="title">
                        <h5>{t("main.sec05.subtitle")}</h5>
                        <div>
                            <h3>{t("main.sec05.title")}</h3>
                        </div>
                    </div>

                    <Partners />
                </div>
            </div>
        </>
    );
};

export default Section05;
