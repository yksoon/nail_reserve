import React, { useEffect, useState } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { successCode } from "common/js/resultCode";
import { Pagination } from "@mui/material";

const NoticeListMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const userToken = useRecoilValue(userTokenAtom);

    const navigate = useNavigate();

    /**
     * states
     */
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스 입니다.",
                callback: () => navigate(routerPath.main_url),
            });
        } else {
            getBoardList(page, 10, "");
        }
    }, [userToken]);

    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // 게시판 정보 목록
        // /v1/_boards
        // POST
        const url = apiPath.api_board_list;

        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
            board_type: "000", // 공지사항
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
                setPageInfo(page_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        getBoardList(value, 10, "");

        setPage(value);
    };

    const fileIcon = (type) => {
        switch (type) {
            case "xls":
                return (
                    <span>
                        <img src="img/common/exl.png" alt="" />
                    </span>
                );

            case "xlsx":
                return (
                    <span>
                        <img src="img/common/exl.png" alt="" />
                    </span>
                );

            case "ppt":
                return (
                    <span>
                        <img src="img/common/ppt.png" alt="" />
                    </span>
                );

            case "pptx":
                return (
                    <span>
                        <img src="img/common/ppt.png" alt="" />
                    </span>
                );

            case "doc":
                return (
                    <span>
                        <img src="img/common/doc.png" alt="" />
                    </span>
                );

            case "docx":
                return (
                    <span>
                        <img src="img/common/doc.png" alt="" />
                    </span>
                );

            case "hwp":
                return (
                    <span>
                        <img src="img/common/hwp.png" alt="" />
                    </span>
                );

            case "hwpx":
                return (
                    <span>
                        <img src="img/common/hwp.png" alt="" />
                    </span>
                );

            case "pdf":
                return (
                    <span>
                        <img src="img/common/pdf.png" alt="" />
                    </span>
                );

            default:
                return (
                    <span>
                        <img src="img/common/file.svg" alt="" />
                    </span>
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
                <h3 className="title">NOTICE</h3>

                <div className="notice_list">
                    <ul>
                        {boardList.length !== 0 ? (
                            boardList.map((boardListItem) => (
                                <li key={boardListItem.board_idx}>
                                    <Link
                                        to={`${routerPath.notice_detail}${boardListItem.board_idx}`}
                                    >
                                        <div className="title_wrap">
                                            <span className="num fix">
                                                공지
                                            </span>
                                            <h5 className="noti_title">
                                                {boardListItem.subject_ko}
                                            </h5>
                                        </div>
                                        <div className="info_wrap">
                                            <div className="do_icon">
                                                {boardListItem.file_info
                                                    .length !== 0 &&
                                                    fileIcon(
                                                        boardListItem
                                                            .file_info[0]
                                                            .file_ext,
                                                    )}
                                            </div>
                                            <p className="hits">
                                                {boardListItem.view_count}
                                            </p>
                                            <p className="date">
                                                {
                                                    boardListItem.reg_dttm.split(
                                                        " ",
                                                    )[0]
                                                }
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>
                                <Link to="">
                                    <div className="title_wrap">
                                        <h5 className="noti_title">
                                            등록된 공지가 없습니다.
                                        </h5>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/*페이지네이션 여기에*/}
                {boardList.length !== 0 && (
                    <div className="pagenation">
                        <Pagination
                            count={pageInfo.pages}
                            onChange={handleChange}
                            shape="rounded"
                            color="primary"
                        />
                    </div>
                )}

                <div className="btn_box">
                    <Link to={routerPath.main_url} className="backbtn">
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

export default NoticeListMain;
