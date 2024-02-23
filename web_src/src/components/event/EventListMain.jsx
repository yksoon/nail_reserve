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
import { Pagination, Skeleton } from "@mui/material";

const EventListMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const userToken = useRecoilValue(userTokenAtom);

    const navigate = useNavigate();

    const imagePath = apiPath.api_img_path;

    /**
     * states
     */
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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
            board_type: "100", // event
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

                // setIsSpinner(false);
                setIsLoading(false);
            } else {
                // 에러
                CommonConsole("log", res);

                // setIsSpinner(false);
                setIsLoading(false);
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
                <h3 className="title">EVENT</h3>
                <div className="event_list">
                    <ul>
                        {!isLoading ? (
                            boardList.length !== 0 ? (
                                boardList.map((item) => (
                                    <li key={`event_list_${item.board_idx}`}>
                                        <Link
                                            to={`${routerPath.event_detail}${item.board_idx}`}
                                        >
                                            <span className="thumb">
                                                {item.file_info.length !== 0 ? (
                                                    item.file_info[0].content_type.includes(
                                                        "image",
                                                    ) ? (
                                                        <img
                                                            src={`${imagePath}${item.file_info[0].file_path_enc}`}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            src="img/main/hotel01.png"
                                                            alt=""
                                                        />
                                                    )
                                                ) : (
                                                    <img
                                                        src="img/main/hotel01.png"
                                                        alt=""
                                                    />
                                                )}
                                            </span>
                                            <div className="title_wrap">
                                                <p className="event_cate">
                                                    {item.sub_title_ko}
                                                </p>
                                                <h5 className="event_title">
                                                    {item.subject_ko}
                                                </h5>
                                                <p className="date">
                                                    {`${
                                                        item.email.split("§")[0]
                                                    } ~ ${
                                                        item.email.split("§")[1]
                                                    }`}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <a>
                                        <h5 className="event_title">
                                            데이터가 없습니다.
                                        </h5>
                                    </a>
                                </li>
                            )
                        ) : (
                            <>
                                <li>
                                    <a href="">
                                        <span className="thumb">
                                            {/*<img src="img/main/hotel01.png" alt="" />*/}
                                            <Skeleton
                                                variant="rounded"
                                                width={"100%"}
                                                height={"100%"}
                                                sx={{ borderRadius: "15px" }}
                                            />
                                        </span>
                                        <div className="title_wrap">
                                            <p className="event_cate">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1.5em" }}
                                                />
                                            </p>
                                            <h5 className="event_title">
                                                {/*St. JOHN’S HOTEL Medi-City*/}
                                                {/*Membership 한정 특가!!*/}
                                                <Skeleton
                                                    variant="text"
                                                    width={"35vw"}
                                                    sx={{
                                                        fontSize: "1.5em",
                                                        padding: "0",
                                                    }}
                                                />
                                            </h5>
                                            <p className="date">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span className="thumb">
                                            {/*<img src="img/main/hotel01.png" alt="" />*/}
                                            <Skeleton
                                                variant="rounded"
                                                width={"100%"}
                                                height={"100%"}
                                                sx={{ borderRadius: "15px" }}
                                            />
                                        </span>
                                        <div className="title_wrap">
                                            <p className="event_cate">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1.5em" }}
                                                />
                                            </p>
                                            <h5 className="event_title">
                                                {/*St. JOHN’S HOTEL Medi-City*/}
                                                {/*Membership 한정 특가!!*/}
                                                <Skeleton
                                                    variant="text"
                                                    width={"35vw"}
                                                    sx={{
                                                        fontSize: "1.5em",
                                                        padding: "0",
                                                    }}
                                                />
                                            </h5>
                                            <p className="date">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <span className="thumb">
                                            {/*<img src="img/main/hotel01.png" alt="" />*/}
                                            <Skeleton
                                                variant="rounded"
                                                width={"100%"}
                                                height={"100%"}
                                                sx={{ borderRadius: "15px" }}
                                            />
                                        </span>
                                        <div className="title_wrap">
                                            <p className="event_cate">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1.5em" }}
                                                />
                                            </p>
                                            <h5 className="event_title">
                                                {/*St. JOHN’S HOTEL Medi-City*/}
                                                {/*Membership 한정 특가!!*/}
                                                <Skeleton
                                                    variant="text"
                                                    width={"35vw"}
                                                    sx={{
                                                        fontSize: "1.5em",
                                                        padding: "0",
                                                    }}
                                                />
                                            </h5>
                                            <p className="date">
                                                <Skeleton
                                                    variant="text"
                                                    width={"30%"}
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </>
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

export default EventListMain;
