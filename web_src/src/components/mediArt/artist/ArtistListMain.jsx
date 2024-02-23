import React, { useState, useEffect } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNullCheck, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";

const ArtistListMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        getArtistList();
    }, []);

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

                // setBoardList(result_info.filter((el) => el.show_yn === "Y"));
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

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">
                    <div className="flex between">
                        <h2 className="subtitle fl">MEDI ART</h2>
                        <div className="subtitle_link fr">
                            <h2>
                                <Link to={routerPath.medi_art_gallery_list}>
                                    Gallery
                                </Link>
                            </h2>
                            <h2 className="on">
                                <Link to={routerPath.medi_art_artist_list}>
                                    Artist
                                </Link>
                            </h2>
                        </div>
                    </div>

                    <div className="listbox artist_list">
                        {CommonNullCheck(boardList) ? (
                            boardList.map((item, idx) => (
                                <figure key={item.people_idx}>
                                    <Link
                                        to={`${routerPath.medi_art_artist_detail}${item.people_idx}`}
                                    >
                                        <div className="thumb">
                                            <img
                                                src={
                                                    apiPath.api_img_path +
                                                    item.thumbnail_info[0]
                                                        .file_path_enc
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <p className="name">
                                            {/*{item.name_ko}{" "}*/}
                                            {/*<span>*/}
                                            {item.name_ko
                                                ? item.name_ko
                                                : item.name_en}
                                            {/*</span>*/}
                                        </p>
                                    </Link>
                                </figure>
                            ))
                        ) : (
                            <>데이터 없음</>
                        )}
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

export default ArtistListMain;
