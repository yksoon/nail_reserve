import { CommonSpinner } from "etc/lib/Common";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { globalLanguageAtom, isSpinnerAtom } from "etc/lib/recoils/atoms";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import routerPath from "etc/lib/path/routerPath";
import { Trans, useTranslation } from "react-i18next";
import LineBreak from "etc/lib/language/web/LineBreak";
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from "@mui/material";

function Footer() {
    const { t, i18n } = useTranslation();

    const globalLanguage = useRecoilValue(globalLanguageAtom);

    const [selectedValue, setSelectedValue] = useState(
        globalLanguage === "id" ? "indonesia" : "korea",
    );

    useEffect(() => {
        globalLanguage === "id"
            ? setSelectedValue("indonesia")
            : setSelectedValue("korea");
    }, [globalLanguage]);

    const companySelect = [
        {
            key: "korea",
            name: t("footer.selectBox.korea"),
        },
        {
            key: "indonesia",
            name: t("footer.selectBox.indonesia"),
        },
        {
            key: "gangwon",
            name: t("footer.selectBox.gangwon"),
        },
    ];

    const isSpinner = useRecoilValue(isSpinnerAtom);
    const location = useLocation();
    useEffect(() => {
        // 상단으로이동 퀵버튼 등장
        // if (location.pathname === "/") {
        document.addEventListener("scroll", function () {
            let currentScrollValue = document.documentElement.scrollTop;
            let gotop = document.getElementById("go_top");

            if (gotop) {
                if (currentScrollValue > 100) {
                    gotop.style.opacity = "1";
                } else {
                    gotop.style.opacity = "0";
                }
            }
        });
        // }
    }, []);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <>
            {/* footer //S */}
            <div id="go_top">
                <a onClick={goToTop} style={{ cursor: "pointer" }}>
                    <img src="img/common/go_top.png" alt="상단으로 이동" />
                </a>
            </div>

            <div id="footer">
                <div id="footer_content">
                    <div className="footer_top">
                        <img src="/img/web/main/logo.png" alt="" />
                        <ul>
                            <li>
                                <Link
                                    to={routerPath.web_info_greet_url}
                                    state={{ headerRoute: "greetings" }}
                                >
                                    WE ARE
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={routerPath.web_kmedi_intro_url}
                                    state={{ headerRoute: "intro" }}
                                >
                                    K-MEDI
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={routerPath.web_business_hotel_url}
                                    state={{ headerRoute: "hotel" }}
                                >
                                    BUSINESS
                                </Link>
                            </li>
                            <li>
                                <Link to={routerPath.web_media_news_url}>
                                    MEDIA CENTER
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <address>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <FormControl
                                                fullWidth
                                                sx={{ margin: "0 10px 15px 0" }}
                                                size={"small"}
                                            >
                                                {/*<InputLabel*/}
                                                {/*    id="demo-simple-select-label"*/}
                                                {/*    sx={{ color: "white" }}*/}
                                                {/*>*/}
                                                {/*    Company*/}
                                                {/*</InputLabel>*/}
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={selectedValue}
                                                    // label="Company"
                                                    onChange={handleChange}
                                                    sx={{
                                                        color: "white",
                                                        border: "1px solid #fff",
                                                        ".MuiOutlinedInput-notchedOutline":
                                                            {
                                                                borderColor:
                                                                    "rgba(228, 219, 233, 0.25)",
                                                            },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                            {
                                                                borderColor:
                                                                    "rgba(228, 219, 233, 0.25)",
                                                            },
                                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                                            {
                                                                borderColor:
                                                                    "rgba(228, 219, 233, 0.25)",
                                                            },
                                                        ".MuiSvgIcon-root ": {
                                                            fill: "white !important",
                                                        },
                                                    }}
                                                >
                                                    {companySelect.map(
                                                        (item) => (
                                                            <MenuItem
                                                                key={`footer_${item.key}`}
                                                                value={item.key}
                                                            >
                                                                {item.name}
                                                            </MenuItem>
                                                        ),
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {t(
                                                `footer.${selectedValue}.buisnessman`,
                                            )}
                                        </th>
                                        <td>
                                            {t(
                                                `footer.${selectedValue}.buisnessman_content`,
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {t(
                                                `footer.${selectedValue}.representative`,
                                            )}
                                        </th>
                                        <td>
                                            {t(
                                                `footer.${selectedValue}.representative_content`,
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {t(
                                                `footer.${selectedValue}.Company_Registration_Number`,
                                            )}
                                        </th>
                                        <td>
                                            {t(
                                                `footer.${selectedValue}.Company_Registration_Number_content`,
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {t(
                                                `footer.${selectedValue}.address`,
                                            )}
                                        </th>
                                        {/*<td>{t("footer.address_content")}</td>*/}
                                        <td>
                                            <Trans
                                                i18nKey={`footer.${selectedValue}.address_content`}
                                                components={[<br></br>]}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="f_logo">
                            <a
                                href="https://www.instagram.com/medicitykorea"
                                target="_blank"
                            >
                                <img src="/img/web/main/f_insta.png" alt="" />
                            </a>
                            <a
                                href="https://www.youtube.com/@medi-city"
                                target="_blank"
                            >
                                <img src="/img/web/main/f_youtube.png" alt="" />
                            </a>
                        </div>
                    </address>
                    <div className="copy">{LineBreak(t("footer.copy"))}</div>
                </div>
            </div>
            {/* footer //E */}
            {isSpinner && <CommonSpinner />}
        </>
    );
}

export default Footer;
