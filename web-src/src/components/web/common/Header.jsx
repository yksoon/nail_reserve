import React, { useEffect } from "react";
import $ from "jquery";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { CommonOpenUrl } from "etc/lib/Common";
import routerPath from "etc/lib/path/routerPath";
import { useTranslation, Trans } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import { globalLanguageAtom } from "etc/lib/recoils/atoms";
import apiPath from "etc/lib/path/apiPath"; // 1. react-i18next import

const lngs = {
    // 2. 언어 구분을 위한 lng 객체 생성
    ko: { nativeName: "KO", className: "ko" },
    en: { nativeName: "EN", className: "en" },
    id: { nativeName: "ID", className: "id" },
};

function Header(props) {
    const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

    const [language, setLanguage] = useRecoilState(globalLanguageAtom);

    const handleLanguage = (lng) => {
        setLanguage(lng);
    };

    return (
        <>
            <div id="header">
                <div
                    id="header_content"
                    data-aos="fade-down"
                    data-aos-duration="1100"
                >
                    <h1 className="logo">
                        <Link to={routerPath.web_main_url}>
                            <img src="img/web/main/logo.png" alt="" />
                        </Link>
                    </h1>
                    <div id="gnb">
                        <ul>
                            <li>
                                <Link
                                    to={routerPath.web_info_greet_url}
                                    state={{ headerRoute: "greetings" }}
                                >
                                    WE ARE
                                </Link>
                                <div className="submenu">
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "greetings" }}
                                    >
                                        {t("header.weAre.greetings")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "introduce" }}
                                        // onClick={() => moveToSection("introduce")}
                                    >
                                        {t("header.weAre.aboutUs")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "certification" }}
                                    >
                                        {t("header.weAre.certification")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "partners" }}
                                    >
                                        {t("header.weAre.partner")}
                                    </Link>
                                    {/*<Link*/}
                                    {/*    to=""*/}
                                    {/*    onClick={(e) =>*/}
                                    {/*        CommonOpenUrl(*/}
                                    {/*            "/file/PT.MEDICITY_INDONESIA.pdf",*/}
                                    {/*            e,*/}
                                    {/*        )*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    {t("header.weAre.downloadCompany")}*/}
                                    {/*</Link>*/}
                                </div>
                            </li>
                            <li>
                                <Link
                                    to={routerPath.web_kmedi_intro_url}
                                    state={{ headerRoute: "intro" }}
                                >
                                    K-MEDI
                                </Link>
                                <div className="submenu">
                                    <Link
                                        to={routerPath.web_kmedi_intro_url}
                                        state={{ headerRoute: "intro" }}
                                    >
                                        {t("header.kmedi.intro")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_kmedi_intro_url}
                                        state={{ headerRoute: "app" }}
                                    >
                                        {t("header.kmedi.app")}
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link
                                    to={routerPath.web_business_hotel_url}
                                    state={{ headerRoute: "hotel" }}
                                >
                                    BUSINESS
                                </Link>
                                <div className="submenu">
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "hotel" }}
                                    >
                                        {t("header.business.hotelService")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "art" }}
                                    >
                                        {t("header.business.artService")}
                                    </Link>
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "wine" }}
                                    >
                                        {t("header.business.wineService")}
                                    </Link>
                                    {/*<Link to={routerPath.web_business_hotel_url}*/}
                                    {/*      state={{headerRoute: "wine"}}*/}
                                    {/*>*/}
                                    {/*    Tax/Accounting Consulting Service*/}
                                    {/*</Link>*/}
                                </div>
                            </li>
                            <li>
                                <Link to={routerPath.web_media_news_url}>
                                    MEDIA CENTER
                                </Link>
                                <div className="submenu">
                                    {/*<Link to={routerPath.web_media_video_url}>*/}
                                    {/*    영상 콘텐츠*/}
                                    {/*</Link>*/}
                                    <Link to={routerPath.web_media_news_url}>
                                        {t("header.mediaCenter.news")}
                                    </Link>
                                    <Link to={routerPath.web_media_notice_url}>
                                        {t("header.mediaCenter.notice")}
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <div className="submenu_bg"></div>
                    </div>
                    <div className="lang">
                        {Object.keys(lngs).map((lng) => (
                            <a
                                style={{ cursor: "pointer" }}
                                key={lng}
                                className={`${lngs[lng].className}${
                                    i18n.resolvedLanguage === lng ? " on" : ""
                                }`}
                                onClick={() => {
                                    i18n.changeLanguage(lng);
                                    handleLanguage(lng);
                                }}
                            >
                                <span>{lngs[lng].nativeName}</span>
                            </a>
                        ))}
                    </div>
                    {/*<div className="book">*/}
                    {/*    <img src="img/web/main/book.png" alt="" />*/}
                    {/*</div>*/}
                </div>
                {/* 모바일 메뉴 // S */}
                <MobileNav />
                {/* 모바일메뉴 // E */}
            </div>
        </>
    );
}

export default Header;
