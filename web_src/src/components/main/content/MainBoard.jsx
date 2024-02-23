import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import { Link, useNavigate } from "react-router-dom";

function MainBoard() {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [faqList, setFaqList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBoardList(1, 4, "");
    }, []);

    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        // setIsSpinner(true);
        setIsLoading(true);

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
                // setPageInfo(page_info);

                // setIsLoading(false);
                // setIsSpinner(false);

                getFaqList(1, 4, "");
            } else {
                // 에러
                CommonConsole("log", res);

                setIsLoading(false);
                // setIsSpinner(false);
            }
        };
    };

    const getFaqList = (pageNum, pageSize, searchKeyword) => {
        // setIsSpinner(true);
        // setIsLoading(true);

        // 게시판 정보 목록
        // /v1/_boards
        // POST
        const url = apiPath.api_board_list;

        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
            board_type: "300", // faq
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

                setFaqList(result_info);
                // setPageInfo(page_info);

                setIsLoading(false);
                // setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsLoading(false);
                // setIsSpinner(false);
            }
        };
    };

    // 로그인 필요
    const needToken = (url) => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스입니다.",
                callback: () => inputId.current.focus(),
            });
        } else {
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("html").style.paddingRight = "0";
            // hotelIdx 변수를 올바르게 사용하도록 수정
            navigate(url);
        }
    };

    return (
        <div className="main_board">
            <div className="flex">
                <div className="main_faq">
                    <div className="title">
                        <h3>FAQ</h3>
                        <p>자주묻는질문</p>
                    </div>
                    <ul>
                        {/*{faqItems.map((item, idx) => (*/}
                        {/*    <li key={`main_board_faq_${idx}`}>*/}
                        {/*        <a href="">*/}
                        {/*            <h4 className="font-21">{item.title}</h4>*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*))}*/}
                        {!isLoading ? (
                            faqList.length !== 0 ? (
                                faqList.map((item) => (
                                    <li
                                        key={`main_board_faq_${item.board_idx}`}
                                    >
                                        <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                needToken(routerPath.faq_list)
                                            }
                                        >
                                            <h4 className="font-21">
                                                {item.subject_ko}
                                            </h4>
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Link to="">
                                        <h4 className="font-21">
                                            데이터가 없습니다.
                                        </h4>
                                    </Link>
                                </li>
                            )
                        ) : (
                            <>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="main_notice">
                    <div className="title">
                        <h3>NOTICE</h3>
                        <p>공지사항</p>
                    </div>
                    <ul>
                        {!isLoading ? (
                            boardList.length !== 0 ? (
                                boardList.map((item, idx) => (
                                    <li
                                        key={`main_board_notice_${item.board_idx}`}
                                    >
                                        <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                needToken(
                                                    `${routerPath.notice_detail}${item.board_idx}`,
                                                )
                                            }
                                        >
                                            <h4 className="font-21">
                                                {item.subject_ko}
                                            </h4>
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Link to="">
                                        <h4 className="font-21">
                                            데이터가 없습니다.
                                        </h4>
                                    </Link>
                                </li>
                            )
                        ) : (
                            <>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="font-21">
                                        <a>
                                            <Skeleton
                                                variant="text"
                                                sx={{ fontSize: "1.5rem" }}
                                                width={"70%"}
                                            />
                                        </a>
                                    </h4>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MainBoard;
