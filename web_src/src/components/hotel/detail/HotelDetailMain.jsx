import React, { useEffect, useState, useRef, Fragment } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { useLocation, useNavigate } from "react-router";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import { useParams } from "react-router";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link } from "react-router-dom";
import $ from "jquery";
import HotelDetailRoomsComponent from "components/hotel/detail/components/HotelDetailRoomsComponent";
import HotelDetailModal from "components/hotel/detail/modal/HotelDetailModal";
import { Rating } from "@mui/material";

const HotelDetailMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // navigate
    const navigate = useNavigate();

    // token
    const userToken = useRecoilValue(userTokenAtom);

    // url params
    const params = useParams();
    const hotelIdx = params ? params.hotelIdx : "";

    const location = useLocation();
    const locationState = location.state;

    const hotelListInfo = locationState?.hotelListInfo;

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    // states
    const [hotelInfo, setHotelInfo] = useState({});
    const [roomList, setRoomList] = useState([]);
    const [hotelFileInfo, setHotelFileInfo] = useState([]);

    const mainImage = useRef(null);

    // useEffect(() => {
    //     // 상단 썸네일
    //     $(".small_thumb_img").click(function () {
    //         const imgSrc = $(this).children("img").attr("src");
    //         console.log(imgSrc);
    //         $(".big_thumb").children("img").attr("src", imgSrc);
    //     });
    // }, []);

    useEffect(() => {
        !userToken
            ? CommonNotify({
                  type: "alert",
                  hook: alert,
                  message: "로그인이 필요한 서비스입니다.",
                  callback: () => navigate(routerPath.main_url),
              })
            : getHotelDetail();
    }, [userToken]);

    /**
     * Hotel Detail
     */
    const getHotelDetail = () => {
        setIsSpinner(true);

        const url = apiPath.api_hotel_detail + hotelIdx;
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
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;

                setHotelInfo(result_info);

                if (result_info.attachment_file_info.length !== 0) {
                    setHotelFileInfo(result_info.attachment_file_info);
                }

                // setIsSpinner(false);

                getRoomList(result_info.hotel_idx);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    /**
     * Room List
     * @param hotelIdx
     */
    const getRoomList = (hotelIdx) => {
        const url = apiPath.api_reserve_rooms;
        const data = {
            // page_num: 1,
            // page_size: 0,
            // search_keyword: "",
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

                setRoomList(result_info);

                // console.log(result_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const clickImage = (src) => {
        mainImage.current.src = src;
    };

    // 모달창 닫기
    const handleModalClose = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
    };

    const openModal = (item, title) => {
        setModalTitle(title);
        setModData(item);
        setIsOpen(true);
    };

    const openAdditional = (items, title) => {
        const itemsLength = items.length;

        let retArr = [];
        for (let i = 0; i < itemsLength; i++) {
            const newObj = (
                <>
                    <img src={`img/icon/${items[i].img_name}.svg`} alt="" />
                    {` ${items[i].additional_name_ko} `}
                    <br />
                </>
            );

            retArr.push(newObj);
        }

        setModalTitle(title);
        setModData(retArr);
        setIsOpen(true);
    };

    const HotelIntro = ({ info_ko }) => {
        const [isShort, setIsShort] = useState(true);
        const maxLength = 260;

        const getDisplayContent = () => {
            return isShort && info_ko.length > maxLength
                ? `${info_ko.substring(0, maxLength)}...`
                : info_ko;
        };

        const toggleContent = () => {
            setIsShort(!isShort);
        };

        return (
            <div className="hotel_intro">
                <pre className="hotel_intro_text">{getDisplayContent()}</pre>
                {info_ko.length > maxLength && (
                    <a className="more" onClick={toggleContent}>
                        {isShort ? "더보기" : "접기"}
                    </a>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Header S */}
            <Header />
            {/* Header E */}

            {/* Content S */}
            <div id="con_area">
                {Object.keys(hotelInfo).length !== 0 && (
                    <>
                        <h2 className="subtitle">HOTEL</h2>
                        <div className="hotel_view">
                            <div className="hotel_info">
                                {hotelFileInfo.length !== 0 && (
                                    <>
                                        <div className="hotel_list_thumb">
                                            <span className="big_thumb">
                                                <img
                                                    src={`${apiPath.api_img_path}${hotelFileInfo[0].file_path_enc}`}
                                                    alt=""
                                                    ref={mainImage}
                                                />
                                            </span>
                                            <div className="small_thumb">
                                                {hotelFileInfo.map(
                                                    (item, idx) => (
                                                        <span
                                                            className="small_thumb_img"
                                                            key={`file_${idx}`}
                                                            onClick={() =>
                                                                clickImage(
                                                                    `${apiPath.api_img_path}${item.file_path_enc}`,
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={`${apiPath.api_img_path}${item.file_path_enc}`}
                                                                alt=""
                                                            />
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="hotel_list_txt">
                                    {/*<div className="event">*/}
                                    {/*    <img*/}
                                    {/*        src="img/common/label_event.png"*/}
                                    {/*        alt=""*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div className="info_link">
                                        <h3>{hotelInfo.name_ko}</h3>
                                        <Link
                                            to={`https://map.kakao.com/?q=${hotelInfo.addr1_ko}`}
                                            target="_blank"
                                            className="img_btn"
                                        >
                                            <img
                                                src="img/sub/hotel_map.png"
                                                alt=""
                                            />
                                        </Link>
                                        {hotelInfo.home_page_show_yn ===
                                            "Y" && (
                                            <Link
                                                to={hotelInfo.home_page}
                                                target="_blank"
                                                className="img_btn"
                                            >
                                                <img
                                                    src="img/sub/hotel_homepage.png"
                                                    alt=""
                                                />
                                            </Link>
                                        )}
                                        <Link
                                            to=""
                                            onClick={() =>
                                                openModal(
                                                    hotelInfo.rule_ko,
                                                    "호텔 정책",
                                                )
                                            }
                                        >
                                            호텔정책
                                        </Link>
                                        <Link
                                            to=""
                                            onClick={() =>
                                                openAdditional(
                                                    hotelInfo.additional_info,
                                                    "시설&서비스",
                                                )
                                            }
                                        >
                                            시설&서비스
                                        </Link>
                                    </div>
                                    <h5>{hotelInfo.name_en}</h5>
                                    <div className="hotel_venue">
                                        <span>
                                            <Rating
                                                name="simple-controlled"
                                                value={Number(hotelInfo.grade)}
                                                max={7}
                                                precision={0.5}
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
                                    {/*<div className="hotel_intro">*/}
                                    {/*    <pre className="hotel_intro_text">*/}
                                    {/*        {hotelInfo.info_ko}*/}
                                    {/*    </pre>*/}
                                    {/*</div>*/}
                                    <HotelIntro info_ko={hotelInfo.info_ko} />
                                </div>
                            </div>
                            <ul className="room_list">
                                {roomList.length !== 0 ? (
                                    roomList.map((item, idx) => (
                                        <Fragment key={`roomList_${idx}`}>
                                            <HotelDetailRoomsComponent
                                                roomInfo={item}
                                                hotelInfo={hotelInfo}
                                                hotelListInfo={hotelListInfo}
                                            />
                                        </Fragment>
                                    ))
                                ) : (
                                    <>
                                        <h3>등록된 객실이 없습니다.</h3>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="btn_box">
                            <Link
                                to={routerPath.hotel_list}
                                className="backbtn"
                            >
                                뒤로 가기
                            </Link>
                        </div>
                    </>
                )}
            </div>
            {/* Content E */}

            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1000"}
                handleModalClose={handleModalClose}
                component={"HotelDetailModal"}
                // handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />

            {/* Footer S */}
            <Footer />
            {/* Footer E */}
        </>
    );
};

export default HotelDetailMain;
