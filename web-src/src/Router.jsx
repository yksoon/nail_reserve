import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import routerPath from "etc/lib/path/routerPath";

import NotFoundPage from "NotFoundPage";
import Admin from "components/admin/Admin";
import SignIn from "components/admin/signin/SignIn";
import InfoWelcome from "components/web/infos/welcome/InfoWelcome";
import KmediIntro from "components/web/kmedi/intro/KmediIntro";
import BusinessHotel from "components/web/business/hotel/BusinessHotel";
import MediaNews from "components/web/media/news/MediaNews";
import MediaNotice from "components/web/media/notice/MediaNotice";
import MediaNewsDetail from "components/web/media/news/MediaNewsDetail";
import MediaNoticeDetail from "components/web/media/notice/MediaNoticeDetail";

// Router
const Router = () => {
    // 레이지 로딩 추가
    const Main = React.lazy(() => import("components/web/Main"));

    // 페이지 url 라우팅 추가 필요시 아래에 추가하세요
    return (
        <>
            {/* Route 밖에 Suspense로 감싼다 */}
            <Suspense
                fallback={
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            >
                <Routes>
                    {/* /link를 입력하면 LinkPage 오픈 */}
                    {/* -------------------------------------------------------------- */}
                    {/* |                      web                                    | */}
                    {/* -------------------------------------------------------------- */}
                    {/* 메인 */}
                    {/* URL : / */}
                    <Route path={routerPath.web_main_url} element={<Main />} />

                    {/*--------------------- infos ----------------------*/}
                    {/* 인포 - 인사말 */}
                    {/* URL : /info/welcome */}
                    <Route
                        path={routerPath.web_info_greet_url}
                        element={<InfoWelcome />}
                    />

                    {/*--------------------- K-MEDI ----------------------*/}
                    {/* K-MEDI - 소개 */}
                    {/* URL : /kmedi/intro */}
                    <Route
                        path={routerPath.web_kmedi_intro_url}
                        element={<KmediIntro />}
                    />

                    {/*--------------------- BUSINESS ----------------------*/}
                    {/* 비즈니스 - 호텔 */}
                    {/* URL : /business/hotel */}
                    <Route
                        path={routerPath.web_business_hotel_url}
                        element={<BusinessHotel />}
                    />

                    {/*--------------------- MEDIA ----------------------*/}
                    {/* 미디어 - 뉴스 */}
                    {/* URL : /media/news */}
                    <Route
                        path={routerPath.web_media_news_url}
                        element={<MediaNews />}
                    />

                    {/* 미디어 - 뉴스 - 상세 */}
                    {/* URL : /media/news/{boardIdx} */}
                    <Route
                        path={`${routerPath.web_media_news_detail_url}:boardIdx`}
                        element={<MediaNewsDetail />}
                    />

                    {/* 미디어 - 공지 */}
                    {/* URL : /media/notice */}
                    <Route
                        path={routerPath.web_media_notice_url}
                        element={<MediaNotice />}
                    />

                    {/* 미디어 - 공지 - 상세 */}
                    {/* URL : /media/notice/{boardIdx} */}
                    <Route
                        path={`${routerPath.web_media_notice_detail_url}:boardIdx`}
                        element={<MediaNoticeDetail />}
                    />

                    {/* -------------------------------admin------------------------------- */}
                    {/* 메인 */}
                    {/* URL : /admin */}
                    <Route
                        path={routerPath.admin_main_url}
                        element={<Admin />}
                    />

                    {/* 로그인 */}
                    {/* URL : /admin/signin */}
                    <Route
                        path={routerPath.admin_signin_url}
                        element={<SignIn />}
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default Router;
