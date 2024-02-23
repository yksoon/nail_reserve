import React from "react";
import { apiPath, routerPath } from "webPath";
import {
    CommonCommaPattern,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { Link, useNavigate } from "react-router-dom";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "common/js/resultCode";

const ReserveDetailModal = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const modData = props.modData;
    const handleNeedUpdate = props.handleNeedUpdate;

    const navigate = useNavigate();

    const reserveStatusNotice = {
        "000": (
            <p>
                예약 확인을 기다리고 있습니다. 본 단계는 예약 확정이 아닙니다.
            </p>
        ),
        100: (
            <p>
                예약 확인을 기다리고 있습니다. 본 단계는 예약 확정이 아닙니다.
            </p>
        ),
        200: (
            <p>
                관리자가 예약을 확인하였습니다. <b>취소가 불가합니다.</b>
            </p>
        ),
        300: (
            <p>
                예약이 확정되었습니다. <b>취소가 불가합니다.</b>
            </p>
        ),
        400: <p>예약이 취소되었습니다. 선택하신 날짜에는 이용이 불가합니다.</p>,
    };

    const divideString = (inputString) => {
        // 문자열을 4자리씩 자름
        let slicedString = inputString.slice(0, 4);

        // 원하는 형식으로 조합
        let formattedString = slicedString + "-****-****-****";

        return formattedString;
    };

    const reserveDay = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // 날짜 차이 계산
        const timeDifference = checkOutDate - checkInDate;
        // 박 수 계산
        const nights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return nights;
    };

    /**
     * 예약 취소
     * @param reserveIdx
     */
    const reserveCancel = (reserveIdx) => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "예약을 취소하시겠습니까?",
            callback: () => doReserveCancel(reserveIdx),
        });
    };

    const doReserveCancel = (reserveIdx) => {
        setIsSpinner(true);

        // 마이페이지 정보 수정
        // /v1/user/mypage
        // PUT
        const url = apiPath.api_mypage_mod;

        let data = {
            reserve_idx: reserveIdx,
            reserve_status: "400", // 예약 취소
            approval_status: modData.approval_status_cd,
        };

        // 파라미터
        const restParams = {
            method: "put",
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
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "예약 취소가 완료 되었습니다",
                        callback: () => handleNeedUpdate(),
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
    };

    return (
        <>
            <div className="my_reserve">
                <div className="left">
                    <div className="input_box">
                        <div
                            className={
                                modData.reserve_status_cd === 400
                                    ? "noti cancle"
                                    : "noti"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M480-232.309q22.307 0 38.269-15.576 15.961-15.577 17.115-38.269H424.616q1.154 22.692 17.115 38.269 15.962 15.576 38.269 15.576Zm0-169.23Zm.067 301.538q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM327.693-336.924h304.614q13.731 0 23.019-9.289 9.288-9.288 9.288-23.018 0-13.731-9.288-23.019-9.288-9.289-23.019-9.289h-7.693v-106.307q0-56-29.192-102.077-29.192-46.076-81.576-58.538v-26.154q0-14.711-9.577-24.663T480-729.23q-14.692 0-24.269 9.952-9.577 9.952-9.577 24.663v26.154q-52.384 12.462-81.576 58.154-29.192 45.692-29.192 101.691v107.077h-7.693q-13.731 0-23.019 9.289-9.288 9.288-9.288 23.019 0 13.73 9.288 23.018 9.288 9.289 23.019 9.289Z" />
                            </svg>
                            <div>
                                <h5>{modData.reserve_status.split("(")[0]}</h5>
                                {/*<p>*/}
                                {/*    예약 확인을 기다리고 있습니다. 본 단계는*/}
                                {/*    예약 확정이 아닙니다.*/}
                                {/*</p>*/}
                                {reserveStatusNotice[modData.reserve_status_cd]}
                            </div>
                        </div>
                        {/* <div className="noti">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-232.309q22.307 0 38.269-15.576 15.961-15.577 17.115-38.269H424.616q1.154 22.692 17.115 38.269 15.962 15.576 38.269 15.576Zm0-169.23Zm.067 301.538q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM327.693-336.924h304.614q13.731 0 23.019-9.289 9.288-9.288 9.288-23.018 0-13.731-9.288-23.019-9.288-9.289-23.019-9.289h-7.693v-106.307q0-56-29.192-102.077-29.192-46.076-81.576-58.538v-26.154q0-14.711-9.577-24.663T480-729.23q-14.692 0-24.269 9.952-9.577 9.952-9.577 24.663v26.154q-52.384 12.462-81.576 58.154-29.192 45.692-29.192 101.691v107.077h-7.693q-13.731 0-23.019 9.289-9.288 9.288-9.288 23.019 0 13.73 9.288 23.018 9.288 9.289 23.019 9.289Z"/></svg>
                            <div>
                                <h5>예약 확인</h5>
                                <p>관리자가 예약을 확인하였습니다. <b>취소가 불가합니다.</b></p>
                            </div>
                        </div>
                        <div className="noti">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-232.309q22.307 0 38.269-15.576 15.961-15.577 17.115-38.269H424.616q1.154 22.692 17.115 38.269 15.962 15.576 38.269 15.576Zm0-169.23Zm.067 301.538q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM327.693-336.924h304.614q13.731 0 23.019-9.289 9.288-9.288 9.288-23.018 0-13.731-9.288-23.019-9.288-9.289-23.019-9.289h-7.693v-106.307q0-56-29.192-102.077-29.192-46.076-81.576-58.538v-26.154q0-14.711-9.577-24.663T480-729.23q-14.692 0-24.269 9.952-9.577 9.952-9.577 24.663v26.154q-52.384 12.462-81.576 58.154-29.192 45.692-29.192 101.691v107.077h-7.693q-13.731 0-23.019 9.289-9.288 9.288-9.288 23.019 0 13.73 9.288 23.018 9.288 9.289 23.019 9.289Z"/></svg>
                            <div>
                                <h5>예약 확인</h5>
                                <p>예약이 확정되었습니다. <b>취소가 불가합니다.</b></p>
                            </div>
                        </div>
                        <div className="noti cancle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-232.309q22.307 0 38.269-15.576 15.961-15.577 17.115-38.269H424.616q1.154 22.692 17.115 38.269 15.962 15.576 38.269 15.576Zm0-169.23Zm.067 301.538q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM327.693-336.924h304.614q13.731 0 23.019-9.289 9.288-9.288 9.288-23.018 0-13.731-9.288-23.019-9.288-9.289-23.019-9.289h-7.693v-106.307q0-56-29.192-102.077-29.192-46.076-81.576-58.538v-26.154q0-14.711-9.577-24.663T480-729.23q-14.692 0-24.269 9.952-9.577 9.952-9.577 24.663v26.154q-52.384 12.462-81.576 58.154-29.192 45.692-29.192 101.691v107.077h-7.693q-13.731 0-23.019 9.289-9.288 9.288-9.288 23.019 0 13.73 9.288 23.018 9.288 9.289 23.019 9.289Z"/></svg>
                            <div>
                                <h5>예약 취소</h5>
                                <p>예약이 취소되었습니다. 선택하신 날짜에는 이용이 불가합니다.</p>
                            </div>
                        </div> */}
                        <div className="title">
                            <h3>예약 정보</h3>
                        </div>
                        <div className="reservation_person">
                            <div>
                                <h5>예약번호</h5>
                                <p>{modData.internal_reserve_num}</p>
                            </div>
                            <div>
                                <h5>예약날짜</h5>
                                <p>{modData.reg_dttm}</p>
                            </div>
                            <div>
                                <h5>체크인</h5>
                                <p>{modData.hotel_info.check_in_time}</p>
                            </div>
                            <div>
                                <h5>체크아웃</h5>
                                <p>{modData.hotel_info.check_out_time}</p>
                            </div>
                            <p>※ 체크인 및 체크아웃은 현지시각 기준입니다.</p>
                        </div>
                    </div>
                    <div className="input_box">
                        <div className="title">
                            <h3>예약자 정보</h3>
                        </div>
                        <div className="reservation_person">
                            <div>
                                <h5>이름</h5>
                                <p>{`${modData.reserve_holder.guest_name_first_ko} ${modData.reserve_holder.guest_name_last_ko} (${modData.reserve_holder.guest_name_first_en} ${modData.reserve_holder.guest_name_last_en})`}</p>
                            </div>
                            <div>
                                <h5>연락처</h5>
                                <p>{`${modData.reserve_holder.phone1}-${modData.reserve_holder.phone2}-${modData.reserve_holder.phone3}`}</p>
                            </div>
                            <div>
                                <h5>이메일</h5>
                                <p>{modData.reserve_holder.email}</p>
                            </div>
                        </div>
                    </div>
                    {modData.room_info?.length !== 0 &&
                        modData.room_info.map((roomItem) => (
                            <div
                                className="input_box"
                                key={`room_info_${roomItem.room_idx}`}
                            >
                                <div className="room_info_box">
                                    <div className="info">
                                        <div className="thumb">
                                            <img
                                                src={`${apiPath.api_img_path}${roomItem.attachment_file_info[0].file_path_enc}`}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h5 className="room_name">
                                                {roomItem.room_name_en}
                                            </h5>
                                            <h6>{roomItem.room_name_ko}</h6>
                                            <p>
                                                {`${
                                                    roomItem.guest_info.length
                                                }인 / ${reserveDay(
                                                    roomItem.check_in_date,
                                                    roomItem.check_out_date,
                                                )}박`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="title">
                                    <h3>투숙객 정보</h3>
                                </div>
                                {roomItem.guest_info?.length !== 0 &&
                                    roomItem.guest_info.map(
                                        (guestItem, guestIdx) => (
                                            <div
                                                className="reservation_person"
                                                key={`guest_info_${roomItem.room_idx}_${guestItem.guest_idx}`}
                                            >
                                                <h5>{`투숙객 ${
                                                    guestIdx + 1
                                                }`}</h5>
                                                <div className="person_s">
                                                    <div className="name">
                                                        <h5>이름</h5>
                                                        <p>
                                                            {`${guestItem.guest_name_first_ko} ${guestItem.guest_name_last_ko}`}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h5>연령</h5>
                                                        <p>
                                                            {
                                                                guestItem.guest_type.split(
                                                                    "(",
                                                                )[0]
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h5>성별</h5>
                                                        <p>
                                                            {guestItem.gender ===
                                                            "0"
                                                                ? "남자"
                                                                : guestItem.gender ===
                                                                  "1"
                                                                ? "여자"
                                                                : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                                {guestItem.guest_type_cd ===
                                                    "100" && (
                                                    <div className="person_s person_m">
                                                        <div>
                                                            <h5>연락처</h5>
                                                            <p>{`${guestItem.phone1}-${guestItem.phone2}-${guestItem.phone3}`}</p>
                                                        </div>
                                                        <div>
                                                            <h5>이메일</h5>
                                                            <p>
                                                                {
                                                                    guestItem.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ),
                                    )}
                            </div>
                        ))}
                    <div className="input_box">
                        <div className="title">
                            <h3>결제 정보</h3>
                        </div>
                        <div className="reservation_person">
                            <div>
                                <h5>결제수단</h5>
                                <div>{modData.approval_type.split("(")[0]}</div>
                            </div>
                            <div>
                                <h5>결제금액</h5>
                                <div>{`${CommonCommaPattern(
                                    modData.payment_info.payment_price,
                                    3,
                                )} 원`}</div>
                            </div>
                            <div>
                                <h5>연락처</h5>
                                <div>{`${modData.payment_info.payment_phone1}-${modData.payment_info.payment_phone2}-${modData.payment_info.payment_phone3}`}</div>
                            </div>
                            <div>
                                <h5>이메일</h5>
                                <div>{modData.payment_info.payment_email}</div>
                            </div>
                            {/* 무통장입금인 경우에만 노출 */}
                            {modData.approval_type_cd === "000" && (
                                <div>
                                    <h5>입금자명</h5>
                                    <div>
                                        {modData.payment_info.check_user_ko}
                                    </div>
                                </div>
                            )}
                            {/* 카드인 경우에만 노출 */}
                            {modData.approval_type_cd === "100" && (
                                <div>
                                    <h5>카드정보</h5>
                                    {/*<div>카드번호 (유효기간)</div>*/}
                                    <div>
                                        {`${divideString(
                                            modData.payment_info.card_number,
                                        )} (${modData.payment_info.card_expiration_date.slice(
                                            0,
                                            2,
                                        )}/${modData.payment_info.card_expiration_date.slice(
                                            2,
                                            4,
                                        )})`}
                                    </div>
                                    {/* 카드번호 앞 4자리 외 모두 암호화처리 */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="input_box">
                        <div className="title">
                            <h3>수수료 안내</h3>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="reservation_top">
                        <span className="thumb">
                            <img
                                src={`${apiPath.api_img_path}${modData.hotel_info.file_path_enc}`}
                                alt=""
                            />
                        </span>
                        <div className="info">
                            <h3>{modData.hotel_info.name_ko}</h3>
                            <h5>{modData.hotel_info.name_en}</h5>
                            <div className="hotel_venue">
                                <p>
                                    <b>호텔 주소</b>
                                    {`${modData.hotel_info.addr1_ko} ${modData.hotel_info.addr2_ko}`}
                                </p>
                                <p>
                                    <b>호텔 연락처</b>
                                    {`${modData.hotel_info.phone1}-${
                                        modData.hotel_info.phone2
                                    }${modData.hotel_info.phone3 && "-"}${
                                        modData.hotel_info.phone3
                                    }`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="cancled_btn">
                        {modData.reserve_status_cd === "300" && (
                            <a href="">영수증 발급</a>
                        )}
                        {(modData.reserve_status_cd === "000" ||
                            modData.reserve_status_cd === "100") && (
                            <Link
                                to=""
                                onClick={() =>
                                    reserveCancel(modData.reserve_idx)
                                }
                            >
                                예약 취소
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* <>{JSON.stringify(modData)}</> */}
        </>
    );
};

export default ReserveDetailModal;
