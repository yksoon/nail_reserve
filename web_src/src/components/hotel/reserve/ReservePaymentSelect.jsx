import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonCommaPattern,
    CommonDateFormatter,
    CommonErrModule,
    CommonInputNumberPattern,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, isSpinnerAtom, userInfoAtom } from "recoils/atoms";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import RadioGroupSelection from "components/common/RadioGroupSelection";
import { privacy, terms } from "components/hotel/reserve/modal/terms";
import { successCode } from "common/js/resultCode";

const ReservePaymentSelect = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);
    const userInfo = useRecoilValue(userInfoAtom);

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    const [hotelInfo, setHotelInfo] = useState({});
    const [reservePaymentModel, setReservePaymentModel] = useState({});
    const [reserveInfo, setReserveInfo] = useState({});
    const [reserveRoomsInfo, setReserveRoomsInfo] = useState([]);
    const [reserveDateInfo, setReserveDateInfo] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);

    // 결제 관련
    const [approvalType, setApprovalType] = useState("000");

    const paymentRefs = {
        paymentNameFirstKo: useRef(null),
        paymentNameLastKo: useRef(null),
        paymentPhone1: useRef(null),
        paymentPhone2: useRef(null),
        paymentPhone3: useRef(null),
        paymentEmail: useRef(null),
        paymentCard1: useRef(null),
        paymentCard2: useRef(null),
        paymentCard3: useRef(null),
        paymentCard4: useRef(null),
        cardExpirationDateMonth: useRef(null),
        cardExpirationDateYear: useRef(null),
        cardPasswordTwoDigits: useRef(null),
        installmentPreriod: useRef(null),
        cardCvc: useRef(null),
    };

    const termsCheck = useRef(null);

    useEffect(() => {
        !locationState ? navigate(routerPath.hotel_list) : setReserveData();
    }, []);

    const setReserveData = () => {
        setHotelInfo(locationState?.hotelInfo || {});
        setReserveInfo(locationState?.reserveInfo || {});
        setReserveDateInfo(locationState?.reserveDateInfo || {});
        setReservePaymentModel(locationState?.reservePaymentModel || {});
        setReserveRoomsInfo(locationState?.reserveRoomsInfo || []);

        setIsLoaded(true);
    };

    useEffect(() => {
        if (isLoaded) {
            setReservePaymentModel(locationState?.reservePaymentModel);
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

    const radioItemsPayment = [
        {
            value: "000",
            label: "무통장입금",
        },
        {
            value: "100",
            label: "카드",
        },
    ];

    // installmentPreriod 할부
    const installmentOptions = Array.from(
        { length: 23 },
        (_, index) => index + 2,
    );

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

    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref && ref.current.focus();
            };
        };

        // 무통장입금인경우
        if (approvalType === "000") {
            if (!paymentRefs.paymentNameFirstKo.current.value) {
                noti(paymentRefs.paymentNameFirstKo, "입금자명을 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentNameLastKo.current.value) {
                noti(paymentRefs.paymentNameLastKo, "입금자명을 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone1.current.value) {
                noti(paymentRefs.paymentPhone1, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone2.current.value) {
                noti(paymentRefs.paymentPhone2, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone3.current.value) {
                noti(paymentRefs.paymentPhone3, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentEmail.current.value) {
                noti(paymentRefs.paymentEmail, "이메일을 입력해주세요");

                return false;
            }
        } else if (approvalType === "100") {
            if (!paymentRefs.paymentNameFirstKo.current.value) {
                noti(paymentRefs.paymentNameFirstKo, "입금자명을 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentNameLastKo.current.value) {
                noti(paymentRefs.paymentNameLastKo, "입금자명을 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone1.current.value) {
                noti(paymentRefs.paymentPhone1, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone2.current.value) {
                noti(paymentRefs.paymentPhone2, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentPhone3.current.value) {
                noti(paymentRefs.paymentPhone3, "연락처를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentEmail.current.value) {
                noti(paymentRefs.paymentEmail, "이메일을 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentCard1.current.value) {
                noti(paymentRefs.paymentCard1, "카드번호를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentCard2.current.value) {
                noti(paymentRefs.paymentCard2, "카드번호를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentCard3.current.value) {
                noti(paymentRefs.paymentCard3, "카드번호를 입력해주세요");

                return false;
            }

            if (!paymentRefs.paymentCard4.current.value) {
                noti(paymentRefs.paymentCard4, "카드번호를 입력해주세요");

                return false;
            }

            if (!paymentRefs.cardExpirationDateMonth.current.value) {
                noti(
                    paymentRefs.cardExpirationDateMonth,
                    "유효기간을 입력해주세요",
                );

                return false;
            }

            if (!paymentRefs.cardExpirationDateYear.current.value) {
                noti(
                    paymentRefs.cardExpirationDateYear,
                    "유효기간을 입력해주세요",
                );

                return false;
            }

            if (!paymentRefs.cardExpirationDateYear.current.value) {
                noti(
                    paymentRefs.cardExpirationDateYear,
                    "유효기간을 입력해주세요",
                );

                return false;
            }

            if (!paymentRefs.cardPasswordTwoDigits.current.value) {
                noti(
                    paymentRefs.cardPasswordTwoDigits,
                    "비밀번호 앞 두자리를 입력해주세요",
                );

                return false;
            }

            if (!paymentRefs.cardCvc.current.value) {
                noti(paymentRefs.cardCvc, "CVC 번호를 입력해주세요");

                return false;
            }
        }

        if (!termsCheck.current.checked) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "이용약관에 체크 해주세요",
            });

            return false;
        }

        return true;
    };

    // 다음 버튼
    const clickNextStep = () => {
        if (validation()) {
            CommonNotify({
                type: "confirm",
                hook: confirm,
                message: "객실 예약을 하시겠습니까?",
                callback: () => doNextStep(),
            });

            const doNextStep = () => {
                setIsSpinner(true);

                const totalPrice = grandTotalFunc();

                const url = apiPath.api_reserve_payment;
                const data =
                    approvalType === "000"
                        ? {
                              ...reservePaymentModel,
                              approval_type: approvalType,
                              payment_price: totalPrice,
                              payment_name_first_ko:
                                  paymentRefs.paymentNameFirstKo.current.value,
                              payment_name_last_ko:
                                  paymentRefs.paymentNameLastKo.current.value,
                              payment_name_first_en:
                                  paymentRefs.paymentNameLastKo.current.value,
                              payment_name_last_en:
                                  paymentRefs.paymentNameFirstKo.current.value,
                              payment_phone1:
                                  paymentRefs.paymentPhone1.current.value,
                              payment_phone2:
                                  paymentRefs.paymentPhone2.current.value,
                              payment_phone3:
                                  paymentRefs.paymentPhone3.current.value,
                              payment_email:
                                  paymentRefs.paymentEmail.current.value,
                          }
                        : approvalType === "100"
                        ? {
                              ...reservePaymentModel,
                              approval_type: approvalType,
                              payment_price: totalPrice,
                              payment_name_first_ko:
                                  paymentRefs.paymentNameFirstKo.current.value,
                              payment_name_last_ko:
                                  paymentRefs.paymentNameLastKo.current.value,
                              payment_name_first_en:
                                  paymentRefs.paymentNameLastKo.current.value,
                              payment_name_last_en:
                                  paymentRefs.paymentNameFirstKo.current.value,
                              payment_phone1:
                                  paymentRefs.paymentPhone1.current.value,
                              payment_phone2:
                                  paymentRefs.paymentPhone2.current.value,
                              payment_phone3:
                                  paymentRefs.paymentPhone3.current.value,
                              payment_email:
                                  paymentRefs.paymentEmail.current.value,
                              card_number:
                                  paymentRefs.paymentCard1.current.value +
                                  paymentRefs.paymentCard2.current.value +
                                  paymentRefs.paymentCard3.current.value +
                                  paymentRefs.paymentCard4.current.value,
                              card_expiration_date:
                                  paymentRefs.cardExpirationDateMonth.current
                                      .value +
                                  paymentRefs.cardExpirationDateYear.current
                                      .value,
                              card_password_two_digits:
                                  paymentRefs.cardPasswordTwoDigits.current
                                      .value,
                              card_cvc: paymentRefs.cardCvc.current.value,
                          }
                        : {};

                // 파라미터
                const restParams = {
                    method: "post",
                    url: url,
                    data: data,
                    err: err,
                    callback: (res) => responseLogic(res),
                };

                // console.log(restParams);

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
                            navigate(routerPath.reserve_success);
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
            };
        }
    };

    const months = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = (index + 1).toString().padStart(2, "0");
        return { value: monthNumber, label: monthNumber };
    });

    const yearOptions = Array.from({ length: 7 }, (_, index) => {
        const currentYear = new Date().getFullYear();
        const twoDigitCurrentYear = currentYear.toString().slice(-2);

        const year = (currentYear - 1 + index).toString().slice(-2);
        return { value: year, label: year };
    });

    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
            <div id="con_area">
                <h2 className="subtitle">HOTEL 예약</h2>

                <div className="hotel_reservation">
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
                                    {`(+${hotelInfo.inter_phone_number})${
                                        hotelInfo.phone1
                                    }-${hotelInfo.phone2}${
                                        hotelInfo.phone3 && "-"
                                    }${hotelInfo.phone3}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*호텔 정보 E*/}

                    <div className="reservation">
                        <div className="left_box">
                            {/*예약자 정보 S*/}
                            <div className="input_box">
                                <div className="title">
                                    <h3>결제 정보</h3>
                                </div>
                                <div className="reservation_person">
                                    <div className="name_box">
                                        <h5>결제수단</h5>
                                        <div>
                                            <RadioGroupSelection
                                                radioItems={radioItemsPayment}
                                                name={"paymentType"}
                                                value={approvalType}
                                                onChange={(e) =>
                                                    setApprovalType(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    {approvalType === "000" ? (
                                        <>
                                            <div className="name_box">
                                                <h5>결제금액</h5>
                                                <div>
                                                    <p>
                                                        <strong className="room_amount">
                                                            {reserveRoomsInfo.length !==
                                                            0
                                                                ? CommonCommaPattern(
                                                                      grandTotalFunc(),
                                                                      3,
                                                                  )
                                                                : 0}
                                                        </strong>
                                                        원{`   `}
                                                        <span>부가세 포함</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="name_box">
                                                <h5>입금자명</h5>
                                                <div>
                                                    <input
                                                        type="name"
                                                        className="input"
                                                        placeholder="성"
                                                        ref={
                                                            paymentRefs.paymentNameFirstKo
                                                        }
                                                    />
                                                    <input
                                                        type="name"
                                                        className="input"
                                                        placeholder="이름"
                                                        ref={
                                                            paymentRefs.paymentNameLastKo
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="phone_box">
                                                <h5>연락처</h5>
                                                <div
                                                    id="phone_num"
                                                    className="m0"
                                                >
                                                    <input
                                                        type="tel"
                                                        className="input"
                                                        id="phone_num1"
                                                        ref={
                                                            paymentRefs.paymentPhone1
                                                        }
                                                        onInput={(e) => {
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
                                                        ref={
                                                            paymentRefs.paymentPhone2
                                                        }
                                                        onInput={(e) => {
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
                                                        ref={
                                                            paymentRefs.paymentPhone3
                                                        }
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="email_box">
                                                <h5>이메일</h5>
                                                <div>
                                                    <input
                                                        type="email"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentEmail
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : approvalType === "100" ? (
                                        <>
                                            <div className="name_box">
                                                <h5>결제금액</h5>
                                                <div>
                                                    <p>
                                                        <strong className="room_amount">
                                                            {reserveRoomsInfo.length !==
                                                            0
                                                                ? CommonCommaPattern(
                                                                      grandTotalFunc(),
                                                                      3,
                                                                  )
                                                                : 0}
                                                        </strong>
                                                        원{`   `}
                                                        <span>부가세 포함</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="name_box">
                                                <h5>성명</h5>
                                                <div>
                                                    <input
                                                        type="name"
                                                        className="input"
                                                        placeholder="성"
                                                        ref={
                                                            paymentRefs.paymentNameFirstKo
                                                        }
                                                    />
                                                    <input
                                                        type="name"
                                                        className="input"
                                                        placeholder="이름"
                                                        ref={
                                                            paymentRefs.paymentNameLastKo
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="phone_box">
                                                <h5>연락처</h5>
                                                <div
                                                    id="phone_num"
                                                    className="m0"
                                                >
                                                    <input
                                                        type="tel"
                                                        className="input"
                                                        id="phone_num1"
                                                        ref={
                                                            paymentRefs.paymentPhone1
                                                        }
                                                        onInput={(e) => {
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
                                                        ref={
                                                            paymentRefs.paymentPhone2
                                                        }
                                                        onInput={(e) => {
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
                                                        ref={
                                                            paymentRefs.paymentPhone3
                                                        }
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="email_box">
                                                <h5>이메일</h5>
                                                <div>
                                                    <input
                                                        type="email"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentEmail
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="card_box">
                                                <h5>카드번호</h5>
                                                <div
                                                    id="phone_num"
                                                    className="m0"
                                                >
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentCard1
                                                        }
                                                        name={`random_${Math.random()}`}
                                                        autoComplete="off"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={4}
                                                    />
                                                    <input
                                                        type="password"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentCard2
                                                        }
                                                        autoComplete="new-password"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={4}
                                                    />
                                                    <input
                                                        type="password"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentCard3
                                                        }
                                                        autoComplete="new-password"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={4}
                                                    />
                                                    <input
                                                        type="password"
                                                        className="input"
                                                        ref={
                                                            paymentRefs.paymentCard4
                                                        }
                                                        autoComplete="new-password"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={4}
                                                    />
                                                </div>
                                            </div>
                                            <div className="date_box">
                                                <h5>유효기간</h5>
                                                <div>
                                                    <select
                                                        ref={
                                                            paymentRefs.cardExpirationDateMonth
                                                        }
                                                    >
                                                        <option value="">
                                                            - MM -
                                                        </option>
                                                        {months.map((month) => (
                                                            <option
                                                                key={
                                                                    month.value
                                                                }
                                                                value={
                                                                    month.value
                                                                }
                                                            >
                                                                {month.label}
                                                            </option>
                                                        ))}
                                                    </select>{" "}
                                                    /
                                                    <select
                                                        ref={
                                                            paymentRefs.cardExpirationDateYear
                                                        }
                                                    >
                                                        <option value="">
                                                            - YY -
                                                        </option>
                                                        {yearOptions.map(
                                                            (year) => (
                                                                <option
                                                                    key={
                                                                        year.value
                                                                    }
                                                                    value={
                                                                        year.value
                                                                    }
                                                                >
                                                                    {year.label}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <h5>비밀번호</h5>
                                                <div>
                                                    <input
                                                        type="password"
                                                        className="input w100"
                                                        placeholder=""
                                                        ref={
                                                            paymentRefs.cardPasswordTwoDigits
                                                        }
                                                        autoComplete="new-password"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={2}
                                                    />
                                                    &nbsp; ●●
                                                </div>
                                            </div>
                                            <div>
                                                <h5>CVC</h5>
                                                <div>
                                                    <input
                                                        type="password"
                                                        className="input w180"
                                                        placeholder="CVC"
                                                        ref={
                                                            paymentRefs.cardCvc
                                                        }
                                                        autoComplete="new-password"
                                                        onInput={(e) => {
                                                            e.target.value =
                                                                CommonInputNumberPattern(
                                                                    e,
                                                                );
                                                        }}
                                                        maxLength={3}
                                                    />
                                                </div>
                                            </div>
                                            {/*{grandTotalFunc() >= 50000 && (*/}
                                            {/*    <div className="name_box">*/}
                                            {/*        <h5>할부기간</h5>*/}
                                            {/*        <div>*/}
                                            {/*            <select>*/}
                                            {/*                {installmentOptions.map(*/}
                                            {/*                    (number) => (*/}
                                            {/*                        <option*/}
                                            {/*                            key={*/}
                                            {/*                                number*/}
                                            {/*                            }*/}
                                            {/*                            value={*/}
                                            {/*                                number*/}
                                            {/*                            }*/}
                                            {/*                        >*/}
                                            {/*                            {`${number} 개월`}*/}
                                            {/*                        </option>*/}
                                            {/*                    ),*/}
                                            {/*                )}*/}
                                            {/*            </select>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            {/*예약자 정보 E*/}
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
                                        {Object.keys(reserveDateInfo).length !==
                                            0 && (
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
                                        {Object.keys(reserveDateInfo).length !==
                                            0 && (
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
                                        <p>{reserveRoomsInfo.length}개</p>
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
                                        {reserveRoomsInfo.length !== 0 &&
                                            reserveRoomsInfo.map((item) => (
                                                <p
                                                    key={`checkItems_${item.room_idx}`}
                                                    style={{
                                                        textAlign: "right",
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
                                                {reserveRoomsInfo.length !== 0
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
                                <div className="agree">
                                    <input
                                        type="checkbox"
                                        id="reservation_agree"
                                        className="hide"
                                        ref={termsCheck}
                                    />
                                    <label
                                        htmlFor="reservation_agree"
                                        className="checkbox"
                                    >
                                        <svg
                                            width="9.772"
                                            height="7.181"
                                            viewBox="0 0 9.772 7.181"
                                            fill="#bdbdbd"
                                        >
                                            <path
                                                d="M0,6.181a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414L4.474-.707a1,1,0,0,1,1.414,0,1,1,0,0,1,0,1.414L.707,5.888A1,1,0,0,1,0,6.181Z"
                                                transform="translate(3.591 1)"
                                            />
                                            <path
                                                d="M2.591,3.591A1,1,0,0,1,1.883,3.3L-.707.707a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0L3.3,1.883a1,1,0,0,1-.707,1.707Z"
                                                transform="translate(1 3.591)"
                                            />
                                        </svg>
                                    </label>
                                    <p>
                                        해당 예약 요청 시, 메디씨티{" "}
                                        <Link
                                            to=""
                                            onClick={() =>
                                                openTermsModal("terms")
                                            }
                                        >
                                            <span>이용약관</span>
                                        </Link>{" "}
                                        및{" "}
                                        <Link
                                            to=""
                                            onClick={() =>
                                                openTermsModal("privacy")
                                            }
                                        >
                                            <span>개인정보 처리방침</span>
                                        </Link>
                                        을 읽었으며 이에 동의합니다.
                                    </p>
                                </div>
                            </div>
                            <Link
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
                    <Link to={routerPath.hotel_list} className="backbtn">
                        뒤로 가기
                    </Link>
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
            {/* Content E */}

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default ReservePaymentSelect;
