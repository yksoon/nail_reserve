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
import ReserveComponent from "components/myPage/myPage/reserve/components/ReserveComponent";
import { Pagination } from "@mui/material";
import LeftNav from "components/myPage/myPage/components/LeftNav";

const ReserveMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

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
    const [pageInfo, setPageInfo] = useState({});
    const [page, setPage] = useState(1);
    const [reserveTotalCount, setReserveTotalCount] = useState(0);
    const [reserveTemporaryTotalCount, setReserveTemporaryTotalCount] =
        useState(0);
    const [contentsQnaTotalCount, setContentsQnaTotalCount] = useState(0);
    const [contentsTotalCount, setContentsTotalCount] = useState(0);

    useEffect(() => {
        !userToken ? navigate(routerPath.main_url) : getMypageMain(page, 10);
    }, [isNeedUpdate]);

    /**
     * myPageMain
     */
    const getMypageMain = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // 마이페이지 리스트
        // /v1/user/mypages
        // POST
        const url = apiPath.api_mypage_list;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            main_yn: "N",
            detail_type: "000", // 예약현황
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
                result_code === successCode.success
                // || result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;
                const page_info = res.data.page_info;

                // setBoardList(result_info.filter((el) => el.show_yn === "Y"));
                setBoardList(result_info ?? {});
                setPageInfo(page_info ?? {});
                setReserveTotalCount(result_info.reserve_total_count);
                setReserveTemporaryTotalCount(
                    result_info.reserve_temporary_total_count,
                );
                setContentsQnaTotalCount(result_info.contents_qna_total_count);
                setContentsTotalCount(result_info.contents_total_count);

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                // 에러
                CommonConsole("log", res);
            }
        };
    };

    /**
     * 리스트 새로고침
     */
    const handleNeedUpdate = () => {
        setModalTitle("");
        setIsOpen(false);
        setModData({});
        setIsNeedUpdate(!isNeedUpdate);
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

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        getMypageMain(value, 10);

        setPage(value);
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
                            <h3 className="title">호텔 예약</h3>
                            <ul>
                                {Object.keys(boardList).length !== 0 &&
                                boardList.reserve_info.length !== 0 ? (
                                    boardList.reserve_info.map((item, idx) => (
                                        <ReserveComponent
                                            key={`boardList_reserve_info_${idx}`}
                                            modData={item}
                                            detailBoard={detailBoard}
                                        />
                                    ))
                                ) : (
                                    <>데이터가 없습니다.</>
                                )}
                            </ul>

                            {Object.keys(pageInfo).length !== 0 &&
                                pageInfo.total !== 0 && (
                                    <div className="pagenation">
                                        <Pagination
                                            count={pageInfo.pages}
                                            onChange={handleChange}
                                            shape="rounded"
                                            color="primary"
                                        />
                                    </div>
                                )}
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
                handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
        </>
    );
};

export default ReserveMain;
