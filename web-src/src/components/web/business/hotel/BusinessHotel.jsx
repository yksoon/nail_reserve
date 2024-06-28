import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/header";
import Footer from "components/web/common/footer";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import {Trans, useTranslation} from "react-i18next";

const BusinessHotel = (props) => {
    const { t, i18n } = useTranslation();

    const refs = {
        subvisual: useRef(null),
        hotel: useRef(null),
        art: useRef(null),
        wine: useRef(null),
    };

    // url params
    const location = useLocation();
    const locationState = location.state;

    const headerRoute = locationState?.headerRoute;

    const [sectionState, setSectionState] = useState("hotel");

    useEffect(() => {
        moveToSection(headerRoute);
    }, [location]);

    const moveToSection = (componentRef) => {
        setSectionState(componentRef);

        switch (componentRef) {
            case "hotel":
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;

            case "art":
                refs.art.current?.scrollIntoView({ behavior: "smooth" });
                break;

            case "wine":
                refs.wine.current?.scrollIntoView({ behavior: "smooth" });
                break;

            default:
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;
        }
    };

    return (
        <>
            <Header />
            <div id="subvisual" ref={refs.subvisual}>
                <div className="sub_txt">
                    <h2>{t("business.subvisual")}</h2>
                </div>
                <div id="leftmenu">
                    <Link
                        to=""
                        onClick={() => moveToSection("hotel")}
                        className={sectionState === "hotel" && "active"}
                    >
                        {t("business.hotel.title")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("art")}
                        className={sectionState === "art" && "active"}
                    >
                        {t("business.art.title")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("wine")}
                        className={sectionState === "wine" && "active"}
                    >
                        {t("business.wine.title")}
                    </Link>
                </div>
            </div>
            <div id="con_area">
                <div className="business">
                    <div className="hotel" ref={refs.hotel}>
                        <div className="txt_wrap">
                            <div className="top">
                                <h3 className="c_tit">
                                    <span>{t("business.hotel.subtitle")}</span>
                                    {t("business.hotel.title")}
                                    <Link>
                                        <img
                                            src="img/web/sub/arrow.png"
                                            alt=""
                                        />
                                    </Link>
                                </h3>
                                <p>
                                    {t("business.hotel.subject")}
                                </p>
                            </div>
                            <div className="line">
                                <h5>{t("business.hotel.content_1.title")}</h5>
                                <p>{t("business.hotel.content_1.content")}</p>
                            </div>
                            <div className="line">
                                <h5>{t("business.hotel.content_2.title")}</h5>
                                <p>{t("business.hotel.content_2.content")}</p>
                            </div>
                            <div className="line">
                                <h5>{t("business.hotel.content_3.title")}</h5>
                                <p>{t("business.hotel.content_3.content")}</p>
                            </div>
                        </div>
                        <div className="img_wrap">
                            <img src="img/web/sub/hotel_img.jpg" alt="" />
                        </div>
                    </div>

                    <div className="art" ref={refs.art}>
                        <div className="img_wrap">
                            <img src="img/web/sub/art_img.jpg" alt="" />
                        </div>
                        <div className="txt_wrap">
                            <div className="top">
                                <h3 className="c_tit">
                                    <span>{t("business.art.subtitle")}</span>
                                    <Link>
                                        <img
                                            src="img/web/sub/arrow_left.png"
                                            alt=""
                                        />
                                    </Link>
                                    {t("business.art.title")}
                                </h3>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "business.art.subject"
                                        }
                                        components={[<br></br>]}
                                    />
                                    {/*고급스럽고 분위기 있는 공간 연출,<br></br>*/}
                                    {/*절세 혜택에 비용처리까지, 메디아트 서비스*/}
                                </p>
                            </div>
                            <div className="line">
                                <h5>{t("business.art.content_1.title")}</h5>
                                <p>{t("business.art.content_1.content")}</p>
                            </div>
                            <div className="line">
                                <h5>{t("business.art.content_2.title")}</h5>
                                <p>{t("business.art.content_2.content")}</p>
                            </div>
                            <div className="line">
                                <h5>{t("business.art.content_3.title")}</h5>
                                <p>{t("business.art.content_3.content")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="wine" ref={refs.wine}>
                        <div className="txt_wrap">
                            <div className="top">
                                <h3 className="c_tit">
                                    <span>{t("business.wine.subtitle")}</span>
                                    {t("business.wine.title")}
                                    <Link>
                                        <img
                                            src="img/web/sub/arrow.png"
                                            alt=""
                                        />
                                    </Link>
                                </h3>
                                <p>{t("business.wine.subject")}</p>
                            </div>
                            <p>
                                <Trans
                                    i18nKey={
                                        "business.wine.content"
                                    }
                                    components={[<br></br>]}
                                />
                                {/*㈜메디씨티는 회원들에게 국내에서 쉽게 접할 수*/}
                                {/*없는 몰도바의 특별한 와인을 제공합니다.<br></br>*/}
                                {/*몰도바의 풍부한 와인 문화와 독특한 포도 품종이*/}
                                {/*반영된 이 희귀 와인들의 국내 유일 총판을 통한*/}
                                {/*공급을 제공하고 있으며,<br></br>*/}
                                {/*메디씨티 회원 (Medi-People)만이 누릴 수 있는*/}
                                {/*Private하고 차별화된 경험을 제공합니다.<br></br>*/}
                                {/*각 와인은 몰도바의 진정한 맛과 전통을 담고 있어,*/}
                                {/*와인 애호가들에게 놓칠 수 없는 기회를*/}
                                {/*제공합니다.<br></br>*/}
                                {/*몰도바의 깊은 맛을 즐길 수 있는 본 서비스는*/}
                                {/*메디씨티 회원들에게만 드리는 특별한 혜택입니다*/}
                            </p>
                        </div>
                        <div className="img_wrap">
                            <img src="img/web/sub/wine_img.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BusinessHotel;
