import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import routerPath from "etc/lib/path/routerPath";

import NotFoundPage from "NotFoundPage";
import Admin from "components/admin/Admin";
import SignIn from "components/admin/signin/SignIn";

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
