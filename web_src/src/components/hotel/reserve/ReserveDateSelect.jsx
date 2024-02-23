import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonDateFormatter,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { addDays, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ko } from "date-fns/locale";

const ReserveDateSelect = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();

    // console.log(locationState);

    // 달력 세팅
    const pastMonth = new Date();

    const defaultSelected = {
        from: pastMonth,
        to: addDays(pastMonth, 1),
    };

    const [reserveInfo, setReserveInfo] = useState({});
    const [range, setRange] = useState(defaultSelected);
    const [hotelInfo, setHotelInfo] = useState({});
    const [roomInfoState, setRoomInfoState] = useState({});

    const [roomInfo, setRoomInfo] = useState(locationState?.roomInfo);
    // const roomInfo = locationState?.roomInfo;

    const fromYear = new Date().getFullYear();
    const toYear = new Date().getFullYear() + 2;

    // 과거인지 확인
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 현재 시간을 00:00:00:00으로 설정
        return date < today;
    };

    useEffect(() => {
        !locationState ? navigate(routerPath.hotel_list) : getReserve();
        // !locationState ? navigate(routerPath.hotel_list) : branchProcessing();
    }, []);

    // 호텔 리스트 -> 예약
    const getReserve = () => {
        setHotelInfo(locationState?.hotelInfo || {});

        setIsSpinner(true);

        const hotelIdx = locationState.hotelIdx;

        const url = apiPath.api_reserve;
        const data = {
            hotel_idx: hotelIdx,
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

        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;

                setReserveInfo(result_info);

                setIsSpinner(false);

                // 객실 먼저 선택하고 들어온경우
                !!roomInfo && setReserveRoom(result_info);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const setReserveRoom = (reserveInfo) => {
        setIsSpinner(true);

        const url = apiPath.api_reserve_room;
        const data = {
            reserve_idx: reserveInfo.reserve_idx,
            reserve_info: [
                {
                    room_idx: roomInfo.room_idx,
                },
            ],
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responseLogic(res),
        };

        CommonRest(restParams);

        const responseLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;

                // console.log(result_info);
                setRoomInfo(result_info[0]);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const clickNextStep = () => {
        if (!range) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "체크인/체크아웃 날짜를 선택해주세요",
            });
        } else {
            if (!range.to) {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "체크아웃 날짜를 선택해주세요",
                });
            } else {
                setIsSpinner(true);

                const hotelIdx = locationState.hotelIdx;

                const url = apiPath.api_reserve_room;
                const data = {
                    reserve_idx: reserveInfo.reserve_idx,
                    // 객실먼저 선택한 경우
                    reserve_room_idx: !!roomInfo
                        ? roomInfo.reserve_room_idx
                        : "",
                    reserve_info: [
                        {
                            // 객실먼저 선택한 경우
                            room_idx: !!roomInfo ? roomInfo.room_idx : "",
                            check_in_date: CommonDateFormatter(
                                range.from,
                                "YYYY-MM-DD",
                            ),
                            check_out_date: CommonDateFormatter(
                                range.to,
                                "YYYY-MM-DD",
                            ),
                        },
                    ],
                };

                // 파라미터
                const restParams = {
                    method: "post",
                    url: url,
                    data: data,
                    err: err,
                    callback: (res) => responseLogic(res),
                };

                CommonRest(restParams);

                const responseLogic = (res) => {
                    const result_code = res.headers.result_code;

                    // 성공
                    if (
                        result_code === successCode.success ||
                        result_code === successCode.noData
                    ) {
                        const result_info = res.data.result_info;

                        setIsSpinner(false);

                        !!roomInfo
                            ? navigate(routerPath.reserve_guest_select, {
                                  state: {
                                      hotelInfo: hotelInfo,
                                      reserveRoomsInfo: result_info,
                                      reserveInfo: reserveInfo,
                                      reserveDateInfo: range,
                                  },
                              })
                            : navigate(routerPath.reserve_room_select, {
                                  state: {
                                      hotelInfo: hotelInfo,
                                      roomsInfo: result_info,
                                      reserveInfo: reserveInfo,
                                      reserveDateInfo: range,
                                  },
                              });
                    } else {
                        // 에러
                        CommonConsole("log", res);

                        setIsSpinner(false);
                    }
                };
            }
        }
    };

    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
            {Object.keys(reserveInfo).length !== 0 && (
                <>
                    <div id="con_area">
                        <h2 className="subtitle">HOTEL 예약</h2>
                        <div className="hotel_reservation">
                            <div className="reservation_top">
                                <span className="thumb">
                                    <img
                                        // src="img/main/hotel01.png"
                                        src={`${apiPath.api_img_path}${hotelInfo.file_path_enc}`}
                                        alt=""
                                    />
                                </span>
                                <div className="info">
                                    <h3>{hotelInfo.name_ko}</h3>
                                    <h5>{hotelInfo.name_en}</h5>
                                    <div className="hotel_venue">
                                        <p>
                                            <span>
                                                <img
                                                    src="img/sub/hotel_venue.png"
                                                    alt=""
                                                />
                                            </span>
                                            {`${hotelInfo.addr1_ko} ${hotelInfo.addr2_ko}`}
                                        </p>
                                        <p>
                                            <span>
                                                <img
                                                    src="img/sub/hotel_tel.png"
                                                    alt=""
                                                />
                                            </span>
                                            {`(+${
                                                hotelInfo.inter_phone_number
                                            })${hotelInfo.phone1}-${
                                                hotelInfo.phone2
                                            }${hotelInfo.phone3 && "-"}${
                                                hotelInfo.phone3
                                            }`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="reservation">
                                <div className="left_box">
                                    <div className="calendar">
                                        <DayPicker
                                            id="test"
                                            mode="range"
                                            defaultMonth={pastMonth}
                                            selected={range}
                                            onSelect={setRange}
                                            locale={ko}
                                            captionLayout="dropdown-buttons"
                                            fromYear={fromYear}
                                            toYear={toYear}
                                            disabled={isPastDate}
                                            showOutsideDays
                                            fixedWeeks
                                        />
                                    </div>
                                </div>
                                <div className="right_box">
                                    <div className="info">
                                        <h3 className="hotel_name">
                                            {hotelInfo.name_ko}
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6>체크인</h6>
                                            <div>
                                                {range && (
                                                    <p>
                                                        {`${CommonDateFormatter(
                                                            range.from,
                                                            "ko",
                                                        )}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6>체크아웃</h6>
                                            <div>
                                                {range && (
                                                    <p>
                                                        {`${
                                                            range.to
                                                                ? CommonDateFormatter(
                                                                      range.to,
                                                                      "ko",
                                                                  )
                                                                : "-"
                                                        }`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/*<div>*/}
                                        {/*    <h6>인원 수</h6>*/}
                                        {/*    <div>*/}
                                        {/*        <p>성인 <button><img src="img/sub/remove.png" alt=""/>*/}
                                        {/*        </button> 1명 <button><img src="img/sub/add.png" alt=""/></button></p>*/}
                                        {/*        <p>아동 <button><img src="img/sub/remove.png" alt=""/>*/}
                                        {/*        </button> 1명 <button><img src="img/sub/add.png" alt=""/></button> <span>만 0세-17세</span>*/}
                                        {/*        </p>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*    <h6>객실 수</h6>*/}
                                        {/*    <div>*/}
                                        {/*        <p>*/}
                                        {/*            <button><img src="img/sub/remove.png" alt=""/></button>*/}
                                        {/*            1개 <button><img src="img/sub/add.png" alt=""/></button></p>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                    <Link
                                        // href="hotel_reservation_step2.html"
                                        to=""
                                        className="next_btn"
                                        onClick={clickNextStep}
                                    >
                                        다음
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="btn_box">
                            <Link
                                to={routerPath.hotel_list}
                                className="backbtn"
                            >
                                뒤로 가기
                            </Link>
                        </div>
                    </div>
                </>
            )}
            {/* Content E */}

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default ReserveDateSelect;
