import React, { useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonCommaPattern,
    CommonConsole,
    CommonDateFormatter,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, isSpinnerAtom } from "recoils/atoms";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { apiPath, routerPath } from "webPath";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { successCode } from "common/js/resultCode";

const ReserveRoomSelect = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);
    const BED_TYPE = codes.filter((el) => el.code_type === "BED_TYPE");

    const [hotelInfo, setHotelInfo] = useState({});
    const [roomsInfo, setRoomsInfo] = useState([]);
    const [reserveInfo, setReserveInfo] = useState({});
    const [reserveDateInfo, setReserveDateInfo] = useState({});

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    // 룸 선택 체크
    const [checkItems, setCheckItems] = useState([]);

    useEffect(() => {
        !locationState ? navigate(routerPath.hotel_list) : setReserveData();
    }, []);

    const setReserveData = () => {
        setHotelInfo(locationState?.hotelInfo || {});
        setReserveInfo(locationState?.reserveInfo || {});
        setRoomsInfo(locationState?.roomsInfo || []);
        setReserveDateInfo(locationState?.reserveDateInfo || {});
    };

    const handleSingleCheck = (checked, obj) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, obj]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== obj));
        }
    };

    const grandTotalFunc = () => {
        const totalOriginPrices = checkItems.map((item) =>
            item.summary_info.reduce(
                (total, product) => total + Number(product.room_price),
                0,
            ),
        );

        const grandTotal = totalOriginPrices.reduce(
            (acc, totalPrice) => acc + totalPrice,
            0,
        );

        return grandTotal;
    };

    const clickNextStep = () => {
        if (checkItems.length === 0) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "객실을 선택해주세요.",
            });
        } else {
            setIsSpinner(true);

            let reserve_info_arr = [];
            const checkItemsLength = checkItems.length;
            for (let i = 0; i < checkItemsLength; i++) {
                let newObj = {
                    room_idx: checkItems[i].room_idx,
                    check_in_date: CommonDateFormatter(
                        reserveDateInfo.from,
                        "YYYY-MM-DD",
                    ),
                    check_out_date: CommonDateFormatter(
                        reserveDateInfo.to,
                        "YYYY-MM-DD",
                    ),
                };

                reserve_info_arr.push(newObj);
            }

            const url = apiPath.api_reserve_room;
            const data = {
                reserve_idx: reserveInfo.reserve_idx,
                reserve_room_idx: checkItems[0].reserve_room_idx,
                reserve_info: reserve_info_arr,
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

                    console.log(result_info);

                    setIsSpinner(false);

                    navigate(routerPath.reserve_guest_select, {
                        state: {
                            hotelInfo: hotelInfo,
                            reserveRoomsInfo: result_info,
                            reserveInfo: reserveInfo,
                            reserveDateInfo: reserveDateInfo,
                        },
                    });
                } else {
                    // 에러
                    CommonConsole("log", res);

                    setIsSpinner(false);
                }
            };
        }
    };

    // 모달창 닫기
    const handleModalClose = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
    };

    const openRoomDetail = (item) => {
        setModalTitle("");
        setModData({
            hotelInfo: hotelInfo,
            roomInfo: item,
        });
        setIsOpen(true);
    };

    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
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
                                    {`(+${hotelInfo.inter_phone_number})${
                                        hotelInfo.phone1
                                    }-${hotelInfo.phone2}${
                                        hotelInfo.phone3 && "-"
                                    }${hotelInfo.phone3}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    {roomsInfo.length !== 0 ? (
                        <>
                            <div className="reservation">
                                <div className="left_box">
                                    <FormGroup>
                                        <ul className="room_list">
                                            {roomsInfo.length !== 0 ? (
                                                roomsInfo.map((item) => (
                                                    <FormControlLabel
                                                        className="room"
                                                        key={`room_${item.room_idx}`}
                                                        sx={{
                                                            display: "block",
                                                            margin: 0,
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        }
                                                        onChange={(e) =>
                                                            handleSingleCheck(
                                                                e.target
                                                                    .checked,
                                                                item,
                                                            )
                                                        }
                                                        label={
                                                            <li
                                                                className={
                                                                    checkItems.filter(
                                                                        (el) =>
                                                                            el ===
                                                                            item,
                                                                    ).length ===
                                                                    0
                                                                        ? "room"
                                                                        : "room active"
                                                                }
                                                            >
                                                                <div className="info_box">
                                                                    <div className="info">
                                                                        <div className="thumb">
                                                                            <img
                                                                                src={`${apiPath.api_img_path}${item.attachment_file_info[0].file_path_enc}`}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <h5 className="room_name">
                                                                                {
                                                                                    item.room_name_en
                                                                                }{" "}
                                                                            </h5>
                                                                            <h6>
                                                                                {
                                                                                    item.room_name_ko
                                                                                }
                                                                            </h6>
                                                                            <div className="service_icon">
                                                                                <p>
                                                                                    객실크기{" "}
                                                                                    {
                                                                                        item.room_size
                                                                                    }

                                                                                    m
                                                                                    <sup>
                                                                                        2
                                                                                    </sup>
                                                                                </p>
                                                                                <p>
                                                                                    기준인원{" "}
                                                                                    {
                                                                                        item.min_people
                                                                                    }{" "}
                                                                                    인
                                                                                </p>
                                                                                <p>
                                                                                    최대인원{" "}
                                                                                    {
                                                                                        item.max_people
                                                                                    }{" "}
                                                                                    인
                                                                                </p>

                                                                                <p>
                                                                                    <img
                                                                                        src="img/icon/BED.svg"
                                                                                        alt=""
                                                                                    />{" "}
                                                                                    {item
                                                                                        .additional_info
                                                                                        .length !==
                                                                                        0 &&
                                                                                        item.additional_info.filter(
                                                                                            (
                                                                                                el,
                                                                                            ) =>
                                                                                                el.key_name ===
                                                                                                "BED_TYPE",
                                                                                        )
                                                                                            .length !==
                                                                                            0 &&
                                                                                        item.additional_info
                                                                                            .filter(
                                                                                                (
                                                                                                    el,
                                                                                                ) =>
                                                                                                    el.key_name ===
                                                                                                    "BED_TYPE",
                                                                                            )[0]
                                                                                            .additional_memo.split(
                                                                                                ",",
                                                                                            )
                                                                                            .map(
                                                                                                (
                                                                                                    item,
                                                                                                    idx,
                                                                                                ) =>
                                                                                                    idx !==
                                                                                                    0
                                                                                                        ? `, ${
                                                                                                              BED_TYPE.filter(
                                                                                                                  (
                                                                                                                      el,
                                                                                                                  ) =>
                                                                                                                      el.code_key ===
                                                                                                                      item,
                                                                                                              )[0]
                                                                                                                  .code_value_ko
                                                                                                          }`
                                                                                                        : BED_TYPE.filter(
                                                                                                              (
                                                                                                                  el,
                                                                                                              ) =>
                                                                                                                  el.code_key ===
                                                                                                                  item,
                                                                                                          )[0]
                                                                                                              .code_value_ko,
                                                                                            )}
                                                                                    {item
                                                                                        .additional_info
                                                                                        .length !==
                                                                                        0 &&
                                                                                        item.additional_info.filter(
                                                                                            (
                                                                                                el,
                                                                                            ) =>
                                                                                                el.key_name ===
                                                                                                "BED_COUNT",
                                                                                        )
                                                                                            .length !==
                                                                                            0 && (
                                                                                            <>
                                                                                                {` / ${
                                                                                                    item.additional_info.filter(
                                                                                                        (
                                                                                                            el,
                                                                                                        ) =>
                                                                                                            el.key_name ===
                                                                                                            "BED_COUNT",
                                                                                                    )[0]
                                                                                                        .additional_memo
                                                                                                } 개`}
                                                                                            </>
                                                                                        )}
                                                                                </p>
                                                                            </div>
                                                                            <Link
                                                                                to=""
                                                                                className="font-12 additional_info_btn"
                                                                                onClick={(
                                                                                    e,
                                                                                ) =>
                                                                                    openRoomDetail(
                                                                                        item,
                                                                                    )
                                                                                }
                                                                            >
                                                                                추가정보
                                                                                보기
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pay">
                                                                        <p className="cost">
                                                                            ₩
                                                                            {CommonCommaPattern(
                                                                                item.summary_info.reduce(
                                                                                    (
                                                                                        total,
                                                                                        product,
                                                                                    ) =>
                                                                                        total +
                                                                                        Number(
                                                                                            product.origin_price,
                                                                                        ),
                                                                                    0,
                                                                                ),
                                                                                3,
                                                                            )}
                                                                        </p>
                                                                        <p className="price">
                                                                            ₩
                                                                            <span className="room_price">
                                                                                {CommonCommaPattern(
                                                                                    item.summary_info.reduce(
                                                                                        (
                                                                                            total,
                                                                                            product,
                                                                                        ) =>
                                                                                            total +
                                                                                            Number(
                                                                                                product.room_price,
                                                                                            ),
                                                                                        0,
                                                                                    ),
                                                                                    3,
                                                                                )}
                                                                            </span>
                                                                        </p>
                                                                        {/*<p className="sale">*/}
                                                                        {/*    40% 할인*/}
                                                                        {/*</p>*/}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        }
                                                    />
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </ul>
                                    </FormGroup>
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
                                                {Object.keys(reserveDateInfo)
                                                    .length !== 0 && (
                                                    <p>
                                                        {`${CommonDateFormatter(
                                                            reserveDateInfo.from,
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
                                                {Object.keys(reserveDateInfo)
                                                    .length !== 0 && (
                                                    <p>
                                                        {`${
                                                            reserveDateInfo.to
                                                                ? CommonDateFormatter(
                                                                      reserveDateInfo.to,
                                                                      "ko",
                                                                  )
                                                                : "-"
                                                        }`}
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
                                            <h6>객실 수</h6>
                                            <div>
                                                <p>{checkItems.length}개</p>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6>룸타입</h6>
                                            <div className="room_type">
                                                {checkItems.length !== 0 &&
                                                    checkItems.map((item) => (
                                                        <p
                                                            key={`checkItems_${item.room_idx}`}
                                                            style={{
                                                                textAlign:
                                                                    "right",
                                                            }}
                                                        >
                                                            {item.room_name_en}
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <h6>결제금액</h6>
                                            <div>
                                                <p
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <strong className="room_amount">
                                                        {checkItems.length !== 0
                                                            ? CommonCommaPattern(
                                                                  grandTotalFunc(),
                                                                  3,
                                                              )
                                                            : 0}
                                                    </strong>
                                                    원<span>부가세 포함</span>
                                                </p>
                                            </div>
                                        </div>
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
                        </>
                    ) : (
                        <>
                            <div className="reservation">
                                <h3>등록 된 객실이 없습니다.</h3>
                            </div>
                        </>
                    )}
                </div>
                <div className="btn_box">
                    <Link to={routerPath.hotel_list} className="backbtn">
                        뒤로 가기
                    </Link>
                </div>
            </div>

            <CommonModal
                isOpen={isOpen}
                title={""}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"ReserveRoomDetailModal"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />

            {/* Content E */}

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default ReserveRoomSelect;
