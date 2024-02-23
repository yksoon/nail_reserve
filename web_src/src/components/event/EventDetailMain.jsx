import React, { Fragment, useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

const EventDetailMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const userToken = useRecoilValue(userTokenAtom);

    const navigate = useNavigate();

    const imagePath = apiPath.api_img_path;

    // url params
    const params = useParams();
    const boardIdx = params ? params.boardIdx : "";

    const filePath = apiPath.api_img_path;

    const [boardInfo, setBoardInfo] = useState({});

    useEffect(() => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스 입니다.",
                callback: () => navigate(routerPath.main_url),
            });
        } else {
            getBoardDetail();
        }
    }, [userToken]);

    const getBoardDetail = () => {
        setIsSpinner(true);

        // 게시판 정보 상세
        // /v1/board/{board_idx}
        // GET
        const url = apiPath.api_board_detail + boardIdx;

        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
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

                setBoardInfo(result_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const fileIcon = (type, name, enc) => {
        switch (type) {
            case "xls":
                return (
                    <p className="xls">
                        <img src="img/common/s_exl.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "xlsx":
                return (
                    <p className="xls">
                        <img src="img/common/s_exl.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "ppt":
                return (
                    <p className="ppt">
                        <img src="img/common/s_ppt.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "pptx":
                return (
                    <p className="ppt">
                        <img src="img/common/s_ppt.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "doc":
                return (
                    <p className="doc">
                        <img src="img/common/s_doc.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "docx":
                return (
                    <p className="doc">
                        <img src="img/common/s_doc.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "hwp":
                return (
                    <p className="hwp">
                        <img src="img/common/s_hwp.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "hwpx":
                return (
                    <p className="hwp">
                        <img src="img/common/s_hwp.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            case "pdf":
                return (
                    <p className="pdf">
                        <img src="img/common/s_pdf.png" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );

            default:
                return (
                    <p className="pdf">
                        <img src="img/common/file.svg" alt="" />
                        <Link to={filePath + enc}>{name}</Link>
                    </p>
                );
        }
    };

    return (
        <>
            {/*Header S*/}
            <Header />
            {/*Header E*/}

            {/*Content S*/}
            <div id="con_area">
                {Object.keys(boardInfo).length !== 0 && (
                    <>
                        <div className="notice notice_view">
                            <div className="notice_top">
                                <h3>{boardInfo.subject_ko}</h3>
                                <div className="info">
                                    {/*<p>{boardInfo.reg_dttm.split(" ")[0]}</p>*/}
                                    {/*추가로 노출해야할 정보가 있다면 p를 추가해주세용*/}
                                    {/*공지사항 view에서 사용*/}
                                    {/*<p className="hits">*/}
                                    {/*    {boardInfo.view_count}*/}
                                    {/*</p>*/}
                                    {/*/!*학회소식 view에서 사용*!/*/}
                                    <p>{boardInfo.sub_title_ko}</p>
                                    {/*/!*학회소식 view에서 사용*!/*/}
                                    {/*<Link*/}
                                    {/*    to={boardInfo.sub_title_en}*/}
                                    {/*    target="_blank"*/}
                                    {/*    className="homepage"*/}
                                    {/*>*/}
                                    {/*    {boardInfo.sub_title_en}*/}
                                    {/*</Link>*/}
                                </div>
                                {/*file_list 공지사항에서만 사용*/}
                                <div className="file_list">
                                    {boardInfo.file_info.length !== 0 &&
                                        boardInfo.file_info.map(
                                            (fileInfoItem) => (
                                                <Fragment
                                                    key={fileInfoItem.file_idx}
                                                >
                                                    {fileIcon(
                                                        fileInfoItem.file_ext,
                                                        fileInfoItem.file_name,
                                                        fileInfoItem.file_path_enc,
                                                    )}
                                                </Fragment>
                                            ),
                                        )}
                                </div>
                            </div>
                            <div className="notice_cont">
                                {boardInfo.file_info.length !== 0 &&
                                    boardInfo.file_info[0].content_type.includes(
                                        "image",
                                    ) && (
                                        <img
                                            src={`${imagePath}${boardInfo.file_info[0].file_path_enc}`}
                                            alt=""
                                        />
                                    )}
                                <p>시작일 : {boardInfo.email.split("§")[0]}</p>
                                <p>종료일 : {boardInfo.email.split("§")[1]}</p>
                                <br />
                                <pre>{boardInfo.content_ko}</pre>
                            </div>
                        </div>
                    </>
                )}
                <div className="btn_box">
                    <Link to={routerPath.event_list} className="backbtn">
                        목록으로
                    </Link>
                </div>
            </div>
            {/*Content E*/}

            {/*Footer S*/}
            <Footer />
            {/*Footer E*/}
        </>
    );
};

export default EventDetailMain;
