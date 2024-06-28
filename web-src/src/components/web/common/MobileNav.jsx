import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import routerPath from "etc/lib/path/routerPath";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { globalLanguageAtom } from "etc/lib/recoils/atoms";

function MobileNav() {
    const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

    const lngs = {
        // 2. 언어 구분을 위한 lng 객체 생성
        ko: { nativeName: "KO" },
        en: { nativeName: "EN" },
        id: { nativeName: "ID" },
    };

    const [language, setLanguage] = useRecoilState(globalLanguageAtom);

    const handleLanguage = (lng) => {
        setLanguage(lng);
    };

    useEffect(() => {
        $("#nav").hide();
        $(".nav_2depth").hide();
    }, []);

    const menuClick = () => {
        $("#nav").slideToggle();
        $("#menu-icon2").toggleClass("open");
    };

    const menuDepth = (e) => {
        e.preventDefault();
        $(".nav_2depth").slideUp();
        // $(e.target).siblings(".nav_2depth").slideToggle();

        if (
            $(e.target).siblings(`#${e.target.id}_s`)[0] &&
            $(e.target).siblings(`#${e.target.id}_s`)[0].style.display ===
                "block"
        ) {
            $(e.target).siblings(`#${e.target.id}_s`).slideUp();
        } else {
            $(e.target).siblings(`#${e.target.id}_s`).slideToggle();
        }
    };

    return (
        <>
            {/* 모바일 메뉴 // S */}
            <div id="top_right">
                <div
                    id="menu-icon2"
                    className="all_menu"
                    onClick={(e) => menuClick(e)}
                >
                    <span></span>
                    <span></span>
                    <span className="short"></span>
                </div>
                <nav className="nav">
                    <ul id="nav">
                        <li style={{ display: "flex" }}>
                            {Object.keys(lngs).map((lng) => (
                                <a
                                    style={{ cursor: "pointer" }}
                                    key={lng}
                                    className={
                                        i18n.resolvedLanguage === lng
                                            ? "on"
                                            : ""
                                    }
                                    onClick={() => {
                                        i18n.changeLanguage(lng);
                                        handleLanguage(lng);
                                    }}
                                >
                                    {lngs[lng].nativeName}
                                </a>
                            ))}
                        </li>
                        <li>
                            <Link
                                // to={routerPath.web_info_greet_url}
                                to=""
                                // state={{ headerRoute: "greetings" }}
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                                id="nav1"
                            >
                                WE ARE
                            </Link>
                            <ul
                                id="nav1_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "greetings" }}
                                    >
                                        {t("header.weAre.greetings")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "introduce" }}
                                        // onClick={() => moveToSection("introduce")}
                                    >
                                        {t("header.weAre.aboutUs")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "certification" }}
                                    >
                                        {t("header.weAre.certification")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_info_greet_url}
                                        state={{ headerRoute: "partners" }}
                                    >
                                        {t("header.weAre.partner")}
                                    </Link>
                                </li>
                                {/*<li>*/}
                                {/*    <Link to="">*/}
                                {/*        {t("header.weAre.downloadCompany")}*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                            </ul>
                        </li>
                        <li>
                            <Link
                                to=""
                                id="nav2"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                K-MEDI
                            </Link>
                            <ul
                                id="nav2_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link
                                        to={routerPath.web_kmedi_intro_url}
                                        state={{ headerRoute: "intro" }}
                                    >
                                        {t("header.kmedi.intro")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_kmedi_intro_url}
                                        state={{ headerRoute: "app" }}
                                    >
                                        {t("header.kmedi.app")}
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link
                                to=""
                                id="nav3"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                BUSINESS
                            </Link>
                            <ul
                                id="nav3_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "hotel" }}
                                    >
                                        {t("header.business.hotelService")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "art" }}
                                    >
                                        {t("header.business.artService")}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_business_hotel_url}
                                        state={{ headerRoute: "wine" }}
                                    >
                                        {t("header.business.wineService")}
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link
                                to=""
                                id="nav4"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                MEDIA CENTER
                            </Link>
                            <ul
                                id="nav4_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link to={routerPath.web_media_news_url}>
                                        {t("header.mediaCenter.news")}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routerPath.web_media_notice_url}>
                                        {t("header.mediaCenter.notice")}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <h1 className="logo">
                    <Link to={routerPath.web_main_url}>
                        <img src="img/web/main/logo.png" alt="" />
                    </Link>
                </h1>
                {/*<div className="lang">*/}
                {/*    {Object.keys(lngs).map((lng) => (*/}
                {/*        <a*/}
                {/*            style={{ cursor: "pointer" }}*/}
                {/*            key={lng}*/}
                {/*            className={*/}
                {/*                i18n.resolvedLanguage === lng ? "on" : ""*/}
                {/*            }*/}
                {/*            onClick={() => {*/}
                {/*                i18n.changeLanguage(lng);*/}
                {/*                handleLanguage(lng);*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            {lngs[lng].nativeName}*/}
                {/*        </a>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
            {/* 모바일메뉴 // E */}
        </>
    );
}

export default MobileNav;
