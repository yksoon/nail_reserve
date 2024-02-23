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
import CountrySelect from "components/common/CountrySelect";
import { commentType } from "common/js/static";

const GalleryDetailMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const [isNeedUpdate, setIsNeedUpdate] = useState(false);

    const codes = useRecoilValue(codesAtom);
    const countryBank = useRecoilValue(countryBankAtom);

    // refs
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const email = useRef(null);
    const memo = useRef(null);

    // url params
    const params = useParams();
    const workIdx = params ? params?.workIdx : "";

    // states
    const [galleryInfo, setGalleryInfo] = useState({});
    const [peopleType, setPeopleType] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [currencyCode, setCurrencyCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("82");

    useEffect(() => {
        codes.length === 0 ? setIsSpinner(true) : setIsSpinner(false);

        codes.length !== 0 && setPeopleTypeFunc();

        codes.length !== 0 && getWorkInfo();
    }, [codes]);

    const setPeopleTypeFunc = () => {
        // 인물타입
        const peopleTypeArr = codes.filter(
            (el) => el.code_type === "PEOPLE_TYPE",
        );
        setPeopleType(peopleTypeArr);

        // 통화코드
        const currencyArr = countryBank.filter(
            (e) => e.code_type === "CURRENCY_TYPE",
        );
        setCurrencies(currencyArr);
    };

    /**
     * 작품 정보 받아오기
     */
    const getWorkInfo = () => {
        setIsSpinner(true);

        // /v1/_gallery/{work_idx}/
        // GET
        // 갤러리 상세
        const url = apiPath.api_gallery_detail + workIdx;
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
                    navigate(routerPath.web_artbuddy_gallery_list_url);

                setGalleryInfo(result_info);

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
        currencies.length !== 0 &&
            Object.keys(galleryInfo).length !== 0 &&
            galleryInfo.currency_type_cd &&
            setCurrencyCode(
                currencies.filter(
                    (el) => el.code_key === galleryInfo.currency_type_cd,
                )[0].code_value_en ?? "",
            );
    }, [currencies]);

    // 문의글 작성
    const regComment = () => {
        if (validation()) {
            setIsSpinner(true);

            // const model = commentModel;
            const formData = new FormData();

            // /v1/_board
            // POST MULTI
            // 게시판 등록
            const url = apiPath.api_mng_comment_reg;
            let data = {};

            data = {
                // ...model,
                showYn: "Y",
                commentType: commentType.gallery,
                boardIdx: galleryInfo.work_idx,
                targetIdx: galleryInfo.work_idx,
                userNameFirstKo: nameFirstEn.current.value,
                userNameFirstEn: nameFirstEn.current.value,
                userNameLastKo: nameLastEn.current.value,
                userNameLastEn: nameLastEn.current.value,
                subjectKo: galleryInfo.main_title_ko,
                subjectEn: galleryInfo.main_title_en,
                subTitleKo: galleryInfo.sub_title_ko,
                subTitleEn: galleryInfo.sub_title_en,
                interPhoneNumber: selectedCountry,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                email: email.current.value,
                contentKo: memo.current.value,
                contentEn: memo.current.value,
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const restParams = {
                method: "post_multi",
                url: url,
                data: formData,
                err: err,
                callback: (res) => responseLogic(res),
            };

            CommonRest(restParams);

            const responseLogic = (res) => {
                let result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: `저희 작품에 관심을 가져주셔서 감사합니다.\n귀하의 문의에 감사드립니다.`,
                        callback: () => handleNeedUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요.",
                    });
                }
            };
        }
    };

    // 페이지 새로고침
    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
        // 입력값 초기화
        nameFirstEn.current.value = null;
        nameLastEn.current.value = null;
        mobile1.current.value = null;
        mobile2.current.value = null;
        mobile3.current.value = null;
        email.current.value = null;
        memo.current.value = null;
        setSelectedCountry("82");
    };

    // 문의글 입력값 검증
    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref.current.focus();
            };
        };

        if (!nameFirstEn.current.value) {
            noti(nameFirstEn, "성을 입려해주세요");

            return false;
        }

        if (!nameLastEn.current.value) {
            noti(nameLastEn, "이름을 입려해주세요");

            return false;
        }

        if (
            !mobile1.current.value ||
            !mobile2.current.value ||
            !mobile3.current.value
        ) {
            noti(mobile1, "연락처를 입력해주세요");

            return false;
        }

        if (!mobile2.current.value) {
            noti(mobile2, "연락처를 입력해주세요");

            return false;
        }

        if (!mobile3.current.value) {
            noti(mobile3, "연락처를 입력해주세요");

            return false;
        }

        if (!email.current.value) {
            noti(email, "이메일 주소를 입력해주세요");

            return false;
        }

        if (!memo.current.value) {
            noti(memo, "문의 내용을 입력해주세요");

            return false;
        }

        return true;
    };

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            {/*content S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    {Object.keys(galleryInfo).length !== 0 && (
                        <div className="galleryView">
                            <p className="artbox">
                                <img
                                    src={
                                        apiPath.api_img_path +
                                        galleryInfo.thumbnail_info[0]
                                            .file_path_enc
                                    }
                                    alt=""
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                />
                            </p>
                            <div className="artinfo">
                                <h4 className="artist">
                                    <span>
                                        {/*{*/}
                                        {/*    peopleType.filter(*/}
                                        {/*        (el) =>*/}
                                        {/*            el.code_key ===*/}
                                        {/*            galleryInfo.people_type_cd,*/}
                                        {/*    )[0].code_value_en*/}
                                        {/*}*/}
                                        {
                                            peopleType.filter(
                                                (el) =>
                                                    el.code_key ===
                                                    galleryInfo.people_type_cd,
                                            )[0].code_value_ko
                                        }
                                    </span>
                                    <br />
                                    <Link
                                        to={`${routerPath.medi_art_artist_detail}${galleryInfo.people_idx}`}
                                    >
                                        {galleryInfo.name_ko
                                            ? galleryInfo.name_ko
                                            : galleryInfo.name_en}
                                    </Link>
                                </h4>
                                <ul>
                                    <li>
                                        <span>Title</span>
                                        {galleryInfo.main_title_ko
                                            ? galleryInfo.main_title_ko
                                            : galleryInfo.main_title_en}
                                    </li>
                                    {galleryInfo.size_info_show_yn === "Y" && (
                                        <li>
                                            <span>Size</span>
                                            {galleryInfo.size_info_ko
                                                ? galleryInfo.size_info_ko
                                                : galleryInfo.size_info_en}
                                        </li>
                                    )}
                                    {galleryInfo.materials_info_show_yn ===
                                        "Y" && (
                                        <li>
                                            <span>Materials</span>
                                            {galleryInfo.materials_info_ko
                                                ? galleryInfo.materials_info_ko
                                                : galleryInfo.materials_info_en}
                                        </li>
                                    )}
                                    {galleryInfo.price_info_show_yn === "Y" && (
                                        <li>
                                            <span>Price</span>
                                            {currencyCode
                                                ? currencyCode.split("-")[0]
                                                : ""}{" "}
                                            {galleryInfo.price_info_ko
                                                ? `${CommonCommaPattern(
                                                      galleryInfo.price_info_ko,
                                                      3,
                                                  )} ${
                                                      currencyCode
                                                          ? currencyCode.split(
                                                                "-",
                                                            )[1]
                                                          : ""
                                                  }`
                                                : `${CommonCommaPattern(
                                                      galleryInfo.price_info_en,
                                                      3,
                                                  )} ${
                                                      currencyCode
                                                          ? currencyCode.split(
                                                                "-",
                                                            )[1]
                                                          : ""
                                                  }`}
                                        </li>
                                    )}
                                </ul>

                                {(galleryInfo.people_memo_en ||
                                    galleryInfo.people_memo_ko) && (
                                    <div className="artnote">
                                        <h4>Artist’s Note</h4>
                                        <pre className="txt">
                                            {galleryInfo.people_memo_ko
                                                ? galleryInfo.people_memo_ko
                                                : galleryInfo.people_memo_en}
                                        </pre>
                                    </div>
                                )}

                                {/* 문의글 작성 */}
                                <div className="inqbox">
                                    <h4>Inquire</h4>
                                    <table>
                                        <colgroup>
                                            <col width="30%" />
                                            <col width="*" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>이름</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        ref={nameFirstEn}
                                                        placeholder="성"
                                                    />
                                                    &#32;
                                                    <input
                                                        type="text"
                                                        ref={nameLastEn}
                                                        placeholder="이름"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>연락처</th>
                                                <td>
                                                    {/*<CountrySelect*/}
                                                    {/*    onChange={(e, value) =>*/}
                                                    {/*        setSelectedCountry(*/}
                                                    {/*            value,*/}
                                                    {/*        )*/}
                                                    {/*    }*/}
                                                    {/*    defaultValue={*/}
                                                    {/*        selectedCountry*/}
                                                    {/*    }*/}
                                                    {/*    mode={"ko"}*/}
                                                    {/*/>*/}
                                                    <input
                                                        type="text"
                                                        ref={mobile1}
                                                    />
                                                    {` - `}
                                                    <input
                                                        type="text"
                                                        ref={mobile2}
                                                    />
                                                    {` - `}
                                                    <input
                                                        type="text"
                                                        ref={mobile3}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>E-mail</th>
                                                <td>
                                                    <input
                                                        type="text"
                                                        ref={email}
                                                        placeholder="email"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>문의내용</th>
                                                <td>
                                                    <textarea
                                                        ref={memo}
                                                        placeholder="내용"
                                                    ></textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="btnbox">
                                        <Link
                                            to=""
                                            className="mainbtn btn01"
                                            onClick={() => regComment()}
                                        >
                                            문의하기
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="btn_box">
                                <Link
                                    to={routerPath.medi_art_gallery_list}
                                    className="backbtn"
                                >
                                    뒤로 가기
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*content E*/}

            {/*footer //S*/}
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default GalleryDetailMain;
