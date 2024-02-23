import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonRest, CommonNotify } from "common/js/Common";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { successCode } from "common/js/resultCode";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const ArtistDetailMain = () => {
    // const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);

    // url params
    const params = useParams();
    const peopleIdx = params ? params.peopleIdx : "";

    // states
    const [artistInfo, setArtistInfo] = useState({});
    const [peopleType, setPeopleType] = useState([]);
    const [profileType, setProfileType] = useState([]);
    const [swiperItem, setSwiperItem] = useState([]);

    const [state, setState] = useState({
        profileSection: [], // Initialize with your actual state structure
        selectedProfile: [], // Initialize with your actual state structure
    });

    useEffect(() => {
        codes.length === 0 ? setIsSpinner(true) : setIsSpinner(false);

        codes.length !== 0 && setPeopleTypeFunc();

        codes.length !== 0 && getArtistInfo();
    }, [codes]);

    const setPeopleTypeFunc = () => {
        // 인물타입
        const peopleTypeArr = codes.filter(
            (el) => el.code_type === "PEOPLE_TYPE",
        );
        setPeopleType(peopleTypeArr);

        // 프로필타입
        const profileTypeArr = codes.filter(
            (el) => el.code_type === "PROFILE_TYPE",
        );
        setProfileType(profileTypeArr);
    };

    /**
     * 아티스트 정보 받아오기
     */
    const getArtistInfo = () => {
        setIsSpinner(true);

        const url = apiPath.api_people_detail + peopleIdx;
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

                // 비노출일 경우 리스트 페이지로
                result_info.show_yn === "N" &&
                    navigate(routerPath.medi_art_artist_list);

                setArtistInfo(result_info);

                if (result_info.work_info.length !== 0) {
                    let newArr = [];
                    const len = result_info.work_info.length;
                    for (let i = 0; i < len; i++) {
                        const url =
                            apiPath.api_img_path +
                            result_info.work_info[i].thumbnail_info[0]
                                .file_path_enc;

                        newArr.push(url);
                    }
                    setSwiperItem(newArr);
                }

                // setSwiperItem(result_info.work_info);
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

    useEffect(() => {
        Object.keys(artistInfo).length !== 0 && setDefaultProfile();
    }, [artistInfo]);

    const setDefaultProfile = () => {
        const defaultProfile = artistInfo.profile_info;
        const defaultProfileLength = defaultProfile.length;

        // 프로필 유형에 따라 정렬
        const sortedProfileInfo = defaultProfile.sort((a, b) =>
            a.profile_type_cd.localeCompare(b.profile_type_cd),
        );

        if (defaultProfileLength !== 0) {
            sortedProfileInfo.forEach((profile, i) => {
                if (
                    state.profileSection.filter(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    ).length === 0
                ) {
                    if (i === 0) {
                        setState((prevState) => ({
                            ...prevState,
                            profileSection: [
                                ...prevState.profileSection,
                                {
                                    idx: i,
                                    sectionValue: profile.profile_type_cd,
                                },
                            ],
                        }));
                    } else if (
                        sortedProfileInfo[i - 1].profile_type_cd !==
                        sortedProfileInfo[i].profile_type_cd
                    ) {
                        setState((prevState) => ({
                            ...prevState,
                            profileSection: [
                                ...prevState.profileSection,
                                {
                                    idx: i,
                                    sectionValue: profile.profile_type_cd,
                                },
                            ],
                        }));
                    }
                }
            });

            // defaultProfile.forEach((profile, i) => {
            //     if (
            //         state.profileSection.filter(
            //             (el) => el.sectionValue === profile.profile_type_cd,
            //         ).length !== 0
            //     ) {
            //         const parentObj = state.profileSection.find(
            //             (el) => el.sectionValue === profile.profile_type_cd,
            //         );
            //         const obj = {
            //             parentIdx: parentObj.idx,
            //             profileType: parentObj.sectionValue,
            //             profileContentKo: profile.profile_content_ko,
            //             profileContentEn: profile.profile_content_en,
            //             inputIdx: i + 1,
            //         };
            //
            //         setState((prevState) => ({
            //             ...prevState,
            //             selectedProfile: [...prevState.selectedProfile, obj],
            //         }));
            //     }
            // });
        }
    };

    useEffect(() => {
        const defaultProfile = artistInfo.profile_info;

        // // 프로필 유형에 따라 정렬
        // const sortedProfileInfo = defaultProfile.sort((a, b) =>
        //     a.profile_type_cd.localeCompare(b.profile_type_cd),
        // );

        if (state.profileSection.length !== 0) {
            defaultProfile.forEach((profile, i) => {
                if (
                    state.profileSection.filter(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    ).length !== 0
                ) {
                    const parentObj = state.profileSection.find(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    );
                    const obj = {
                        parentIdx: parentObj.idx,
                        profileType: parentObj.sectionValue,
                        profileContentKo: profile.profile_content_ko,
                        profileContentEn: profile.profile_content_en,
                        inputIdx: i + 1,
                    };

                    setState((prevState) => ({
                        ...prevState,
                        selectedProfile: [...prevState.selectedProfile, obj],
                    }));
                }
            });
        }
    }, [state.profileSection]);

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">

                    <div className="galleryView">
                        {Object.keys(artistInfo).length !== 0 && (
                            <>
                                <div className="top_name">
                                    <h4>{artistInfo.name_ko}</h4>
                                    <h5>
                                        {artistInfo.name_ko
                                            ? artistInfo.name_en
                                            : artistInfo.name_ko}
                                    </h5>
                                </div>

                                {/*이미지 스와이퍼 영역 S*/}
                                {swiperItem.length !== 0 && (
                                    <Swiper
                                        className="swiper-container artist_work"
                                        speed={1000}
                                        slidesPerView={'auto'}
                                        spaceBetween={20}
                                        loop={true}
                                        navigation={false}
                                        grabCursor={true}
                                        pagination={false}
                                        pagination={{
                                            type: 'progressbar',
                                          }}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                spaceBetween: 40,
                                            },
                                        }}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[
                                            Autoplay,
                                            EffectCoverflow,
                                            Navigation,
                                            Pagination,
                                        ]}
                                    >
                                        {swiperItem.length !== 0 &&
                                            swiperItem.map((item, idx) => (
                                                <SwiperSlide
                                                    className="swiper-slide"
                                                    key={`swiper_${idx}`}
                                                >
                                                    <img
                                                        src={item}
                                                        alt=""
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                )}
                                {/*이미지 스와이퍼 영역 E*/}

                                <div className="artinfo artist_info">
                                    <div className="left">
                                        <div className="thumb">
                                            <img
                                                src={
                                                    apiPath.api_img_path +
                                                    artistInfo.file_info[0]
                                                        .file_path_enc
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <h4 className="artist">
                                            <span>
                                                {/*{*/}
                                                {/*    peopleType.filter(*/}
                                                {/*        (el) =>*/}
                                                {/*            el.code_key ===*/}
                                                {/*            artistInfo.people_type_cd,*/}
                                                {/*    )[0].code_value_en*/}
                                                {/*}*/}
                                                {
                                                    peopleType.filter(
                                                        (el) =>
                                                            el.code_key ===
                                                            artistInfo.people_type_cd,
                                                    )[0].code_value_ko
                                                }
                                            </span>
                                            <br />
                                            {artistInfo.name_ko
                                                ? artistInfo.name_ko
                                                : artistInfo.name_en}
                                        </h4>
                                        <pre>
                                            {artistInfo.people_memo_ko
                                                ? artistInfo.people_memo_ko
                                                : artistInfo.people_memo_en}
                                        </pre>
                                    </div>

                                    <div className="right">
                                        {state.profileSection.length !== 0 &&
                                            state.profileSection.map(
                                                (item, idx) => (
                                                    <>
                                                        <div
                                                            className="artnote"
                                                            // key={item.sectionValue}
                                                            key={`profileSection-${item.idx}`}
                                                        >
                                                            <h4>
                                                                {/*{*/}
                                                                {/*    profileType.filter(*/}
                                                                {/*        (el) =>*/}
                                                                {/*            el.code_key ===*/}
                                                                {/*            item.sectionValue,*/}
                                                                {/*    )[0]*/}
                                                                {/*        .code_value_en*/}
                                                                {/*}*/}
                                                                {
                                                                    profileType.filter(
                                                                        (el) =>
                                                                            el.code_key ===
                                                                            item.sectionValue,
                                                                    )[0]
                                                                        .code_value_ko
                                                                }
                                                            </h4>
                                                            <ul>
                                                                {state
                                                                    .selectedProfile
                                                                    .length !==
                                                                    0 &&
                                                                    state.selectedProfile
                                                                        .filter(
                                                                            (
                                                                                el,
                                                                            ) =>
                                                                                el.parentIdx ===
                                                                                item.idx,
                                                                        )
                                                                        .map(
                                                                            (
                                                                                inputItem,
                                                                            ) => (
                                                                                <li
                                                                                    key={`${inputItem.parentIdx}-${inputItem.inputIdx}`}
                                                                                >
                                                                                    {inputItem.profileContentKo
                                                                                        ? inputItem.profileContentKo
                                                                                        : inputItem.profileContentEn}
                                                                                </li>
                                                                            ),
                                                                        )}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/*content E*/}

            {/*footer //S*/}
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default ArtistDetailMain;
