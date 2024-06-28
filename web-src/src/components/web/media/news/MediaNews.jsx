import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/header";
import Footer from "components/web/common/footer";
import Arrow from "components/web/common/Arrow";
import { Link } from "react-router-dom";
import routerPath from "etc/lib/path/routerPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonGetYoutubeThumbnailUrl,
} from "etc/lib/Common";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { boardCategoryAtom, isSpinnerAtom } from "etc/lib/recoils/atoms";
import apiPath from "etc/lib/path/apiPath";
import { boardType } from "etc/lib/static";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";
import { successCode } from "etc/lib/resultCode";
import { useTranslation } from "react-i18next";
import { Pagination } from "@mui/material";

const MediaNews = (props) => {
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
    const pageSize = 20;

    const searchInput = useRef(null);

    /**
     * 리스트 state
     */
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    // const [categoryState, setCategoryState] = useState("");
    const [categoryState, setCategoryState] = useRecoilState(boardCategoryAtom);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleCategory = (category) => {
        setCategoryState(category);

        switch (category) {
            case "":
                document.getElementById("전체").classList.add("on");
                document.getElementById("영상").classList.remove("on");
                document.getElementById("뉴스").classList.remove("on");
                break;

            case "영상":
                document.getElementById("영상").classList.add("on");
                document.getElementById("전체").classList.remove("on");
                document.getElementById("뉴스").classList.remove("on");
                break;

            case "뉴스":
                document.getElementById("뉴스").classList.add("on");
                document.getElementById("영상").classList.remove("on");
                document.getElementById("전체").classList.remove("on");
                break;
        }
    };

    useEffect(() => {
        getBoardList(1, pageSize, searchKeyword, categoryState);

        handleCategory(categoryState);
    }, [categoryState]);

    /**
     * 리스트 가져오기
     * @param pageNum
     * @param pageSize
     * @param searchKeyword
     */
    const getBoardList = (pageNum, pageSize, searchKeyword, category) => {
        setIsSpinner(true);

        // /v1/_boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            pageNum: pageNum,
            pageSize: pageSize,
            searchKeyword: searchKeyword,
            boardType: boardType.etc, // 공지사항
            boardCategory: category,
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
        getBoardList(value, pageSize, searchKeyword, categoryState);
    };

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(
    //     resultInfo[0].content,
    //     "text/html",
    // );
    //
    // console.log(doc);
    //
    // const firstImage = doc.querySelector("img").src;
    // console.log(firstImage);

    const isHaveImg = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");

        const firstImage = doc.querySelector("img")?.src;

        return firstImage;
    };

    const doSearch = () => {
        const inputValue = searchInput.current.value;
        setSearchKeyword(inputValue);

        getBoardList(1, pageSize, inputValue, categoryState);
    };

    const mouseover = (e, src) => {
        e.target.children[0].src = src;
    };

    const mouseleave = (e, src) => {
        e.target.children[0].src = src;
    };

    return (
        <>
            <Header />
            <div id="subvisual">
                <div className="sub_txt">
                    <h2>{t("media.subvisual.title")}</h2>
                </div>
                <div id="leftmenu">
                    <Link to={routerPath.web_media_news_url} className="active">
                        {t("media.subvisual.subtitle.news")}
                    </Link>
                    <Link to={routerPath.web_media_notice_url}>
                        {t("media.subvisual.subtitle.notice")}
                    </Link>
                </div>
            </div>
            <div id="con_area">
                <div className="medicenter">
                    <div className="top">
                        <h3 className="c_tit">
                            <span>{t("media.news.subtitle")}</span>
                            {t("media.news.title")}
                        </h3>
                        <div className="search_wrap">
                            <div className="search">
                                <input
                                    type="text"
                                    defaultValue={searchKeyword}
                                    ref={searchInput}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={doSearch}
                                >
                                    {t("media.search")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <Link
                            to=""
                            onClick={() => handleCategory("")}
                            id="전체"
                            className="on"
                            onMouseOver={
                                categoryState !== ""
                                    ? (e) =>
                                          mouseover(e, "img/web/sub/all_wh.svg")
                                    : null
                            }
                            onMouseLeave={
                                categoryState !== ""
                                    ? (e) =>
                                          mouseleave(e, "img/web/sub/all.svg")
                                    : null
                            }
                        >
                            <img
                                src={
                                    categoryState === ""
                                        ? "img/web/sub/all_wh.svg"
                                        : "img/web/sub/all.svg"
                                }
                                alt=""
                            ></img>
                            {/* <img src="img/web/sub/media.svg" alt=""></img>  */}
                            {t("media.news.category.all")}
                        </Link>
                        <Link
                            to=""
                            onClick={() => handleCategory("영상")}
                            id="영상"
                            onMouseOver={
                                categoryState !== "영상"
                                    ? (e) =>
                                          mouseover(
                                              e,
                                              "img/web/sub/media_wh.svg",
                                          )
                                    : null
                            }
                            onMouseLeave={
                                categoryState !== "영상"
                                    ? (e) =>
                                          mouseleave(e, "img/web/sub/media.svg")
                                    : null
                            }
                        >
                            <img
                                src={
                                    categoryState === "영상"
                                        ? "img/web/sub/media_wh.svg"
                                        : "img/web/sub/media.svg"
                                }
                                alt=""
                            ></img>
                            {t("media.news.category.video")}
                        </Link>
                        <Link
                            to=""
                            onClick={() => handleCategory("뉴스")}
                            id="뉴스"
                            onMouseOver={
                                categoryState !== "뉴스"
                                    ? (e) =>
                                          mouseover(
                                              e,
                                              "img/web/sub/news_wh.svg",
                                          )
                                    : null
                            }
                            onMouseLeave={
                                categoryState !== "뉴스"
                                    ? (e) =>
                                          mouseleave(e, "img/web/sub/news.svg")
                                    : null
                            }
                        >
                            <img
                                src={
                                    categoryState === "뉴스"
                                        ? "img/web/sub/news_wh.svg"
                                        : "img/web/sub/news.svg"
                                }
                                alt=""
                            ></img>
                            {t("media.news.category.news")}
                        </Link>
                    </div>

                    <div className="boxwrap">
                        {/*반복 시작*/}
                        {boardList.length !== 0 &&
                            boardList.map((item) => (
                                <figure key={`contentsList_${item.boardIdx}`}>
                                    <div
                                        // to={`${routerPath.web_media_news_detail_url}${item.boardIdx}`}
                                        className="box"
                                    >
                                        <Link
                                            to={`${routerPath.web_media_news_detail_url}${item.boardIdx}`}
                                        >
                                            {item.subTitle === "뉴스"
                                                ? isHaveImg(item.content) && (
                                                      <div className="imgwrap">
                                                          <img
                                                              src={isHaveImg(
                                                                  item.content,
                                                              )}
                                                              alt={item.subject}
                                                          ></img>
                                                      </div>
                                                  )
                                                : CommonGetYoutubeThumbnailUrl(
                                                      item.email,
                                                  ) && (
                                                      <div className="imgwrap">
                                                          <img
                                                              src={CommonGetYoutubeThumbnailUrl(
                                                                  item.email,
                                                              )}
                                                              alt={item.subject}
                                                          ></img>
                                                      </div>
                                                  )}

                                            <div className="txtwrap">
                                                <p className="name">
                                                    {item.subject.replaceAll(
                                                        "&amp;",
                                                        "&",
                                                    )}
                                                </p>
                                                <Link
                                                    to={`${routerPath.web_media_news_detail_url}${item.boardIdx}`}
                                                    className="btn_main"
                                                >
                                                    {t("media.view_more")}{" "}
                                                    <Arrow />
                                                </Link>
                                            </div>
                                        </Link>
                                    </div>
                                </figure>
                            ))}
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

export default MediaNews;
