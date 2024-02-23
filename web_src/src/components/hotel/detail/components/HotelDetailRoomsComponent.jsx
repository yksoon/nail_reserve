import React, { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { codesAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiPath, routerPath } from "webPath";
import { CommonCommaPattern, CommonModal } from "common/js/Common";
import HotelDetailRoomsModal from "components/hotel/detail/components/HotelDetailRoomsModal";

const HotelDetailRoomsComponent = (props) => {
    const hotelInfo = props.hotelInfo;
    // const hotelListInfo = props.hotelListInfo;
    const roomInfo = props.roomInfo;
    const additionalInfoProps = roomInfo.additional_info;

    const [hotelListInfo, setHotelListInfo] = useState({});

    const additionalInfo = additionalInfoProps.filter(
        (el) =>
            el.key_name === "VIEW_TYPE" ||
            el.key_name === "BED_COUNT" ||
            el.key_name === "BED_TYPE" ||
            el.key_name === "NO_SMOKING",
    );

    const fileInfo = roomInfo.attachment_file_info;
    const priceInfo = roomInfo.price_info;
    const summary_info = roomInfo.summary_info;

    const codes = useRecoilValue(codesAtom);
    const BED_TYPE = codes.filter((el) => el.code_type === "BED_TYPE");

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    // jQuery
    useEffect(() => {
        // // 추가정보 텍스트 드롭다운
        // $(".additional_info").hide();
        // $(".additional_info_btn").click(function () {
        //     $(this).toggleClass("open");
        //     if ($(this).hasClass("open") == true) {
        //         $(this).siblings(".additional_info").stop().slideDown();
        //         $(this).text("추가정보 닫기");
        //     } else {
        //         $(this).siblings(".additional_info").stop().slideUp();
        //         $(this).text("추가정보 보기");
        //     }
        // });

        setHotelListInfo(props.hotelListInfo ?? {});
    }, []);

    // useEffect(() => {
    //     codes.length !== 0 && getBedType();
    // }, [codes]);

    const additionalFunc = (item, idx) => {
        const additionalNameKo = item.additional_name_ko;
        let ret;
        if (item.additional_name_ko.includes("|")) {
            const title = additionalNameKo.split("|")[0];

            if (item.key_name.includes("COUNT")) {
                ret = (
                    <Fragment
                        key={`icon_${roomInfo.room_idx}_${item.key_name}`}
                    >
                        <img src={`img/icon/${item.img_name}.svg`} alt="" />
                        {` ${title} : ${item.additional_memo} `}
                    </Fragment>
                );
            } else {
                const valueString = additionalNameKo.split("|")[1].split(",");

                let obj = new Object();
                const valueStringLength = valueString.length;
                for (let i = 0; i < valueStringLength; i++) {
                    obj[valueString[i].split(":")[0].trim()] = valueString[i]
                        .split(":")[1]
                        .trim();
                }
                let additionalMemo = item.additional_memo;
                if (additionalMemo.length > 3) {
                    const additionalMemoArr = additionalMemo.split(",");

                    ret = (
                        <Fragment
                            key={`icon_${roomInfo.room_idx}_${item.key_name}`}
                        >
                            <img src={`img/icon/${item.img_name}.svg`} alt="" />
                            {` ${title} : `}
                            {additionalMemoArr.map((item, idx) => (
                                <Fragment
                                    key={`additionalMemoArr_${roomInfo.room_idx}_${item}`}
                                >{`${idx !== 0 ? ", " : ""}${
                                    obj[item]
                                }`}</Fragment>
                            ))}
                        </Fragment>
                    );
                } else {
                    ret = (
                        <Fragment
                            key={`icon_${roomInfo.room_idx}_${item.key_name}`}
                        >
                            <img src={`img/icon/${item.img_name}.svg`} alt="" />
                            {` ${title} : ${obj[item.additional_memo]}`}
                        </Fragment>
                    );
                }
            }
        } else {
            ret = (
                <Fragment key={`icon_${roomInfo.room_idx}_${item.key_name}`}>
                    <img src={`img/icon/${item.img_name}.svg`} alt="" />{" "}
                    {`${additionalNameKo} : 유`}
                </Fragment>
            );
        }

        return ret;
    };

    // 가격 정보
    const priceInfoFunc = () => {
        const priceInfoLength = priceInfo.length;
        const originPriceInfo = priceInfo.filter(
            (el) => el.price_div_cd === "000",
        )[0];
        const otherPriceInfo = priceInfo.filter(
            (el) => el.price_div_cd !== "000",
        );

        const nowDate = new Date();

        let originPrice = "";
        let salePrice = "";
        let saleRate = "";

        let retComponent;
        if (
            otherPriceInfo.length !== 0 &&
            otherPriceInfo.filter(
                (el) =>
                    new Date(el.sale_start) <=
                        nowDate <=
                        new Date(el.sale_end).length !==
                    0,
            )
        ) {
            const otherPrice = otherPriceInfo.filter(
                (el) =>
                    new Date(el.sale_start) <=
                        nowDate <=
                        new Date(el.sale_end).length !==
                    0,
            )[0];

            originPrice = otherPrice.origin_price;
            salePrice = otherPrice.sale_price;
            saleRate = otherPrice.sale_rate;

            retComponent = (
                <>
                    <div>
                        <p className="cost">{`₩${CommonCommaPattern(
                            originPrice,
                            3,
                        )}`}</p>
                        <p className="price">{`₩${CommonCommaPattern(
                            salePrice,
                            3,
                        )}`}</p>
                        <p className="sale">{`${saleRate}% 할인`}</p>
                    </div>
                    <Link
                        // href="hotel_reservation_step1.html"
                        to=""
                    >
                        예약 바로가기
                    </Link>
                </>
            );
        }

        return retComponent;
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
            <li>
                <div className="room_info">
                    <div>
                        <h5>
                            {roomInfo.room_name_en}{" "}
                            <span>{roomInfo.room_name_ko}</span>
                        </h5>
                        <div className="service_icon">
                            <p>
                                객실크기 {roomInfo.room_size}m<sup>2</sup>
                            </p>
                            <p>기준인원 {roomInfo.min_people} 인</p>
                            <p>최대인원 {roomInfo.max_people} 인</p>

                            <p>
                                <img src="img/icon/BED.svg" alt="" />{" "}
                                {roomInfo.additional_info.length !== 0 &&
                                    roomInfo.additional_info.filter(
                                        (el) => el.key_name === "BED_TYPE",
                                    ).length !== 0 &&
                                    roomInfo.additional_info
                                        .filter(
                                            (el) => el.key_name === "BED_TYPE",
                                        )[0]
                                        .additional_memo.split(",")
                                        .map((item, idx) =>
                                            idx !== 0
                                                ? `, ${
                                                      BED_TYPE.filter(
                                                          (el) =>
                                                              el.code_key ===
                                                              item,
                                                      )[0].code_value_ko
                                                  }`
                                                : BED_TYPE.filter(
                                                      (el) =>
                                                          el.code_key === item,
                                                  )[0].code_value_ko,
                                        )}
                                {roomInfo.additional_info.length !== 0 &&
                                    roomInfo.additional_info.filter(
                                        (el) => el.key_name === "BED_COUNT",
                                    ).length !== 0 && (
                                        <>
                                            {` / ${
                                                roomInfo.additional_info.filter(
                                                    (el) =>
                                                        el.key_name ===
                                                        "BED_COUNT",
                                                )[0].additional_memo
                                            } 개`}
                                        </>
                                    )}
                            </p>
                        </div>
                        <div className="service_icon">
                            {additionalInfo.map((item, idx) => (
                                <p
                                    key={`additionalInfo_${roomInfo.room_idx}_${idx}`}
                                >
                                    {additionalFunc(item, idx)}
                                </p>
                            ))}
                            {/*<p>*/}
                            {/*    <img src="img/icon/BED.svg" alt="" />*/}
                            {/*    퀸사이즈침대 1개*/}
                            {/*</p>*/}
                            {/*<p>*/}
                            {/*    <img src="img/icon/WIFI.svg" alt="" /> 무료 WiFi*/}
                            {/*</p>*/}
                            {/*<p>*/}
                            {/*    <img src="img/icon/PARKING.svg" alt="" /> 무료*/}
                            {/*    셀프 주차*/}
                            {/*</p>*/}
                            <Link
                                to=""
                                onClick={() => openRoomDetail(roomInfo)}
                            >
                                + 시설&서비스 모두 보기
                            </Link>
                        </div>
                    </div>
                    <div className="pay">
                        {/*{summary_info.length !== 0 &&*/}
                        {/*    priceInfoFunc()}*/}
                        {summary_info.length !== 0 && (
                            <>
                                <div>
                                    <p className="cost">{`₩${CommonCommaPattern(
                                        summary_info[0].origin_price ?? "0",
                                        3,
                                    )}`}</p>
                                    <p className="price">{`₩${CommonCommaPattern(
                                        summary_info[0].room_price ?? "0",
                                        3,
                                    )} ~`}</p>
                                    {/*<p className="sale">{`${saleRate}% 할인`}</p>*/}
                                </div>
                                <Link
                                    // href="hotel_reservation_step1.html"
                                    to={routerPath.reserve_date_select}
                                    state={{
                                        hotelIdx: hotelInfo.hotel_idx,
                                        hotelInfo: hotelListInfo,
                                        roomInfo: roomInfo,
                                    }}
                                >
                                    예약 바로가기
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div id="room_slide" className="swiper-container room_slide">
                    {fileInfo.length !== 0 && (
                        <Swiper
                            id="room_slide2"
                            className="swiper-container"
                            slidesPerView={3}
                            spaceBetween={23}
                            loop={fileInfo.length > 2}
                            // loopAdditionalSlides={1}
                            pagination={{
                                el: ".swiper-scrollbar",
                                type: "progressbar",
                            }}
                            autoplay={false}
                            freeMode={false}
                        >
                            {fileInfo.map((item, idx) => (
                                <SwiperSlide
                                    className="swiper-slide"
                                    key={`swiper_${idx}`}
                                >
                                    <img
                                        src={`${apiPath.api_img_path}${item.file_path_enc}`}
                                        alt=""
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
                {/*<div className="additional_info">*/}
                {/*    <b>추가정보</b>*/}
                {/*    <br />*/}
                {/*    체크인 혼잡시간*/}
                {/*    <br />*/}
                {/*    주중 15:00 - 17:00*/}
                {/*    <br />*/}
                {/*    주말 16:00 - 18:00*/}
                {/*    <br />*/}
                {/*    입실시 혼잡시간을 피하여 입실하시면 기다리시는 시간을 줄일*/}
                {/*    수 있으며, 객실 배정에 불이익이 없습니다.*/}
                {/*    <br />*/}
                {/*    <br />*/}
                {/*    시간연장*/}
                {/*    <br />*/}
                {/*    Early check-in , Late check-out은 시간당 22,000원이 부과되며*/}
                {/*    퇴실 당일 기준 14시 이후에는 1박요금이 청구됩니다.*/}
                {/*    <br />*/}
                {/*    퇴실 시간 연장을 원하시는분께서는 프론트로 연락바랍니다.*/}
                {/*    <br />*/}
                {/*    <br />*/}
                {/*    <b>추가 유료 서비스</b>*/}
                {/*    <br />*/}
                {/*    조식뷔페 성인*/}
                {/*    <br />*/}
                {/*    조식뷔페 소인(8세~13세)*/}
                {/*    <br />*/}
                {/*    파인타워 인피니티풀 대인*/}
                {/*    <br />*/}
                {/*    파인타워 인피니티풀 소인*/}
                {/*    <br />*/}
                {/*    VR렌탈 서비스*/}
                {/*</div>*/}
                {/*<Link to="" className="font-12 additional_info_btn">*/}
                {/*    추가정보 보기*/}
                {/*</Link>*/}
            </li>

            <CommonModal
                isOpen={isOpen}
                title={""}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"HotelDetailRoomsModal"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
                noLine={true}
            />
        </>
    );
};

export default HotelDetailRoomsComponent;
