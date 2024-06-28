import React, { useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify } from "etc/lib/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "etc/lib/recoils/atoms";
import { successCode } from "etc/lib/resultCode";
import { Skeleton } from "@mui/material";
import { commaOfNumber } from "etc/lib/Pattern";
import { Link } from "react-router-dom";
import Arrow from "components/web/common/Arrow";
import routerPath from "etc/lib/path/routerPath";
import { Trans, useTranslation } from "react-i18next";
import LineBreak from "etc/lib/language/web/LineBreak";

const Section01 = (props) => {
    const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언

    return (
        <>
            <div className="section01">
                <div className="sec_in">
                    <h5>{t("main.sec01.ABOUT_US")}</h5>
                    <p>
                        <Trans
                            i18nKey={"main.sec01.content"}
                            components={[<br></br>]}
                        />
                    </p>
                    <h3>{t("main.sec01.what_is_MEDI_CITY")}</h3>
                    <Link
                        to={routerPath.web_info_greet_url}
                        state={{ headerRoute: "greetings" }}
                        className="btn_main"
                    >
                        {t("main.common.VIEW_MORE")} <Arrow />
                    </Link>
                    <div className="sec01_img">
                        <div>
                            <span>
                                <img src="img/web/main/sec01_01.png" alt="" />
                            </span>
                        </div>
                        <div>
                            <span>
                                <img src="img/web/main/sec01_02.png" alt="" />
                            </span>
                            <span>
                                <img src="img/web/main/sec01_03.png" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Section01;
