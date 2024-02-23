import React, { useEffect, useState } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import $ from "jquery";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";
import { Pagination } from "@mui/material";

const FaqListMain = (props) => {
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

    useEffect(() => {
        $(function () {
            $(".faq_list li").click(function () {
                $(this).children(".acc_box").slideToggle(500);
                $(this).toggleClass("on");
            });
        });
    }, [boardList]);

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
            board_type: "300", // FAQ
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

    return (
        <>
            {/*Header S*/}
            <Header />
            {/*Header E*/}

            {/*Content S*/}
            <div id="con_area">
                <h3 className="title">FAQ</h3>

                <div className="faq_list">
                    <ul>
                        {boardList.length !== 0 ? (
                            boardList.map((item) => (
                                <li key={`faq_boardList_${item.board_idx}`}>
                                    <span className="q_cont">
                                        {item.subject_ko}
                                    </span>
                                    <div className="acc_box">
                                        <span className="a_cont">
                                            <pre>{item.content_ko}</pre>
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>
                                <span className="q_cont">
                                    데이터가 없습니다.
                                </span>
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

export default FaqListMain;
