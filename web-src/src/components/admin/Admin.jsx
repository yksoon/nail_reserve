import { CommonErrModule, CommonSpinner } from "etc/lib/Common";
import SideNav from "components/admin/common/SideNav";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { successCode } from "etc/lib/resultCode";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    isSpinnerAtom,
    pageAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "etc/lib/recoils/atoms";
import routerPath from "etc/lib/path/routerPath";
import apiPath from "etc/lib/path/apiPath";
import {CommonRestAPI} from "etc/lib/CommonRestAPI";
import NoticeBoardManage from "components/admin/board/notice/NoticeBoardManage";
import {useLocation} from "react-router-dom";
import ContentsBoardManage from "components/admin/board/contents/ContentsBoardManage";

const Admin = () => {
    // const location = useLocation();
    //
    // useEffect(() => {
    //     const path = location.pathname;
    //     // /admin
    //     if (path === '/admin') {
    //         import('etc/css/adm.css');
    //     }
    // }, [ location ])

    const err = CommonErrModule();
    const isSpinner = useRecoilValue(isSpinnerAtom);
    const [isRefresh, setIsRefresh] = useState(false);

    const navigate = useNavigate();

    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);
    const userInfoAdmin = useRecoilValue(userInfoAdminAtom);

    // recoil
    const [page, setPage] = useRecoilState(pageAtom);

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        if (!userTokenAdmin) {
            navigate(routerPath.admin_signin_url);
        } else {
            requestMenu();
        }
    }, []);

    const requestMenu = () => {
        // 메뉴 리스트 호출
        // /v1/menus
        // GET
        const url = apiPath.api_admin_menus;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y", // 어드민일때 이 값을 넣으세요~
        };

        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            const resultCode = res.headers.resultcode;
            let resData = [];

            if (resultCode === successCode.success) {
                resData = res.data.resultInfo;

                createMenuList(resData);
            }
        };
    };

    const createMenuList = (menuData) => {
        let menuArr = [];
        let depth1 = [];
        let depth2 = [];
        let depth3 = [];

        menuData.map((item) => {
            let menuOnce = {};

            menuOnce["title"] = item.menuNameKo;
            menuOnce["page"] = item.menuPath ? item.menuPath : "";
            menuOnce["child"] = [];
            menuOnce["menuCode"] = Number(item.menuCode);

            if (item.menuDepth === 0) {
                depth1.push(menuOnce);
            } else if (item.menuDepth === 1) {
                depth2.push(menuOnce);
            } else {
                depth3.push(menuOnce);
            }
            return item;
        });

        depth2.map((item2) => {
            depth3.map((item3) => {
                if (
                    item3.menuCode > item2.menuCode &&
                    item3.menuCode < item2.menuCode + 100
                ) {
                    depth2
                        .find((e) => e.menuCode === item2.menuCode)
                        .child.push(item3);
                }

                return item3;
            });

            return item2;
        });

        depth1.map((item1) => {
            depth2.map((item2) => {
                if (
                    item2.menuCode > item1.menuCode &&
                    item2.menuCode < item1.menuCode + 1000
                ) {
                    depth1
                        .find((e) => e.menuCode === item1.menuCode)
                        .child.push(item2);
                }

                return item2;
            });

            return item1;
        });

        menuArr = depth1;
        setMenuList(menuArr);
    };

    const switchPage = (page) => {
        setIsRefresh(!isRefresh);
        setPage(page);
    };

    // 렌더링 페이지
    const renderPage = (page) => {
        switch (page) {
            // 게시판관리 - 공지사항
            case "noticeBoard":
                return <NoticeBoardManage isRefresh={isRefresh} />;

            // 게시판관리 - 컨텐츠
            case "contentBoard":
                return <ContentsBoardManage isRefresh={isRefresh} />;

            default:
                return <NoticeBoardManage isRefresh={isRefresh} />;
        }
    };
    return (
        <>
            <div className="wrap">
                <div className="admin">
                    {userInfoAdmin && (
                        <SideNav
                            userInfoAdmin={userInfoAdmin}
                            switchPage={switchPage}
                            menuList={menuList}
                        />
                    )}
                    {renderPage(page)}
                </div>
            </div>
            {isSpinner && <CommonSpinner />}
        </>
    );
};

export default Admin;
