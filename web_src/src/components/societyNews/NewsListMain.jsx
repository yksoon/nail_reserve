import React, { useEffect, useState } from "react";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";
import { Pagination } from "@mui/material";

const NewsListMain = (props) => {
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
            board_type: "200", // 공지사항
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

    const isWithinOneWeek = (start_date) => {
        // 현재 날짜를 가져옵니다
        const currentDate = new Date();

        // start_date를 Date 객체로 변환합니다
        const startDate = new Date(start_date);

        // 일주일에 해당하는 밀리초 계산 (1주일 = 7일 * 24시간 * 60분 * 60초 * 1000밀리초)
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

        // 현재 날짜와 start_date 사이의 차이를 일주일 이내에 있는지 확인합니다
        const isWithinWeek =
            Math.abs(currentDate.getTime() - startDate.getTime()) <
            oneWeekInMillis;

        // 결과를 반환합니다
        return isWithinWeek;
    };

    return (
        <>
            {/*Header S*/}
            <Header />
            {/*Header E*/}

            {/*Content S*/}
            <div id="con_area">
                <h3 className="title">학회소식</h3>
                {boardList.length !== 0 ? (
                    <div className="conf_list">
                        <ul>
                            {/*<li className="coming">*/}
                            {/*    <a href="">*/}
                            {/*        <div className="title_wrap">*/}
                            {/*            <h5 className="conf_title">행사명</h5>*/}
                            {/*            <p className="date">*/}
                            {/*                2023-06-01 ~ 2023-07-30*/}
                            {/*            </p>*/}
                            {/*            <p className="venue">세종컨벤션</p>*/}
                            {/*        </div>*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            {boardList.map((item) => (
                                <li
                                    key={`boardList_${item.board_idx}`}
                                    className={
                                        isWithinOneWeek(
                                            item.email.split("§")[0],
                                        )
                                            ? "coming"
                                            : ""
                                    }
                                >
                                    <Link
                                        to={`${routerPath.news_detail}${item.board_idx}`}
                                    >
                                        <div className="title_wrap">
                                            <h5 className="conf_title">
                                                {item.subject_ko}
                                            </h5>
                                            <p className="date">
                                                {`${
                                                    item.email.split("§")[0]
                                                } ~ ${
                                                    item.email.split("§")[1]
                                                }`}
                                            </p>
                                            <p className="venue">
                                                {item.sub_title_ko}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>등록된 데이터가 없습니다.</div>
                )}

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

export default NewsListMain;
