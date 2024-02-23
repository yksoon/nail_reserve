import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import { Skeleton } from "@mui/material";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useRecoilState } from "recoil";
import { userTokenAtom } from "recoils/atoms";

function MainNews() {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();

    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBoardList(1, 7, "");
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
        <>
            <div className="main_news">
                <div className="title">
                    <h3>학회소식</h3>
                    <p>의료관련 학회소식</p>
                </div>
                {!isLoading ? (
                    boardList.length < 4 && boardList.length > 0 ? (
                        <ul className="block_3">
                            {boardList.map((item, idx) => (
                                <li
                                    className={idx === 0 ? "comming" : ""}
                                    key={`news_main_${item.board_idx}`}
                                >
                                    <a
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            needToken(
                                                `${routerPath.news_detail}${item.board_idx}`,
                                            )
                                        }
                                    >
                                        <h4 className="font-24">
                                            {item.subject_ko}
                                        </h4>
                                        <p className="font-18 gray-6">{`${
                                            item.email.split("§")[0]
                                        } ~ ${item.email.split("§")[1]}`}</p>
                                        <p className="font-18 gray-6">
                                            {item.sub_title_ko}
                                        </p>
                                    </a>
                                    {item.sub_title_en && (
                                        <Link
                                            to={item.sub_title_en}
                                            target="_blank"
                                            className="home_btn"
                                        >
                                            <img
                                                src="/img/common/home.png"
                                                alt=""
                                            />
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : boardList.length !== 0 ? (
                        <>
                            <ul className="block_3">
                                {boardList.slice(0, 3).map((item, idx) => (
                                    <li
                                        className={idx === 0 ? "comming" : ""}
                                        key={`news_main_${item.board_idx}`}
                                    >
                                        <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                needToken(
                                                    `${routerPath.news_detail}${item.board_idx}`,
                                                )
                                            }
                                        >
                                            <h4 className="font-24">
                                                {item.subject_ko}
                                            </h4>
                                            <p className="font-18 gray-6">{`${
                                                item.email.split("§")[0]
                                            } ~ ${
                                                item.email.split("§")[1]
                                            }`}</p>
                                            <p className="font-18 gray-6">
                                                {item.sub_title_ko}
                                            </p>
                                        </a>
                                        {item.sub_title_en && (
                                            <Link
                                                to={item.sub_title_en}
                                                target="_blank"
                                                className="home_btn"
                                            >
                                                <img
                                                    src="/img/common/home.png"
                                                    alt=""
                                                />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <ul className="block_4">
                                {boardList.slice(3).map((item, idx) => (
                                    <li key={`news_main_${item.board_idx}`}>
                                        <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                needToken(
                                                    `${routerPath.news_detail}${item.board_idx}`,
                                                )
                                            }
                                        >
                                            <h4 className="font-24">
                                                {item.subject_ko}
                                            </h4>
                                            <p className="font-18 gray-6">{`${
                                                item.email.split("§")[0]
                                            } ~ ${
                                                item.email.split("§")[1]
                                            }`}</p>
                                            <p className="font-18 gray-6">
                                                {item.sub_title_ko}
                                            </p>
                                        </a>
                                        {item.sub_title_en && (
                                            <Link
                                                to={item.sub_title_en}
                                                target="_blank"
                                                className="home_btn"
                                            >
                                                <img
                                                    src="/img/common/home.png"
                                                    alt=""
                                                />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div className="main_board">
                            <div className="flex">
                                <div className="main_faq">
                                    <ul>
                                        <li>
                                            <Link to="">
                                                <h4 className="font-21">
                                                    데이터가 없습니다.
                                                </h4>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <>
                        <ul className="block_3">
                            <li className="comming">
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                        </ul>
                        <ul className="block_4">
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <h4 className="font-24">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.5rem" }}
                                            width={"40%"}
                                        />
                                    </h4>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"30%"}
                                        />
                                    </p>
                                    <p className="font-18 gray-6">
                                        <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "1.2rem" }}
                                            width={"20%"}
                                        />
                                    </p>
                                </a>
                                <a className="home_btn">
                                    <img src="/img/common/home.png" alt="" />
                                </a>
                            </li>
                        </ul>
                    </>
                )}
                {/*<ul className="block_3">*/}
                {/*    <li className="comming">*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">IANR 2023</h4>*/}
                {/*            <p className="font-18 gray-6">2023. 11. 03 ~ 04</p>*/}
                {/*            <p className="font-18 gray-6">세종컨벤션</p>*/}
                {/*        </a>*/}
                {/*        <a*/}
                {/*            href="https://ianr2023korea.org/"*/}
                {/*            target="_blank"*/}
                {/*            className="home_btn"*/}
                {/*        >*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">*/}
                {/*                한국원자력협의회 심포지움*/}
                {/*            </h4>*/}
                {/*            <p className="font-18 gray-6">2023. 08. 17 ~ 18</p>*/}
                {/*            <p className="font-18 gray-6">강릉세인트존스호텔</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">Conference</h4>*/}
                {/*            <p className="font-18 gray-6">2000.00.00 ~ 00.00</p>*/}
                {/*            <p className="font-18 gray-6">Venue</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
                {/*<ul className="block_4">*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">Conference</h4>*/}
                {/*            <p className="font-18 gray-6">2000.00.00 ~ 00.00</p>*/}
                {/*            <p className="font-18 gray-6">Venue</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">Conference</h4>*/}
                {/*            <p className="font-18 gray-6">2000.00.00 ~ 00.00</p>*/}
                {/*            <p className="font-18 gray-6">Venue</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">Conference</h4>*/}
                {/*            <p className="font-18 gray-6">2000.00.00 ~ 00.00</p>*/}
                {/*            <p className="font-18 gray-6">Venue</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="">*/}
                {/*            <h4 className="font-24">Conference</h4>*/}
                {/*            <p className="font-18 gray-6">2000.00.00 ~ 00.00</p>*/}
                {/*            <p className="font-18 gray-6">Venue</p>*/}
                {/*        </a>*/}
                {/*        <a href="" className="home_btn">*/}
                {/*            <img src="/img/common/home.png" alt="" />*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </>
    );
}

export default MainNews;
