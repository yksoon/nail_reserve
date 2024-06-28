import React, { useEffect } from "react";
import { RestServer } from "etc/lib/CommonRestAPI";
import axios from "axios";
import Router from "Router";
import { useLocation, useNavigate } from "react-router";
import { ConfirmContextProvider } from "etc/lib/context/ContextProvider";
import { AlertContextProvider } from "etc/lib/context/ContextProvider";
import ConfirmModal from "etc/lib/commonNoti/ConfirmModal";
import AlertModal from "etc/lib/commonNoti/AlertModal";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    codesAtom,
    countryBankAtom,
    globalLanguageAtom,
    ipInfoAtom,
    resultCodeAtom,
    userInfoAtom,
    userTokenAtom,
} from "etc/lib/recoils/atoms";
import Aos from "aos";
import { registration_idx } from "etc/lib/static";
import { CommonNotify } from "etc/lib/Common";
import { successCode } from "etc/lib/resultCode";
import apiPath from "etc/lib/path/apiPath";
import { Helmet } from "react-helmet-async";
import SEOMetaTag from "SEOMetaTag";
import { Container } from "@mui/material";

let currentPath = "";
function App() {
    const location = useLocation();

    const globalLanguage = useRecoilValue(globalLanguageAtom);

    // console.log(globalLanguage);

    useEffect(() => {
        const loadCSS = async (path) => {
            try {
                if (
                    path === "/admin" ||
                    path === "/admin/" ||
                    path === "/admin/signin" ||
                    path === "/admin/signin/"
                ) {
                    await import("etc/css/adm.css");
                } else {
                    await import("etc/css/style.css");
                }
            } catch (error) {
                console.error("Failed to load CSS", error);
            }
        };

        loadCSS(location.pathname);
    }, [location]);

    return (
        <>
            <Container maxWidth="sm">
                <ConfirmContextProvider>
                    <AlertContextProvider>
                        <Router />
                        <AlertModal />
                        <ConfirmModal />
                    </AlertContextProvider>
                </ConfirmContextProvider>
                {/* {isSpinner && <CommonSpinner />} */}
            </Container>
            {/* <div>{spinnerOption.isLoading && <CommonSpinner />}</div> */}
        </>
    );
}

export default App;
