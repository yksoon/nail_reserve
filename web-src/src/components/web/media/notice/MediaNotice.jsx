import React, { useEffect, useState } from "react";
import Header from "components/web/common/header";
import Footer from "components/web/common/footer";
import Arrow from "components/web/common/Arrow";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonParseHTMLString,
} from "etc/lib/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "etc/lib/recoils/atoms";
import apiPath from "etc/lib/path/apiPath";
import { boardType } from "etc/lib/static";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";
import { successCode } from "etc/lib/resultCode";
import { Link } from "react-router-dom";
import routerPath from "etc/lib/path/routerPath";
import { Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";

const MediaNotice = (props) => {
    const { t, i18n } = useTranslation();

    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const isSpinner = useRecoilValue(isSpinnerAtom);

    /**
     * 리스트에 보여질 항목 갯수
     * @type {number}
     */
    const pageSize = 8;

    /**
     * 리스트 state
     */
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    useEffect(() => {
        getBoardList(1, pageSize, "");
    }, []);

    /**
     * 리스트 가져오기
     * @param pageNum
     * @param pageSize
     * @param searchKeyword
     */
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // /v1/_boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            pageNum: pageNum,
            pageSize: pageSize,
            searchKeyword: searchKeyword,
            boardType: boardType.notice, // 공지사항
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRestAPI(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            let resultCode = res.headers.resultcode;

            // 성공
            if (
                resultCode === successCode.success ||
                resultCode === successCode.noData
            ) {
                let resultInfo = res.data.resultInfo;
                let pageInfo = res.data.pageInfo;

                setBoardList(resultInfo);
                setPageInfo(pageInfo);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    /**
     * 페이지네이션 이동
     * @param e
     * @param value
     */
    const handleChange = (e, value) => {
        getBoardList(value, pageSize, "");
    };

    return (
        <>
            <Header />
            <div id="subvisual">
                <div className="sub_txt">
                    <h2>MEDIA CENTER</h2>
                </div>
                <div id="leftmenu">
                    <Link to={routerPath.web_media_news_url}>
                        {t("media.subvisual.subtitle.news")}
                    </Link>
                    <Link
                        to={routerPath.web_media_notice_url}
                        className="active"
                    >
                        {t("media.subvisual.subtitle.notice")}
                    </Link>
                </div>
            </div>
            <div id="con_area">
                <div className="notice">
                    <h3 className="c_tit">
                        <span>{t("media.notice.subtitle")}</span>
                        {t("media.notice.title")}
                    </h3>
                    <div className="list_wrap">
                        {/*반복 시작*/}
                        {boardList.length !== 0 ? (
                            boardList.map((item) => (
                                <div
                                    className="list_box"
                                    key={`noticeList_${item.boardIdx}`}
                                >
                                    <div className="txt_wrap">
                                        <h5>{item.subject}</h5>
                                        <p>
                                            {CommonParseHTMLString(
                                                item.content,
                                            )}
                                        </p>
                                    </div>
                                    <Link
                                        to={`${routerPath.web_media_notice_detail_url}${item.boardIdx}`}
                                        className="btn_main"
                                    >
                                        {t("media.view_more")} <Arrow />
                                    </Link>
                                </div>
                            ))
                        ) : !isSpinner ? (
                            <div className="list_box">
                                <div className="txt_wrap">
                                    <h5>{t("media.no_data")}</h5>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {/*반복 끝*/}
                    </div>
                    {Object.keys(pageInfo).length !== 0 &&
                        pageInfo.total !== 0 && (
                            <div className="pagenation">
                                <Pagination
                                    count={pageInfo.pages}
                                    onChange={handleChange}
                                    shape="rounded"
                                    color="primary"
                                />
                            </div>
                        )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MediaNotice;
