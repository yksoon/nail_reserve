import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/header";
import Footer from "components/web/common/footer";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import LineBreak from "etc/lib/language/web/LineBreak";
import { globalLanguageAtom } from "etc/lib/recoils/atoms";
import { useRecoilValue } from "recoil";
import { CommonOpenUrl } from "etc/lib/Common";
import Partners from "components/web/common/Partners";

const InfoWelcome = (props) => {
    const { t, i18n } = useTranslation();
    const lang = useRecoilValue(globalLanguageAtom);

    const refs = {
        subvisual: useRef(null),
        greetings: useRef(null),
        introduce: useRef(null),
        certification: useRef(null),
        partners: useRef(null),
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
            case "greetings":
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;

            case "introduce":
                refs.introduce.current?.scrollIntoView({ behavior: "smooth" });
                break;

            case "certification":
                refs.certification.current?.scrollIntoView({
                    behavior: "smooth",
                });
                break;

            case "partners":
                refs.partners.current?.scrollIntoView({ behavior: "smooth" });
                break;

            default:
                refs.subvisual.current?.scrollIntoView({ behavior: "smooth" });
                break;
        }
    };

    return (
        <>
            <Header moveToSection={moveToSection} />
            <div id="subvisual" ref={refs.subvisual}>
                <div className="sub_txt">
                    <h2>{t("weAre.subvisual.title")}</h2>
                </div>

                <div id="leftmenu">
                    <Link
                        to=""
                        onClick={() => moveToSection("greetings")}
                        className={sectionState === "greetings" ? "active" : ""}
                    >
                        {t("weAre.subvisual.Greetings")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("introduce")}
                        className={sectionState === "introduce" ? "active" : ""}
                    >
                        {t("weAre.subvisual.About_Us")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("certification")}
                        className={
                            sectionState === "certification" ? "active" : ""
                        }
                    >
                        {t("weAre.subvisual.Certification_Status")}
                    </Link>
                    <Link
                        to=""
                        onClick={() => moveToSection("partners")}
                        className={sectionState === "partners" ? "active" : ""}
                    >
                        {t("weAre.subvisual.Partners")}
                    </Link>
                    {/*<Link*/}
                    {/*    to=""*/}
                    {/*    onClick={(e) =>*/}
                    {/*        CommonOpenUrl("/file/PT.MEDICITY_INDONESIA.pdf", e)*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    {t("weAre.subvisual.Download_Company")}*/}
                    {/*</Link>*/}
                </div>
            </div>
            <div id="con_area.wide_conarea ">
                <div className="weare">
                    <div className="boxing" id="sec01" ref={refs.greetings}>
                        <div className="layout">
                            <div className="flx_box">
                                <div>
                                    <h3 className="c_tit">
                                        <span>
                                            {t("weAre.greetings.Greetings")}
                                        </span>
                                        {t("weAre.greetings.Greetings_title")}
                                    </h3>
                                    <p className="normal">
                                        {/*{LineBreak(*/}
                                        {/*    t("weAre.greetings.Greetings_content"),*/}
                                        {/*)}*/}
                                        <Trans
                                            i18nKey={
                                                "weAre.greetings.Greetings_content"
                                            }
                                            components={[<br></br>]}
                                        />
                                        {/*<h4>㈜메디씨티는</h4>*/}
                                        {/*환자와 의료진의 중심에서 글로벌 의료통합*/}
                                        {/*플랫폼 서비스를 통해 새로운 혁신을*/}
                                        {/*시작합니다. <br />*/}
                                        {/*또한 우수한 K메디컬 기술을 해외에 널리*/}
                                        {/*알리고 소통하는 장을 마련함으로써 지금도*/}
                                        {/*높은 사망률로 어려움을 겪고 있는 주변*/}
                                        {/*나라들에게 우수한 의료 정보의 전달과*/}
                                        {/*온/오프라인 교육을 통해“생명을 살리는 장을*/}
                                        {/*마련하겠다” 라는 사명감으로 의료분야의*/}
                                        {/*집중적인 투자 및 육성을 진행하고 있습니다.{" "}*/}
                                        {/*<br />*/}
                                        {/*좋은 제품과 서비스를 제공하는데 그치지*/}
                                        {/*않겠습니다. <br />전 임직원이 하나가 되어*/}
                                        {/*끊임없이 도전하고 성장하며 고객의 가치를*/}
                                        {/*최우선으로 여기는 NO.1 글로벌기업이*/}
                                        {/*되겠습니다.*/}
                                    </p>
                                    <div className="sign">
                                        <p>{t("weAre.greetings.ltd")}</p>
                                        <img
                                            src="img/web/sub/sign.png"
                                            alt="박성민"
                                        />
                                    </div>
                                </div>
                                {/* <div>
                                    <img src="img/web/sub/logo_top.png" alt=""></img>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec02" ref={refs.introduce}>
                        <div className="layout">
                            <div>
                                <h3 className="c_tit">
                                    <span>{t("weAre.aboutUs.About_Us")}</span>
                                    {t("weAre.aboutUs.whatIs.title")}
                                </h3>
                            </div>
                            <div className="box_wrap">
                                <div className="graybox">
                                    <p>
                                        <img
                                            src="img/web/sub/intro_icon01.png"
                                            alt=""
                                        ></img>
                                    </p>
                                    <h5>{t("weAre.aboutUs.whatIs.reward")}</h5>
                                    <span>
                                        {t(
                                            "weAre.aboutUs.whatIs.reward_content",
                                        )}
                                    </span>
                                </div>
                                <div className="graybox">
                                    <p>
                                        <img
                                            src="img/web/sub/intro_icon02.png"
                                            alt=""
                                        ></img>
                                    </p>
                                    <h5>
                                        {t("weAre.aboutUs.whatIs.membership")}
                                    </h5>
                                    <span>
                                        {t(
                                            "weAre.aboutUs.whatIs.membership_content",
                                        )}
                                    </span>
                                </div>
                                <div className="graybox">
                                    <p>
                                        <img
                                            src="img/web/sub/intro_icon03.png"
                                            alt=""
                                        ></img>
                                    </p>
                                    <h5>{t("weAre.aboutUs.whatIs.mice")}</h5>
                                    <span>
                                        {t("weAre.aboutUs.whatIs.mice_content")}
                                    </span>
                                </div>
                                <div className="graybox">
                                    <p>
                                        <img
                                            src="img/web/sub/intro_icon04.png"
                                            alt=""
                                        ></img>
                                    </p>
                                    <h5>{t("weAre.aboutUs.whatIs.life")}</h5>
                                    <span>
                                        {t("weAre.aboutUs.whatIs.life_content")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec03">
                        <div className="layout">
                            <div>
                                <h3 className="c_tit">
                                    <span>{t("weAre.aboutUs.About_Us")}</span>
                                    {t("weAre.aboutUs.slogan.title")}
                                </h3>
                            </div>
                            <div className="txt">
                                {/*<img*/}
                                {/*    src={`img/web/sub/intro_txt_${lang}.png`}*/}
                                {/*    alt=""*/}
                                {/*></img>*/}
                                <p>{t("weAre.aboutUs.slogan.contentTop")}</p>
                                <span>{t("weAre.aboutUs.slogan.content")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec04">
                        <div className="layout">
                            <div className="flx_box">
                                <h3 className="c_tit">
                                    <span>{t("weAre.aboutUs.About_Us")}</span>
                                    {t("weAre.aboutUs.management.title")}
                                </h3>
                                <p>{t("weAre.aboutUs.management.content")}</p>
                            </div>
                            <div className="img_wrap">
                                <img
                                    src={`img/web/sub/intro_graph_${lang}.png`}
                                    alt=""
                                ></img>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec05">
                        <div className="layout">
                            <div className="flx_box">
                                <h3 className="c_tit">
                                    <span>{t("weAre.aboutUs.About_Us")}</span>
                                    {t("weAre.aboutUs.mission.title")}
                                </h3>
                                <ul>
                                    <li>
                                        <Trans
                                            i18nKey={
                                                "weAre.aboutUs.mission.content_1"
                                            }
                                            components={[<span></span>]}
                                        />
                                    </li>
                                    <li>
                                        <Trans
                                            i18nKey={
                                                "weAre.aboutUs.mission.content_2"
                                            }
                                            components={[<span></span>]}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="bg"></div>
                        </div>
                    </div>

                    <div className="boxing" id="sec06">
                        <div className="layout">
                            <h3 className="c_tit c_tit_kr">
                                <span>{t("weAre.aboutUs.About_Us")}</span>
                                {t("weAre.aboutUs.roadmap.title")}
                            </h3>
                            <div className="first line">
                                <div className="left">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo01.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2006</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2006.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2006.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2006.content_2",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2006.content_3",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2006.content_4",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2006.content_5",
                                        )}
                                    </p>
                                </div>
                                <div className="left">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo02.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2013</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2013.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2013.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2013.content_2",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2013.content_3",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2013.content_4",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2013.content_5",
                                        )}
                                    </p>
                                </div>
                                <div className="left">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo03.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2020</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2020.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2020.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2020.content_2",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2020.content_3",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2020.content_4",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2020.content_5",
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="second line">
                                <div className="right">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo05.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2023</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2023.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2023.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2023.content_2",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2023.content_3",
                                        )}
                                    </p>
                                </div>
                                <div className="right">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo04.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2022</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2022.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2022.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2022.content_2",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2022.content_3",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2022.content_4",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2022.content_5",
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="third line">
                                <div className="left">
                                    <div className="logobox">
                                        <img
                                            src="img/web/sub/logo04.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <h4>2024</h4>
                                    <h5>
                                        {t("weAre.aboutUs.roadmap.2024.title")}
                                    </h5>
                                    <p>
                                        {t(
                                            "weAre.aboutUs.roadmap.2024.content_1",
                                        )}
                                        <br></br>
                                        {t(
                                            "weAre.aboutUs.roadmap.2024.content_2",
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec07">
                        <div className="layout">
                            <h3 className="c_tit c_tit_kr">
                                <span>{t("weAre.aboutUs.About_Us")}</span>
                                {t("weAre.aboutUs.history.title")}
                            </h3>
                            <div className="history">
                                <div className="historybox">
                                    <div className="month right">
                                        <div>
                                            <p className="on">
                                                {t(
                                                    "weAre.aboutUs.history.2024.may.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.may.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2024.april.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.april.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.april.content_2",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.april.content_3",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2024.march.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.march.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.march.content_2",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.march.content_3",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.march.content_4",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.march.content_5",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2024.february.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.february.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.february.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2024.january.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2024.january.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="year">
                                        <div className="num on">2024</div>
                                        <div className="img_box">
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_01.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_02.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_03.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_04.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_05.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_06.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_07.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_08.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2024_09.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="historybox">
                                    <div className="year">
                                        <div className="num">2023</div>
                                        <div className="img_box">
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_01.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_02.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_03.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_04.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_05.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_06.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_07.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_08.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2023_09.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="month right">
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.12.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.12.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.11.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.11.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.10.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.10.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.7.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.7.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.7.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.6.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.6.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.6.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2023.5.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.5.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.5.content_2",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2023.5.content_3",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="historybox">
                                    <div className="month right">
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.10.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.10.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.9.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.9.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.9.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.7.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.7.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.7.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.4.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.4.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.4.content_2",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.3.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.3.content_1",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                {t(
                                                    "weAre.aboutUs.history.2022.2.title",
                                                )}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.2.content_1",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.2.content_2",
                                                    )}
                                                </li>
                                                <li>
                                                    {t(
                                                        "weAre.aboutUs.history.2022.2.content_3",
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="year">
                                        <div className="num on">2022</div>
                                        <div className="img_box">
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_01.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_02.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_03.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_04.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_05.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_06.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_07.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_08.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div>
                                                <img
                                                    src="img/web/sub/2022_09.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec08">
                        <div className="layout">
                            <h3 className="c_tit c_tit_kr">
                                <span>{t("weAre.aboutUs.About_Us")}</span>
                                {t("weAre.aboutUs.organization.title")}
                            </h3>
                            <div>
                                <img
                                    src={`img/web/sub/organization_${lang}.png`}
                                    alt=""
                                ></img>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec09">
                        <div className="layout">
                            <h3 className="c_tit">
                                <span>{t("weAre.aboutUs.About_Us")}</span>
                                {t("weAre.aboutUs.CI.title")}
                            </h3>
                            <div className="top">
                                <div className="flx_box">
                                    <h4>
                                        {t("weAre.aboutUs.CI.corporate.title")}
                                    </h4>
                                    <p className="normal">
                                        {/*워드마크 디자인은 유연성과 단순함을*/}
                                        {/*강조하고 있으며,{" "}*/}
                                        {/*<span>*/}
                                        {/*    다양한 네트워크 (Medical, Media, IT,*/}
                                        {/*    Big Data)*/}
                                        {/*</span>*/}
                                        {/*를 융복합하여{" "}*/}
                                        {/*<span>*/}
                                        {/*    세계 의료계 발전에 영향력이 있는*/}
                                        {/*    기업*/}
                                        {/*</span>*/}
                                        {/*이 되고자 하는 목표를 나타내고자 하였다.*/}
                                        <Trans
                                            i18nKey={
                                                "weAre.aboutUs.CI.corporate.content"
                                            }
                                            components={[<span></span>]}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="flx_box">
                                <div>
                                    <img
                                        src="img/web/sub/medicity_ci.png"
                                        alt=""
                                    ></img>
                                </div>
                                <div className="colorbox">
                                    <div className="green color">
                                        <div>
                                            <h5>M_Green</h5>
                                            PANTONE 363C<br></br>
                                            Process Color_C69 M24 Y100 K7
                                            <br></br>
                                            RGB_R86 G145 B49<br></br>
                                            #5c903f
                                        </div>
                                        <span>
                                            {t(
                                                "weAre.aboutUs.CI.corporate.green",
                                            )}
                                        </span>
                                    </div>
                                    <div className="orange color">
                                        <div>
                                            <h5>E_Orange</h5>
                                            PANTONE 1575C<br></br>
                                            Process Color_C0 M62 Y100 K0
                                            <br></br>
                                            RGB_R239 G126 B0<br></br>
                                            #f57e20
                                        </div>
                                        <span>
                                            {t(
                                                "weAre.aboutUs.CI.corporate.orange",
                                            )}
                                        </span>
                                    </div>
                                    <div className="pink color">
                                        <div>
                                            <h5>D_Red</h5>
                                            PANTONE 1787 C<br></br>
                                            Process Color_C0 M84 Y62 K0<br></br>
                                            RGB_R233 G74 B75<br></br>
                                            #f05157
                                        </div>
                                        <span>
                                            {t(
                                                "weAre.aboutUs.CI.corporate.red",
                                            )}
                                        </span>
                                    </div>
                                    <div className="purple color">
                                        <div>
                                            <h5>I_Purple</h5>
                                            PANTONE 7664C<br></br>
                                            Process Color_C59 M78 Y22 K5
                                            <br></br>
                                            RGB_R124 G74 B129<br></br>
                                            #7a5184
                                        </div>
                                        <span>
                                            {t(
                                                "weAre.aboutUs.CI.corporate.purple",
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bi">
                                <div className="top">
                                    <div className="flx_box">
                                        <h4>
                                            {t("weAre.aboutUs.CI.brand.title")}
                                        </h4>
                                        <p className="normal">
                                            {/*로고의 기본 컨셉은 세가지 시각적*/}
                                            {/*형태의 의미를 부여한다.<br></br>*/}
                                            {/*<span>*/}
                                            {/*    대한민국의 우수한 의료 기술 및*/}
                                            {/*    지식*/}
                                            {/*</span>*/}
                                            {/*을(문자 “K”), 해외 의료진에게 널리*/}
                                            {/*알려, <span>인간존중의 이념</span>에*/}
                                            {/*따라(좌측형상)<br></br>*/}
                                            {/*<span>의료계 성장 방향</span>(우측*/}
                                            {/*형상)을 형상화 하여 설명하였다*/}
                                            <Trans
                                                i18nKey={
                                                    "weAre.aboutUs.CI.brand.content"
                                                }
                                                components={[
                                                    <br></br>,
                                                    <span></span>,
                                                ]}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flx_box">
                                    <div>
                                        <img
                                            src="img/web/sub/kmedi_bi.png"
                                            alt=""
                                        ></img>
                                    </div>
                                    <div className="colorbox">
                                        <div className="red color">
                                            <div>
                                                <h5>I_RED</h5>
                                                Process Color_C0 M99 Y100 K0
                                                <br></br>
                                                RGB_R255 G0 B0<br></br>
                                                #FF0000
                                            </div>
                                            <span>
                                                {t(
                                                    "weAre.aboutUs.CI.brand.red",
                                                )}
                                            </span>
                                        </div>
                                        <div className="blue color">
                                            <div>
                                                <h5>K_BLUE</h5>
                                                Process Color_C100 M83 Y2 K0
                                                <br></br>
                                                RGB_R0 G71 B160<br></br>
                                                #0047A0
                                            </div>
                                            <span>
                                                {t(
                                                    "weAre.aboutUs.CI.brand.blue",
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec10" ref={refs.certification}>
                        <div className="layout">
                            <h3 className="c_tit">
                                <span>{t("weAre.certification.subtitle")}</span>
                                {t("weAre.certification.title")}
                            </h3>
                            <div className="box_wrap">
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi01.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_1")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi02.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_2")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi03.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_3")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi04.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_4")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi05.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_5")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi06.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_6")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi07.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_7")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi08.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_8")}</p>
                                </div>
                                <div className="certi">
                                    <img
                                        src="img/web/sub/certi09.png"
                                        alt=""
                                    ></img>
                                    <p>{t("weAre.certification.content_9")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="boxing" id="sec11" ref={refs.partners}>
                        <div className="layout">
                            <h3 className="c_tit">
                                <span>{t("weAre.partners.subtitle")}</span>
                                {t("weAre.partners.title")}
                            </h3>

                            <Partners />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default InfoWelcome;
