import React, { useEffect, useState, useRef } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonCommaPattern,
    CommonConsole,
    CommonDateFormatter,
    CommonErrModule,
    CommonNotify,
    CommonRest,
    CommonInputNumberPattern,
    CommonModal,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, isSpinnerAtom, userInfoAtom } from "recoils/atoms";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { successCode } from "common/js/resultCode";
import RadioGroupSelection from "components/common/RadioGroupSelection";
import { privacy, terms } from "components/hotel/reserve/modal/terms";
import LeftNav from "components/myPage/myPage/components/LeftNav";

const ReserveDetail = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);
    const BED_TYPE = codes.filter((el) => el.code_type === "BED_TYPE");
    const GENDER = codes.filter((el) => el.code_type === "GENDER");
    const GUEST_TYPE = codes
        .filter((el) => el.code_type === "GUEST_TYPE")
        .filter((el) => el.code_key !== "000");

    const reserveMemo = useRef(null);
    // const termsCheck = useRef(null);

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    const setGenderArr = () => {
        let retArr = [];

        GENDER?.length !== 0 &&
            GENDER.map((item) => {
                const obj = {
                    value: item.code_key,
                    label: item.code_value_ko,
                };

                retArr.push(obj);
            });

        return retArr;
    };

    const radioItemsGender = setGenderArr();

    const userInfo = useRecoilValue(userInfoAtom);

    const [hotelInfo, setHotelInfo] = useState({});
    const [reserveRoomsInfo, setReserveRoomsInfo] = useState([]);
    const [reserveInfo, setReserveInfo] = useState({});
    const [reserveDateInfo, setReserveDateInfo] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setReserveData();
    }, []);

    const setReserveData = () => {
        setHotelInfo(locationState?.hotelInfo || {});
        setReserveInfo(locationState?.reserveInfo || {});
        setReserveRoomsInfo(locationState?.reserveRoomsInfo || []);
        setReserveDateInfo(locationState?.reserveDateInfo || {});

        setIsLoaded(true);
    };

    useEffect(() => {
        if (isLoaded) {
            let newReserveRoomsInfoArr = [];
            reserveRoomsInfo.map((item) => {
                let obj = {
                    ...item,
                    reserve_guest_info: [
                        {
                            idx: 1,
                            reserve_room_idx: item.reserve_room_idx,
                            guest_type: "100",
                            gender: "0",
                            guest_name_first_ko: "",
                            guest_name_last_ko: "",
                            guest_name_first_en: "",
                            guest_name_last_en: "",
                            inter_phone_number: "82",
                            email: "",
                            phone1: "",
                            phone2: "",
                            phone3: "",
                        },
                    ],
                };

                newReserveRoomsInfoArr.push(obj);
            });

            setReserveRoomsInfo(newReserveRoomsInfoArr);
        }
    }, [isLoaded]);

    /**
     * 결제 최종 가격
     * @returns {*}
     */
    const grandTotalFunc = () => {
        const totalOriginPrices = reserveRoomsInfo.map((item) =>
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

    /**
     * 투숙객 추가 /삭제
     * @param type
     * @param idx
     */
    const handleOtherPriceInfo = (
        type,
        reserve_room_idx,
        idx,
        keyInfo,
        valueInfo,
    ) => {
        switch (type) {
            case "add":
                const newState = [...reserveRoomsInfo];

                newState.forEach((room) => {
                    if (room.reserve_room_idx === reserve_room_idx) {
                        room.reserve_guest_info.push({
                            idx:
                                room.reserve_guest_info[
                                    room.reserve_guest_info.length - 1
                                ].idx + 1,
                            reserve_room_idx: reserve_room_idx,
                            guest_type: "100",
                            gender: "0",
                            guest_name_first_ko: "",
                            guest_name_last_ko: "",
                            guest_name_first_en: "",
                            guest_name_last_en: "",
                            inter_phone_number: "82",
                            email: "",
                            phone1: "",
                            phone2: "",
                            phone3: "",
                        });
                    }
                });

                setReserveRoomsInfo(newState);

                break;

            case "remove":
                const newStateRemove = reserveRoomsInfo.map((room) => {
                    if (room.reserve_room_idx === reserve_room_idx) {
                        // 특정 조건에 따라 요소를 제거하고 싶다면 조건을 여기에 추가
                        if (room.reserve_guest_info.length <= 1) {
                            CommonNotify({
                                type: "alert",
                                hook: alert,
                                message: "최소 1명은 필수입니다.",
                            });
                        } else {
                            room.reserve_guest_info =
                                room.reserve_guest_info.filter(
                                    (guest) => guest.idx !== idx,
                                );
                        }
                    }
                    return room;
                });

                setReserveRoomsInfo(newStateRemove);

                break;

            case "mod":
                const newStateMod = reserveRoomsInfo.map((room) => {
                    if (room.reserve_room_idx === reserve_room_idx) {
                        // 특정 조건에 따라 요소를 찾아 내용을 수정하고 싶다면 여기에 추가
                        room.reserve_guest_info = room.reserve_guest_info.map(
                            (guest) => {
                                if (guest.idx === idx) {
                                    // 특정 조건에 따라 내용을 수정
                                    return {
                                        ...guest,
                                        // 수정할 속성들을 추가 또는 변경
                                        [keyInfo]: valueInfo,
                                        // 다른 속성들도 필요에 따라 추가 또는 변경
                                    };
                                }
                                return guest;
                            },
                        );
                    }
                    return room;
                });

                setReserveRoomsInfo(newStateMod);
                break;

            default:
                break;
        }
    };

    // 다음 버튼
    const clickNextStep = () => {
        if (validation()) {
            setIsSpinner(true);

            const reservePersonInfo = {
                guest_type: "000",
                gender: "",
                guest_name_first_ko: userInfo.user_name_first_ko,
                guest_name_last_ko: userInfo.user_name_last_ko,
                guest_name_first_en: userInfo.user_name_first_en,
                guest_name_last_en: userInfo.user_name_last_en,
                inter_phone_number: "82",
                email: userInfo.user_id,
                phone1: userInfo.mobile1,
                phone2: userInfo.mobile2,
                phone3: userInfo.mobile3,
            };

            let newReserveArr = [];
            const reserveRoomsInfoLength = reserveRoomsInfo.length;
            for (let i = 0; i < reserveRoomsInfoLength; i++) {
                let reservePerson = {
                    ...reservePersonInfo,
                    reserve_room_idx: reserveRoomsInfo[i].reserve_room_idx,
                };

                newReserveArr.push(reservePerson);

                const reserveGuestInfoLength =
                    reserveRoomsInfo[i].reserve_guest_info.length;
                for (let j = 0; j < reserveGuestInfoLength; j++) {
                    newReserveArr.push(
                        reserveRoomsInfo[i].reserve_guest_info[j],
                    );
                }
            }

            const url = apiPath.api_reserve_guest;
            const data = {
                guest_info: newReserveArr,
                reserve_memo: reserveMemo.current.value,
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

                    // console.log("111111111", result_info);

                    setIsSpinner(false);

                    if (result_code === successCode.success) {
                        navigate(routerPath.reserve_payment_select, {
                            state: {
                                hotelInfo: hotelInfo,
                                reserveRoomsInfo: reserveRoomsInfo,
                                reserveInfo: reserveInfo,
                                reserveDateInfo: reserveDateInfo,
                                reservePaymentModel: result_info,
                            },
                        });
                    } else {
                        CommonNotify({
                            type: "alert",
                            hook: alert,
                            message: "잠시 후 다시 시도해주세요",
                        });
                    }
                } else {
                    // 에러
                    CommonConsole("log", res);

                    setIsSpinner(false);
                }
            };
        }
    };

    const validation = () => {
        const reserveRoomsInfoLength = reserveRoomsInfo.length;
        for (let i = 0; i < reserveRoomsInfoLength; i++) {
            const guestInfoLength =
                reserveRoomsInfo[i].reserve_guest_info.length;
            for (let j = 0; j < guestInfoLength; j++) {
                if (
                    !reserveRoomsInfo[i].reserve_guest_info[j]
                        .guest_name_first_ko ||
                    !reserveRoomsInfo[i].reserve_guest_info[j]
                        .guest_name_last_ko
                ) {
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "투숙객의 이름을 입력해주세요",
                    });

                    return false;
                }

                if (
                    reserveRoomsInfo[i].reserve_guest_info[j].guest_type !==
                    "400"
                ) {
                    if (
                        !reserveRoomsInfo[i].reserve_guest_info[j].phone1 ||
                        !reserveRoomsInfo[i].reserve_guest_info[j].phone2 ||
                        !reserveRoomsInfo[i].reserve_guest_info[j].phone3
                    ) {
                        CommonNotify({
                            type: "alert",
                            hook: alert,
                            message: "투숙객의 연락처를 입력해주세요",
                        });

                        return false;
                    }

                    if (!reserveRoomsInfo[i].reserve_guest_info[j].email) {
                        CommonNotify({
                            type: "alert",
                            hook: alert,
                            message: "투숙객의 이메일을 입력해주세요",
                        });

                        return false;
                    }
                }
            }
        }

        // if (!termsCheck.current.checked) {
        //     CommonNotify({
        //         type: "alert",
        //         hook: alert,
        //         message: "이용약관에 체크 해주세요",
        //     });
        //
        //     return false;
        // }

        return true;
    };

    // 모달 열기
    const openTermsModal = (termsType) => {
        switch (termsType) {
            case "terms":
                setModalTitle("이용약관");
                setModData(terms);
                setIsOpen(true);

                break;

            case "privacy":
                setModalTitle("개인정보 처리방침");
                setModData(privacy);
                setIsOpen(true);

                break;

            default:
                break;
        }
    };

    // 모달창 닫기
    const handleModalClose = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
    };


    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
            {/* {reserveRoomsInfo.length !== 0 && ( */}
                <>
                    <div id="con_area">
                        <h2 className="subtitle">HOTEL 예약</h2>
                        <div className="mypage clear">
                            {/*죄측 메뉴 S*/}
                            <LeftNav />
                            {/* <LeftNav reserveTotalCount={reserveTotalCount} /> */}
                            {/*죄측 메뉴 E*/}

                            <div className="my_history">
                                <div className="hotel_reservation my_hotel_detail">
                                    {/*호텔 정보 S*/}
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
                                    {/*호텔 정보 E*/}

                                    {/*예약한 객실 정보 S*/}
                                    <div className="hotel_list">
                                        <ul>
                                            {/* {hotelList.length !== 0 &&
                                                hotelList.map((item, idx) => ( */}
                                                    <li key={`hotelList_${idx}`}>
                                                        <span className="hotel_list_thumb">
                                                            <img
                                                                // src="img/main/hotel01.png"
                                                                src={`${apiPath.api_img_path}${item.file_path_enc}`}
                                                                alt=""
                                                            />
                                                        </span>
                                                        <div className="hotel_list_txt">
                                                            <h3>{item.name_ko}</h3>
                                                            <h5>{item.name_en}</h5>
                                                            <div className="hotel_venue">
                                                                <span>
                                                                    <Rating
                                                                        name="simple-controlled"
                                                                        value={Number(item.grade)}
                                                                        max={7}
                                                                        readOnly
                                                                    />
                                                                </span>
                                                                <p>
                                                                    <span>
                                                                        <img
                                                                            src="img/sub/hotel_venue.png"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    {`${item.addr1_ko} ${item.addr2_ko}`}
                                                                </p>
                                                                <p>
                                                                    <span>
                                                                        <img
                                                                            src="img/sub/hotel_tel.png"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    {`(+${
                                                                        item.inter_phone_number
                                                                    })${item.phone1}-${
                                                                        item.phone2
                                                                    }${item.phone3 && "-"}${
                                                                        item.phone3
                                                                    }`}
                                                                </p>
                                                            </div>
                                                            {/*<div className="hotel_intro">*/}
                                                            {/*    <p className="hotel_intro_text">*/}
                                                            {/*        {item.info_ko}*/}
                                                            {/*    </p>*/}
                                                            {/*</div>*/}
                                                            <HotelIntro
                                                                key={`hotel_${idx}`}
                                                                info_ko={item.info_ko}
                                                            />
                                                            <div className="hotel_btn">
                                                                {item.price_info?.length !== 0 && (
                                                                    <Link
                                                                        to={
                                                                            routerPath.reserve_date_select
                                                                        }
                                                                        state={{
                                                                            hotelIdx:
                                                                                item.hotel_idx,
                                                                            hotelInfo: item,
                                                                        }}
                                                                        className="hotel_list_btn blue"
                                                                    >
                                                                        예약 바로가기{" "}
                                                                        <span>
                                                                            <img
                                                                                src="/img/sub/btn_arrow_color.png"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                    </Link>
                                                                )}
                                                                <Link
                                                                    to={`${routerPath.hotel_detail}${item.hotel_idx}`}
                                                                    state={{
                                                                        hotelIdx: item.hotel_idx,
                                                                        hotelListInfo: item,
                                                                    }}
                                                                    className="hotel_list_btn"
                                                                >
                                                                    호텔 상세보기{" "}
                                                                    <span>
                                                                        <img
                                                                            src="/img/sub/btn_arrow_gray.png"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                {/* ))} */}
                                        </ul>
                                    </div>
                                    {/*예약한 객실 정보 E*/}

                                    <div className="reservation">
                                        {/*예약자 정보 S*/}
                                        <div className="input_box">
                                            <div className="title">
                                                <h3>예약자 정보</h3>
                                            </div>
                                            <div className="reservation_person">
                                                <div className="name_box">
                                                    <h5>이름</h5>
                                                    <div>
                                                        {userInfo.user_name_first_ko} {userInfo.user_name_last_ko}
                                                    </div>
                                                </div>
                                                <div className="phone_box">
                                                    <h5>연락처</h5>
                                                    <div
                                                        id="phone_num"
                                                        className="m0"
                                                    >
                                                        {userInfo.mobile1} - {userInfo.mobile2} - {userInfo.mobile3}
                                                    </div>
                                                </div>
                                                <div className="email_box">
                                                    <h5>이메일</h5>
                                                    <div>
                                                        {userInfo.user_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*예약자 정보 E*/}

                                        {/*객실, 투숙객 정보 S*/}
                                        <ul className="room_list">
                                            {reserveRoomsInfo.length !== 0 &&
                                                reserveRoomsInfo.map((item) => (
                                                    <li
                                                        className="room input_box"
                                                        key={`reserveRoomsInfo_${item.reserve_room_idx}`}
                                                    >
                                                        <div className="info_box">
                                                            <div className="info">
                                                                <div className="thumb">
                                                                    <img
                                                                        src="img/sub/room_sam01.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h5 className="room_name">
                                                                        {
                                                                            item.room_name_en
                                                                        }
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
                                                            </div>
                                                        </div>

                                                        <>
                                                            <div
                                                                style={{
                                                                    marginTop:
                                                                        "40px",
                                                                }}
                                                            >
                                                                <div className="title flex guest_info">
                                                                    <h3>
                                                                        투숙객 정보{" "}
                                                                        <span
                                                                            className="guest_add_btn"
                                                                            onClick={() =>
                                                                                handleOtherPriceInfo(
                                                                                    "add",
                                                                                    item.reserve_room_idx,
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </span>
                                                                    </h3>
                                                                    {/*<div className="flex">*/}
                                                                    {/*    <input*/}
                                                                    {/*        type="checkbox"*/}
                                                                    {/*        id="guest_info"*/}
                                                                    {/*        className="hide"*/}
                                                                    {/*    />*/}
                                                                    {/*    <label*/}
                                                                    {/*        htmlFor="guest_info"*/}
                                                                    {/*        className="checkbox"*/}
                                                                    {/*    >*/}
                                                                    {/*        <svg*/}
                                                                    {/*            width="9.772"*/}
                                                                    {/*            height="7.181"*/}
                                                                    {/*            viewBox="0 0 9.772 7.181"*/}
                                                                    {/*            fill="#bdbdbd"*/}
                                                                    {/*        >*/}
                                                                    {/*            <path*/}
                                                                    {/*                d="M0,6.181a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414L4.474-.707a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.414L.707,5.888A1,1,0,0,1,0,6.181Z"*/}
                                                                    {/*                transform="translate(3.591 1)"*/}
                                                                    {/*            />*/}
                                                                    {/*            <path*/}
                                                                    {/*                d="M2.591,3.591A1,1,0,0,1,1.883,3.3L-.707.707a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0L3.3,1.883a1,1,0,0,1-.707,1.707Z"*/}
                                                                    {/*                transform="translate(1 3.591)"*/}
                                                                    {/*            />*/}
                                                                    {/*        </svg>*/}
                                                                    {/*    </label>*/}
                                                                    {/*    예약자*/}
                                                                    {/*    정보와*/}
                                                                    {/*    같습니다.*/}
                                                                    {/*</div>*/}
                                                                </div>
                                                                {item.reserve_guest_info &&
                                                                    item
                                                                        .reserve_guest_info
                                                                        .length !==
                                                                        0 &&
                                                                    item.reserve_guest_info.map(
                                                                        (
                                                                            item2,
                                                                            idx,
                                                                        ) => (
                                                                            <div
                                                                                className="guest_box"
                                                                                key={`reserve_guest_info_${item.reserve_room_idx}_${item2.idx}`}
                                                                            >
                                                                                <div className="guest">
                                                                                    <div className="guest_title">
                                                                                        <h4 className="guest_num">
                                                                                            {`투숙객 ${
                                                                                                idx +
                                                                                                1
                                                                                            }`}
                                                                                        </h4>
                                                                                        <Link
                                                                                            to=""
                                                                                            className="guest_remove"
                                                                                            onClick={() =>
                                                                                                handleOtherPriceInfo(
                                                                                                    "remove",
                                                                                                    item.reserve_room_idx,
                                                                                                    item2.idx,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            투숙객
                                                                                            삭제
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="name_box">
                                                                                        <h5>
                                                                                            이름
                                                                                        </h5>
                                                                                        <div>
                                                                                            <input
                                                                                                type="name"
                                                                                                className="input"
                                                                                                placeholder="성"
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleOtherPriceInfo(
                                                                                                        "mod",
                                                                                                        item.reserve_room_idx,
                                                                                                        item2.idx,
                                                                                                        "guest_name_first_ko",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <input
                                                                                                type="name"
                                                                                                className="input"
                                                                                                placeholder="이름"
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleOtherPriceInfo(
                                                                                                        "mod",
                                                                                                        item.reserve_room_idx,
                                                                                                        item2.idx,
                                                                                                        "guest_name_last_ko",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="phone_box">
                                                                                        <h5>
                                                                                            연령
                                                                                        </h5>
                                                                                        <div>
                                                                                            <select
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleOtherPriceInfo(
                                                                                                        "mod",
                                                                                                        item.reserve_room_idx,
                                                                                                        item2.idx,
                                                                                                        "guest_type",
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {GUEST_TYPE.map(
                                                                                                    (
                                                                                                        guestItem,
                                                                                                    ) => (
                                                                                                        <option
                                                                                                            key={`guest_option_${item.reserve_room_idx}_${item2.idx}_${guestItem.code_key}`}
                                                                                                            value={
                                                                                                                guestItem.code_key
                                                                                                            }
                                                                                                        >{`${guestItem.code_value_ko} (${guestItem.code_value_en})`}</option>
                                                                                                    ),
                                                                                                )}
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>

                                                                                    {item2.guest_type !==
                                                                                        "400" && (
                                                                                        <>
                                                                                            <div className="gender_box">
                                                                                                <h5>
                                                                                                    성별
                                                                                                </h5>
                                                                                                <div>
                                                                                                    <RadioGroupSelection
                                                                                                        radioItems={
                                                                                                            radioItemsGender
                                                                                                        }
                                                                                                        name={
                                                                                                            "gender"
                                                                                                        }
                                                                                                        value={
                                                                                                            item2.gender
                                                                                                        }
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            // handleSaleSelect(item.priceIdx, "saleSelect", e.target.value)
                                                                                                            handleOtherPriceInfo(
                                                                                                                "mod",
                                                                                                                item.reserve_room_idx,
                                                                                                                item2.idx,
                                                                                                                "gender",
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="phone_box">
                                                                                                <h5>
                                                                                                    연락처
                                                                                                </h5>
                                                                                                <div
                                                                                                    id="phone_num"
                                                                                                    className="m0"
                                                                                                >
                                                                                                    <input
                                                                                                        type="tel"
                                                                                                        className="input"
                                                                                                        id="phone_num1"
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleOtherPriceInfo(
                                                                                                                "mod",
                                                                                                                item.reserve_room_idx,
                                                                                                                item2.idx,
                                                                                                                "phone1",
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                        onInput={(
                                                                                                            e,
                                                                                                        ) => {
                                                                                                            e.target.value =
                                                                                                                CommonInputNumberPattern(
                                                                                                                    e,
                                                                                                                );
                                                                                                        }}
                                                                                                    />
                                                                                                    <input
                                                                                                        type="tel"
                                                                                                        className="input"
                                                                                                        id="phone_num2"
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleOtherPriceInfo(
                                                                                                                "mod",
                                                                                                                item.reserve_room_idx,
                                                                                                                item2.idx,
                                                                                                                "phone2",
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                        onInput={(
                                                                                                            e,
                                                                                                        ) => {
                                                                                                            e.target.value =
                                                                                                                CommonInputNumberPattern(
                                                                                                                    e,
                                                                                                                );
                                                                                                        }}
                                                                                                    />
                                                                                                    <input
                                                                                                        type="tel"
                                                                                                        className="input"
                                                                                                        id="phone_num3"
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleOtherPriceInfo(
                                                                                                                "mod",
                                                                                                                item.reserve_room_idx,
                                                                                                                item2.idx,
                                                                                                                "phone3",
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                        onInput={(
                                                                                                            e,
                                                                                                        ) => {
                                                                                                            e.target.value =
                                                                                                                CommonInputNumberPattern(
                                                                                                                    e,
                                                                                                                );
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="email_box">
                                                                                                <h5>
                                                                                                    이메일
                                                                                                </h5>
                                                                                                <div>
                                                                                                    <input
                                                                                                        type="email"
                                                                                                        className="input"
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleOtherPriceInfo(
                                                                                                                "mod",
                                                                                                                item.reserve_room_idx,
                                                                                                                item2.idx,
                                                                                                                "email",
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        </>
                                                    </li>
                                                ))}
                                        </ul>

                                        <div className="input_box">
                                            <div className="title">
                                                <h3>요청사항</h3>
                                            </div>
                                            <div className="">
                                                <textarea
                                                    name=""
                                                    id=""
                                                    className="input"
                                                    placeholder="요청사항이 있으시다면 적어주세요."
                                                    ref={reserveMemo}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="input_box">
                                            <div className="title">
                                                <h3>예약 취소/변경 규정</h3>
                                            </div>
                                            <div>
                                                <p className="cancel">
                                                    체크인 3일 전: 위약금 없음
                                                    <br />
                                                    체크인 2일 전: 객실료의{" "}
                                                    <span>
                                                        30% 취소 위약금 부과
                                                    </span>
                                                    <br />
                                                    체크인 1일 전: 객실료의{" "}
                                                    <span>
                                                        50% 취소 위약금 부과
                                                    </span>
                                                    <br />
                                                    당일 취소 및 No-Show: 객실료의{" "}
                                                    <span>
                                                        100% 취소 위약금 부과
                                                    </span>
                                                    <br />
                                                </p>
                                            </div>
                                        </div>
                                        {/*객실, 투숙객 정보 E*/}

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
                        </div>
                    </div>

                    <CommonModal
                        isOpen={isOpen}
                        title={modalTitle}
                        width={"1400"}
                        handleModalClose={handleModalClose}
                        component={"ReserveGuestDetailTermsModal"}
                        // handleNeedUpdate={handleNeedUpdate}
                        modData={modData}
                    />
                </>
            {/* )} */}
            {/* Content E */}

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default ReserveDetail;