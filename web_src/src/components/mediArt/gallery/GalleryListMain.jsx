import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNullCheck, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link } from "react-router-dom";
import { successCode } from "common/js/resultCode";
import NoImage from "./no_image.jpg";

const GalleryListMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [boardList, setBoardList] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [activePeopleIdx, setActivePeopleIdx] = useState(0);

    useEffect(() => {
        getArtistList();
        getGalleryList(0);
    }, []);

    /**
     * 아티스트 리스트 받아오기
     */
    const getArtistList = () => {
        setIsSpinner(true);

        // /v1/peoples
        // POST
        // 아티스트 리스트
        const url = apiPath.api_people_list;
        const data = {
            page_num: "1",
            page_size: "0",
            search_keyword: "",
            show_yn: "Y",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };
        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;
                const page_info = res.data.page_info;

                setArtistList(result_info);
                // setPageInfo(page_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    /**
     * 갤러리 리스트 받아오기
     */
    const getGalleryList = (people_idx) => {
        setIsSpinner(true);

        // /v1/_gallerys
        // POST
        // 갤러리 목록
        const url = apiPath.api_gallery_list;
        const data = {
            page_num: "1",
            page_size: "0",
            search_keyword: "",
            all_yn: people_idx === 0 ? "Y" : "",
            people_idx: people_idx !== 0 ? people_idx : "",
            show_yn: "Y",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };
        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;
                const page_info = res.data.page_info;

                setBoardList(result_info);
                // setPageInfo(page_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const changeArtist = (people_idx) => {
        setActivePeopleIdx(people_idx);
        getGalleryList(people_idx);
    };

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">
                    <div className="flex between">
                        <h2 className="subtitle">MEDI ART</h2>
                        <div className="subtitle_link">
                            <h2 className="on">
                                <Link to={routerPath.medi_art_gallery_list}>
                                    Gallery
                                </Link>
                            </h2>
                            <h2>
                                <Link to={routerPath.medi_art_artist_list}>
                                    Artist
                                </Link>
                            </h2>
                        </div>
                    </div>

                    <div className="galleryList">
                        <div className="gfilter">
                            <span className="gfilter_title">
                                작가별 작품보기
                            </span>
                            {artistList.length !== 0 && (
                                <Link
                                    to=""
                                    className={
                                        activePeopleIdx === 0 ? "active" : ""
                                    }
                                    onClick={() => changeArtist(0)}
                                >
                                    ALL
                                </Link>
                            )}
                            {CommonNullCheck(artistList) ? (
                                artistList.map((item, idx) => (
                                    <Link
                                        to=""
                                        key={`artistList_${idx}`}
                                        onClick={() =>
                                            changeArtist(item.people_idx)
                                        }
                                        className={
                                            activePeopleIdx === item.people_idx
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {item.name_ko}
                                    </Link>
                                ))
                            ) : (
                                <Link to="">등록 아티스트 없음</Link>
                            )}
                        </div>

                        <div
                            className={
                                activePeopleIdx === 0
                                    ? "listbox"
                                    : "listbox artistbox"
                            }
                        >
                            {CommonNullCheck(boardList) ? (
                                boardList.map((item, idx) => (
                                    <figure key={`boardList_${idx}`}>
                                        <Link
                                            to={`${routerPath.medi_art_gallery_detail}${item.work_idx}`}
                                        >
                                            <p className="thumb">
                                                {/*<img*/}
                                                {/*    loading="lazy"*/}
                                                {/*    src={*/}
                                                {/*        item.thumbnail_info*/}
                                                {/*            .length !== 0*/}
                                                {/*            ? apiPath.api_file +*/}
                                                {/*              item*/}
                                                {/*                  .thumbnail_info[0]*/}
                                                {/*                  .file_path_enc*/}
                                                {/*            : ""*/}
                                                {/*    }*/}
                                                {/*    alt=""*/}
                                                {/*/>*/}
                                                <LazyImage
                                                    src={
                                                        item.thumbnail_info
                                                            .length !== 0
                                                            ? apiPath.api_img_path +
                                                              item
                                                                  .thumbnail_info[0]
                                                                  .file_path_enc
                                                            : ""
                                                    }
                                                />
                                            </p>
                                            <p className="name">
                                                {/*{item.name_en}*/}
                                                {item.name_ko
                                                    ? item.name_ko
                                                    : item.name_en}
                                            </p>
                                            <div className="info">
                                                <p>
                                                    <span>Title</span>{" "}
                                                    {/*{item.main_title_en}*/}
                                                    {item.main_title_ko
                                                        ? item.main_title_ko
                                                        : item.main_title_en}
                                                </p>
                                                {item.size_info_show_yn ===
                                                    "Y" && (
                                                    <p>
                                                        <span>Size</span>{" "}
                                                        {/*{item.size_info_en*/}
                                                        {/*    ? item.size_info_en*/}
                                                        {/*    : item.size_info_ko}*/}
                                                        {item.size_info_ko
                                                            ? item.size_info_ko
                                                            : item.size_info_en}
                                                    </p>
                                                )}
                                                {item.materials_info_show_yn ===
                                                    "Y" && (
                                                    <p>
                                                        <span>Materials</span>{" "}
                                                        {/*{item.materials_info_en*/}
                                                        {/*    ? item.materials_info_en*/}
                                                        {/*    : item.materials_info_ko}*/}
                                                        {item.materials_info_ko
                                                            ? item.materials_info_ko
                                                            : item.materials_info_en}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </figure>
                                ))
                            ) : (
                                <>데이터 없음</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*content E*/}

            {/*footer //S*/}
            <Footer />
            {/*footer //E*/}
        </>
    );
};

const LazyImage = ({ src }) => {
    // state
    const [isLoading, setIsLoading] = useState(false);

    // ref
    const imgRef = useRef(null);
    const observer = useRef();

    // useEffect
    useEffect(() => {
        observer.current = new IntersectionObserver(intersectionObserver);
        imgRef.current && observer.current.observe(imgRef.current);

        return () => {
            observer.current && observer.current.disconnect(); // disconnect the observer on component unmount
        };
    }, []);

    // IntersectionObserver settings
    const intersectionObserver = (entries, io) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoading(true);
            }
        });
    };

    return <img ref={imgRef} src={isLoading ? src : NoImage} alt="" />;
};

export default GalleryListMain;
