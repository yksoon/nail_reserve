import React from "react";
import { Link } from "react-router-dom";
import Arrow from "components/web/common/Arrow";
import routerPath from "etc/lib/path/routerPath";
import { useTranslation } from "react-i18next";

const Section02 = () => {
    const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

    return (
        <>
            <div className="section02">
                <div className="sec_in">
                    <div className="title">
                        <h5>{t("main.sec02.offers")}</h5>
                        <div>
                            <h3>{t("main.sec02.business")}</h3>
                            <Link
                                to={routerPath.web_business_hotel_url}
                                state={{ headerRoute: "hotel" }}
                            >
                                <img src="img/web/main/arrow.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <img src="img/web/main/sec02_01.png" alt="" />
                            </div>
                            <div className="busi_txt">
                                <h5>{t("main.sec02.K_Medi_Platform")}</h5>
                                <p>{t("main.sec02.K_Medi_content")}</p>
                                <Link
                                    to={routerPath.web_kmedi_intro_url}
                                    state={{ headerRoute: "intro" }}
                                    className="btn_main"
                                >
                                    {t("main.common.VIEW_MORE")} <Arrow />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="img/web/main/sec02_02.png" alt="" />
                            </div>
                            <div className="busi_txt">
                                <h5>{t("main.sec02.Hotel_Service")}</h5>
                                <p>{t("main.sec02.Hotel_content")}</p>
                                <Link
                                    to={routerPath.web_business_hotel_url}
                                    state={{ headerRoute: "hotel" }}
                                    className="btn_main"
                                >
                                    {t("main.common.VIEW_MORE")} <Arrow />
                                </Link>
                            </div>
                        </li>
                        {/*<li>*/}
                        {/*    <div>*/}
                        {/*        <img src="img/web/main/sec02_03.png" alt="" />*/}
                        {/*    </div>*/}
                        {/*    <div className="busi_txt">*/}
                        {/*        <h5>*/}
                        {/*            {t("main.sec02.Tax_Consulting_Service")}*/}
                        {/*        </h5>*/}
                        {/*        <p>*/}
                        {/*            {t(*/}
                        {/*                "main.sec02.Tax_Consulting_Service_content",*/}
                        {/*            )}*/}
                        {/*        </p>*/}
                        {/*        <Link*/}
                        {/*            to={routerPath.web_business_hotel_url}*/}
                        {/*            state={{ headerRoute: "hotel" }}*/}
                        {/*            className="btn_main"*/}
                        {/*        >*/}
                        {/*            {t("main.common.VIEW_MORE")} <Arrow />*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        <li>
                            <div>
                                <img src="img/web/main/sec02_04.png" alt="" />
                            </div>
                            <div className="busi_txt">
                                <h5>{t("main.sec02.Medi_Art_Service")}</h5>
                                <p>
                                    {t("main.sec02.Medi_Art_Service_content")}
                                </p>
                                <Link
                                    to={routerPath.web_business_hotel_url}
                                    state={{ headerRoute: "art" }}
                                    className="btn_main"
                                >
                                    {t("main.common.VIEW_MORE")} <Arrow />
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="img/web/main/sec02_05.png" alt="" />
                            </div>
                            <div className="busi_txt">
                                <h5>{t("main.sec02.Wine_Promotion")}</h5>
                                <p>{t("main.sec02.Wine_Promotion_content")}</p>
                                <Link
                                    to={routerPath.web_business_hotel_url}
                                    state={{ headerRoute: "wine" }}
                                    className="btn_main"
                                >
                                    {t("main.common.VIEW_MORE")} <Arrow />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Section02;
