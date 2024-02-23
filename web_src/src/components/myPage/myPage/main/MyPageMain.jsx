import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userInfoAtom, userTokenAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonModal, CommonRest } from "common/js/Common";
import { successCode } from "common/js/resultCode";
import ReserveComponent from "components/myPage/myPage/main/components/ReserveComponent";
import LeftNav from "components/myPage/myPage/components/LeftNav";
import ReserveTemporaryComponent from "components/myPage/myPage/main/components/ReserveTemporaryComponent";

const MyPageMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const allowRole = ["000", "100", "300"];

    const userInfo = useRecoilValue(userInfoAtom);
    const userToken = useRecoilValue(userTokenAtom);

    const navigate = useNavigate();

    /**
     * states
     */
    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    const [boardList, setBoardList] = useState({});
    const [reserveTotalCount, setReserveTotalCount] = useState(0);
    const [reserveTemporaryTotalCount, setReserveTemporaryTotalCount] =
        useState(0);
    const [contentsQnaTotalCount, setContentsQnaTotalCount] = useState(0);
    const [contentsTotalCount, setContentsTotalCount] = useState(0);

    useEffect(() => {
        !userToken ? navigate(routerPath.main_url) : getMypageMain();
    }, []);

    /**
     * myPageMain
     */
    const getMypageMain = () => {
        setIsSpinner(true);

        // 마이페이지 리스트
        // /v1/user/mypages
        // POST
        const url = apiPath.api_mypage_list;
        const data = {
            page_num: "1",
            page_size: "10",
            main_yn: "Y",
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

                if (result_code === successCode.success) {
                    // setBoardList(result_info.filter((el) => el.show_yn === "Y"));
                    setBoardList(result_info);
                    // setPageInfo(page_info);
                    setReserveTotalCount(result_info.reserve_total_count);
                    setReserveTemporaryTotalCount(
                        result_info.reserve_temporary_total_count,
                    );
                    setContentsQnaTotalCount(
                        result_info.contents_qna_total_count,
                    );
                    setContentsTotalCount(result_info.contents_total_count);
                }

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    // 상세
    const detailBoard = (idx) => {
        setIsSpinner(true);

        // 예약 정보 상세
        // /v1/reserve/{reserve_idx}/
        // GET
        const url = apiPath.api_reserve_detail + idx;
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

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;
                setModData(result_info);

                // console.log(result_info)
                modBoard();

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    // 수정
    const modBoard = () => {
        setModalTitle("예약 상세보기");
        setIsOpen(true);
    };

    // 모달창 닫기
    const handleModalClose = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
    };

    return (
        <>
            <div className="wrap">
                <Header />

                <div id="con_area">
                    <div className="mypage clear">
                        {/*죄측 메뉴 S*/}
                        <LeftNav
                            reserveTotalCount={reserveTotalCount}
                            reserveTemporaryTotalCount={
                                reserveTemporaryTotalCount
                            }
                            contentsQnaTotalCount={contentsQnaTotalCount}
                            contentsTotalCount={contentsTotalCount}
                        />
                        {/*죄측 메뉴 E*/}

                        <div className="my_history">
                            {Object.keys(boardList).length !== 0 ? (
                                <>
                                    <h5>호텔 예약</h5>
                                    <ul>
                                        {boardList.reserve_info.length !== 0 ? (
                                            boardList.reserve_info.map(
                                                (item, idx) => (
                                                    <ReserveComponent
                                                        key={`boardList_reserve_info_${idx}`}
                                                        modData={item}
                                                        detailBoard={
                                                            detailBoard
                                                        }
                                                    />
                                                ),
                                            )
                                        ) : (
                                            <NoDataComponent />
                                        )}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <h5>호텔 예약</h5>
                                    <ul>
                                        <NoDataComponent />
                                    </ul>
                                </>
                            )}

                            {Object.keys(boardList).length !== 0 ? (
                                <>
                                    <h5>둘러본 호텔</h5>
                                    <ul>
                                        {boardList.reserve_temporary_info
                                            .length !== 0 ? (
                                            boardList.reserve_temporary_info.map(
                                                (item, idx) => (
                                                    <ReserveTemporaryComponent
                                                        key={`boardList_reserve_temporary_info_${idx}`}
                                                        modData={item}
                                                    />
                                                ),
                                            )
                                        ) : (
                                            <NoDataComponent />
                                        )}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <h5>둘러본 호텔</h5>
                                    <ul>
                                        <NoDataComponent />
                                    </ul>
                                </>
                            )}
                            {allowRole.includes(userInfo.user_role_cd) && (
                                <>
                                    {Object.keys(boardList).length !== 0 ? (
                                        <>
                                            <h5>Q&A</h5>
                                            <ul>
                                                {boardList.contents_qna_info
                                                    .length !== 0 ? (
                                                    boardList.contents_qna_info.map(
                                                        (item, idx) => (
                                                            <ReserveTemporaryComponent
                                                                key={`boardList_contents_qna_info_${idx}`}
                                                                modData={item}
                                                            />
                                                        ),
                                                    )
                                                ) : (
                                                    <NoDataComponent />
                                                )}
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <h5>Q&A</h5>
                                            <ul>
                                                <NoDataComponent />
                                            </ul>
                                        </>
                                    )}
                                </>
                            )}

                            {allowRole.includes(userInfo.user_role_cd) && (
                                <>
                                    {Object.keys(boardList).length !== 0 ? (
                                        <>
                                            <h5>동영상</h5>
                                            <ul>
                                                {boardList.contents_info
                                                    .length !== 0 ? (
                                                    boardList.contents_info.map(
                                                        (item, idx) => (
                                                            <ReserveTemporaryComponent
                                                                key={`boardList_contents_info_${idx}`}
                                                                modData={item}
                                                            />
                                                        ),
                                                    )
                                                ) : (
                                                    <NoDataComponent />
                                                )}
                                            </ul>
                                        </>
                                    ) : (
                                        <>
                                            <h5>동영상</h5>
                                            <ul>
                                                <NoDataComponent />
                                            </ul>
                                        </>
                                    )}
                                </>
                            )}

                            {/*{Object.keys(boardList).length !== 0 &&*/}
                            {/*boardList.reserve_temporary_info.length !==*/}
                            {/*    0 ? (*/}
                            {/*    boardList.reserve_temporary_info.map(*/}
                            {/*        (item, idx) => (*/}
                            {/*            <ReserveTemporaryComponent*/}
                            {/*                key={`boardList_reserve_temporary_info_${idx}`}*/}
                            {/*                modData={item}*/}
                            {/*            />*/}
                            {/*        ),*/}
                            {/*    )*/}
                            {/*) : (*/}
                            {/*    <NoDataComponent title={"예약중인 호텔"} />*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"ReserveDetailModal"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
        </>
    );
};

const NoDataComponent = () => {
    return (
        <>
            <li className="my_hotel">
                <div className="flex">
                    <p>데이터가 없습니다.</p>
                </div>
            </li>
        </>
    );
};

export default MyPageMain;
