import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import { successCode } from "common/js/resultCode";
import { Skeleton } from "@mui/material";

const MainHotel = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const userToken = useRecoilValue(userTokenAtom);

    const [hotelItems, setHotelItems] = useState([]);

    useEffect(() => {
        getHotelList();
    }, []);

    const getHotelList = () => {
        const url = apiPath.api_hotel_list_no_auth;
        const data = {
            page_num: 1,
            page_size: 0,
            search_keyword: "",
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
                const page_info = res.data.page_info;

                setHotelItems(result_info);
                // hotelStateSet(result_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const defaultSkeleton = () => {
        const renderItem = (
            <>
                <Link to="">
                    <span className="hotel_thumb">
                        <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={"100%"}
                        />
                    </span>
                    <h4 className="font-24">
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1.6rem" }}
                            width={"50%"}
                        />
                    </h4>
                    <p className="font-21 gray-8">
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1.3rem" }}
                            width={"70%"}
                        />
                    </p>
                </Link>
            </>
        );

        const result = [];
        for (let i = 0; i < 4; i++) {
            result.push(renderItem);
        }

        return result;
    };

    return (
        <div className="main_hotel">
            <div className="title">
                <h3>메디씨티와 함께 즐거운 추억을 만들어보세요!</h3>
                <p>추천 HOTEL</p>
            </div>

            <Swiper
                modules={[Pagination, Autoplay]}
                id="hotel-slide"
                className="swiper-container"
                slidesPerView={4}
                spaceBetween={40}
                loop={hotelItems.length > 4}
                pagination={{
                    el: ".swiper-scrollbar",
                    type: "progressbar",
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
            >
                <ul className="swiper-wrapper">
                    {hotelItems.length !== 0
                        ? hotelItems.map((item, idx) => (
                              <SwiperSlide
                                  key={`hotel_${idx}`}
                                  className={item.event === "Y" ? "event" : ""}
                              >
                                  {!userToken ? (
                                      <Link
                                          to=""
                                          onClick={() => {
                                              CommonNotify({
                                                  type: "alert",
                                                  hook: alert,
                                                  message:
                                                      "로그인이 필요한 서비스입니다.",
                                              });
                                          }}
                                      >
                                          <span className="hotel_thumb">
                                              <img
                                                  src={`${apiPath.api_img_path}${item.file_path_enc}`}
                                                  alt=""
                                              />
                                          </span>
                                          <h4 className="font-24">
                                              {item.name_ko}
                                          </h4>
                                          <p className="font-21 gray-8">
                                              {item.name_en}
                                          </p>
                                      </Link>
                                  ) : (
                                      <Link
                                          to={`${routerPath.hotel_detail}${item.hotel_idx}`}
                                          state={{
                                              hotelIdx: item.hotel_idx,
                                              hotelListInfo: item,
                                          }}
                                      >
                                          <span className="hotel_thumb">
                                              <img
                                                  src={`${apiPath.api_img_path}${item.file_path_enc}`}
                                                  alt=""
                                              />
                                          </span>
                                          <h4 className="font-24">
                                              {item.name_ko}
                                          </h4>
                                          <p className="font-21 gray-8">
                                              {item.name_en}
                                          </p>
                                      </Link>
                                  )}
                              </SwiperSlide>
                          ))
                        : defaultSkeleton().map((item, idx) => (
                              <SwiperSlide key={`skeleton_${idx}`}>
                                  {item}
                              </SwiperSlide>
                          ))}
                </ul>

                <div className="swiper-scrollbar"></div>
            </Swiper>
        </div>
    );
};

export default MainHotel;
