import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/header";
import Footer from "components/web/common/footer";
import Arrow from "components/web/common/Arrow";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import useAlert from "hook/useAlert";
import { CommonNotify } from "etc/lib/Common";

const KmediIntro = (props) => {
    const { t, i18n } = useTranslation();

    const { alert } = useAlert();

    const refs = {
        subvisual: useRef(null),
        intro: useRef(null),
        app: useRef(null),
    };

    // url params
    const location = useLocation();
    const locationState = location.state;

    const headerRoute = locationState?.headerRoute;

    const [sectionState, setSectionState] = useState("");

    useEffect(() => {
        moveToSection(headerRoute);
    }, [location]);

    const moveToSection = (componentRef) => {
        setSectionState(componentRef);

        switch (componentRef) {
            case "intro":
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;

            case "app":
                refs.app.current?.scrollIntoView({ behavior: "smooth" });
                break;

            default:
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;
        }
    };

    return (
        <>
            <Header />
            <>
                <div></div>
            </>
            <div id="subvisual" ref={refs.subvisual}>
                <div className="sub_txt">
                    <h2>{t("kmedi.subvisual.title")}</h2>
                </div>
                <div id="leftmenu">
                    <Link
                        to=""
                        onClick={() => moveToSection("intro")}
                        className={sectionState === "intro" && "active"}
                    >
                        {t("kmedi.subvisual.subtitle.intro")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("app")}
                        className={sectionState === "app" && "active"}
                    >
                        {t("kmedi.subvisual.subtitle.app")}
                    </Link>
                </div>
            </div>
            <div id="con_area.wide_conarea">
                <div className="kmedi" ref={refs.intro}>
                    <div className="one">
                        <div className="top">
                            <h3 className="c_tit">
                                <span>{t("kmedi.intro.subtitle")}</span>
                                {t("kmedi.intro.content_1.title")}
                            </h3>
                        </div>
                        <div className="cont">
                            <div>
                                <h4>01</h4>
                                <h5>
                                    {/*인도네시아 인구 약 2억7천만명 중 의사 수*/}
                                    {/*<br></br>약 21만 2천만명 (2022년 기준){" "}*/}
                                    {/*<b>의료시장의 급격한 성장세</b>*/}
                                    <Trans
                                        i18nKey={
                                            "kmedi.intro.content_1.1.content"
                                        }
                                        components={[<br></br>, <b></b>]}
                                    />
                                </h5>
                                <div className="graybox">
                                    <img
                                        src="img/web/sub/medi_graph01.png"
                                        alt=""
                                    ></img>
                                    <span>
                                        {t("kmedi.intro.content_1.1.btn_1")}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4>02</h4>
                                <h5>
                                    {/*병원, 의료, 치과 서비스 시장은<br></br>*/}
                                    {/*2014년부터 2022년까지 연평균 약5%씩 성장*/}
                                    <Trans
                                        i18nKey={
                                            "kmedi.intro.content_1.2.content"
                                        }
                                        components={[<br></br>]}
                                    />
                                </h5>
                                <div className="graybox twograph">
                                    <div>
                                        <img
                                            src="img/web/sub/medi_graph02.png"
                                            alt=""
                                        ></img>
                                        <span>
                                            {t("kmedi.intro.content_1.2.btn_1")}
                                        </span>
                                    </div>
                                    <div>
                                        <img
                                            src="img/web/sub/medi_graph03.png"
                                            alt=""
                                        ></img>
                                        <span>
                                            {t("kmedi.intro.content_1.2.btn_2")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kmedi_wide">
                    <div className="two">
                        <div className="txt_wrap">
                            <h3>
                                <span>
                                    {/*Leading Global Medical<br></br>Contents*/}
                                    {/*Platform*/}
                                    <Trans
                                        i18nKey={
                                            "kmedi.intro.content_2.subtitle"
                                        }
                                        components={[<br></br>]}
                                    />
                                </span>
                                {t("kmedi.intro.content_2.title")}
                            </h3>
                            <p>
                                {/*K-Medi는 인도네시아를 시작으로 베트남, 필리핀,*/}
                                {/*말레이시아, 싱가폴, 인도, 태국을 목표로 하고*/}
                                {/*있습니다.*/}
                                {t("kmedi.intro.content_2.content")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="kmedi">
                    <div className="three">
                        <div className="top">
                            <h3 className="c_tit">
                                <span>{t("kmedi.intro.subtitle")}</span>
                                {t("kmedi.intro.content_3.title")}
                            </h3>
                            <p>
                                {/*의료데이터 활용 및 저작권 문제 : 디지털 자산에*/}
                                {/*대한 저작권 귀속 규제 없음 (개인정보 보호법*/}
                                {/*제2조 제1호 근거)<br></br>*/}
                                {/*병원 및 콘텐츠 공급자 회사 매출 수입에 대한*/}
                                {/*Reward 분배 정책*/}

                                <Trans
                                    i18nKey={"kmedi.intro.content_3.content"}
                                    components={[<br></br>]}
                                />
                            </p>
                        </div>
                        <ul>
                            <li>
                                <p>
                                    <img
                                        src="img/web/sub/kmedi_icon01.png"
                                        alt=""
                                    ></img>
                                </p>
                                <h5>{t("kmedi.intro.content_3.1.title")}</h5>
                                <span>
                                    {t("kmedi.intro.content_3.1.content")}
                                </span>
                            </li>
                            <li>
                                <p>
                                    <img
                                        src="img/web/sub/kmedi_icon02.png"
                                        alt=""
                                    ></img>
                                </p>
                                <h5>{t("kmedi.intro.content_3.2.title")}</h5>
                                <span>
                                    {t("kmedi.intro.content_3.2.content")}
                                </span>
                            </li>
                            <li>
                                <p>
                                    <img
                                        src="img/web/sub/kmedi_icon03.png"
                                        alt=""
                                    ></img>
                                </p>
                                <h5>{t("kmedi.intro.content_3.3.title")}</h5>
                                <span>
                                    {t("kmedi.intro.content_3.3.content")}
                                </span>
                            </li>
                            <li>
                                <p>
                                    <img
                                        src="img/web/sub/kmedi_icon04.png"
                                        alt=""
                                    ></img>
                                </p>
                                <h5>{t("kmedi.intro.content_3.4.title")}</h5>
                                <span>
                                    {t("kmedi.intro.content_3.4.content")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="kmedi_wide" ref={refs.app}>
                    <div className="app">
                        <div className="top">
                            <h3 className="c_tit">
                                <span>{t("kmedi.app.subtitle")}</span>
                                {/*저작권자의 소유권 보장과<br></br>*/}
                                {/*의료전문 OTT 플랫폼<br></br>*/}
                                {/*서비스를 제공합니다.*/}
                                <Trans
                                    i18nKey={"kmedi.app.title"}
                                    components={[<br></br>]}
                                />
                            </h3>
                            <Link
                                to=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    CommonNotify({
                                        type: "alert",
                                        hook: alert,
                                        message: t("kmedi.app.comming_soon"),
                                        callback: () => moveToSection("app"),
                                    });
                                }}
                                className="btn_main"
                            >
                                {t("kmedi.app.viewMore")} <Arrow />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default KmediIntro;
