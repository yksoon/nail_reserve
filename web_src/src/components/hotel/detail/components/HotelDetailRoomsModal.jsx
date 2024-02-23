import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiPath } from "webPath";

const HotelDetailRoomsModal = (props) => {
    const roomInfo = props.modData.roomInfo;
    const hotelInfo = props.modData.hotelInfo;

    console.log(props.modData);

    const additionalFunc = (item) => {
        const additionalNameKo = item.additional_name_ko;
        let ret;
        if (item.additional_name_ko.includes("|")) {
            const title = additionalNameKo.split("|")[0];

            if (item.key_name.includes("COUNT")) {
                ret = (
                    <>
                        <img
                            src={`img/icon/${
                                item.key_name.includes("_")
                                    ? item.key_name.split("_")[0]
                                    : item.key_name
                            }.svg`}
                            alt=""
                        />
                        {` ${title} : ${item.additional_memo} `}
                    </>
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
                        <>
                            <img
                                src={`img/icon/${
                                    item.key_name.includes("_")
                                        ? item.key_name.split("_")[0]
                                        : item.key_name
                                }.svg`}
                                alt=""
                            />
                            {` ${title} : `}
                            {additionalMemoArr.map((item, idx) => (
                                <>{`${idx !== 0 ? ", " : ""}${obj[item]}`}</>
                            ))}
                        </>
                    );
                } else {
                    ret = (
                        <>
                            <img
                                src={`img/icon/${
                                    item.key_name.includes("_")
                                        ? item.key_name.split("_")[0]
                                        : item.key_name
                                }.svg`}
                                alt=""
                            />
                            {` ${title} : ${obj[item.additional_memo]}`}
                        </>
                    );
                }
            }
        } else {
            ret = (
                <>
                    <img
                        src={`img/icon/${
                            item.key_name.includes("_")
                                ? item.key_name.split("_")[0]
                                : item.key_name
                        }.svg`}
                        alt=""
                    />{" "}
                    {`${additionalNameKo} : ${
                        item.additional_memo ? item.additional_memo : "유"
                    }`}
                </>
            );
        }

        return ret;
    };

    return (
        <>
            <div className="room_info_modal ">
                <div className="room_info">
                    <div>
                        <h5>
                            {roomInfo.room_name_en}{" "}
                            <span>{roomInfo.room_name_ko}</span>
                        </h5>
                        <div className="service_icon">
                            {roomInfo.additional_info.map((item, idx) => (
                                <p
                                    key={`additionalInfo_${roomInfo.room_idx}_${idx}`}
                                >
                                    {additionalFunc(item)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="room_slide" className="swiper-container room_slide">
                    {roomInfo.attachment_file_info.length !== 0 && (
                        <Swiper
                            id="room_slide2"
                            className="swiper-container"
                            slidesPerView={3}
                            spaceBetween={23}
                            loop={roomInfo.attachment_file_info.length > 3}
                            // loopAdditionalSlides={1}
                            pagination={{
                                el: ".swiper-scrollbar",
                                type: "progressbar",
                            }}
                            autoplay={false}
                            freeMode={false}
                        >
                            {roomInfo.attachment_file_info.map((item, idx) => (
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
            </div>
            <div className="additional_info">
                <b>추가정보</b>
                <br />
                {hotelInfo.check_in_time &&
                    `체크인 : ${hotelInfo.check_in_time}`}
                <br />
                {hotelInfo.check_out_time &&
                    `체크아웃 : ${hotelInfo.check_out_time}`}
                <br />
                입실시 혼잡시간을 피하여 입실하시면 기다리시는 시간을 줄일 수
                있으며, 객실 배정에 불이익이 없습니다.
                <br />
                <br />
                {roomInfo.min_people && `기준인원 : ${roomInfo.min_people} 명`}
                <br />
                {roomInfo.max_people && `최대인원 : ${roomInfo.max_people} 명`}
                <br />
                <br />
                {roomInfo.info_ko && (
                    <>
                        <pre>{roomInfo.info_ko}</pre>
                        <br />
                        <br />
                    </>
                )}
                {roomInfo.rule_ko && (
                    <>
                        <b>이용 안내</b>
                        <br />
                        <pre>{roomInfo.rule_ko}</pre>
                    </>
                )}
            </div>
        </>
    );
};

export default HotelDetailRoomsModal;
