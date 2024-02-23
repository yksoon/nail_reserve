import { Route, Routes } from "react-router-dom";

import { routerPath } from "webPath";

import NotFoundPage from "NotFoundPage";
import { Suspense, lazy } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import HealthCheck from "components/HealthCheck";
import Main from "components/main/Main";
import SignUpMain from "components/signUp/SignUpMain";
import SignUpOk from "components/signUp/SignUpOk";
import TermsMain from "components/termPrivacy/TermMain";
import PrivacyMain from "components/termPrivacy/PrivacyMain";
import FindIDMain from "components/findAccount/findID/FindIDMain";
import FindPWMain from "components/findAccount/findPW/FindPWMain";
import MyPageMain from "components/myPage/myPage/main/MyPageMain";
import CertResult from "components/common/CertResult";
import ModMyPageMain from "components/myPage/modMyPage/ModMyPageMain";
import SvgList from "SvgList";
import ModMyPageUser from "components/myPage/modMyPage/ModMyPageUser";
import KakaoTest from "KakaoTest";
import HotelList from "components/hotel/list/HotelList";
import HotelDetailMain from "components/hotel/detail/HotelDetailMain";
import ReserveDateSelect from "components/hotel/reserve/ReserveDateSelect";
import ReserveRoomSelect from "components/hotel/reserve/ReserveRoomSelect";
import ReserveGuestSelect from "components/hotel/reserve/ReserveGuestSelect";
import ReserveSuccess from "components/hotel/reserve/ReserveSuccess";
import ServiceMain from "components/service/ServiceMain";
import GalleryListMain from "components/mediArt/gallery/GalleryListMain";
import ArtistListMain from "components/mediArt/artist/ArtistListMain";
import GalleryDetailMain from "components/mediArt/gallery/GalleryDetailMain";
import ArtistDetailMain from "components/mediArt/artist/ArtistDetailMain";
import ReservePaymentSelect from "components/hotel/reserve/ReservePaymentSelect";
import ReserveMain from "components/myPage/myPage/reserve/ReserveMain";
import ReserveDetail from "components/myPage/myPage/reserve/ReserveDetail";
import ReserveTemporaryMain from "components/myPage/myPage/reserveTemporary/ReserveTemporaryMain";
import ConsultingMain from "components/tax/ConsultingMain";
import CreatorMain from "components/kmedi/CreatorMain";
import NoticeListMain from "components/notice/NoticeListMain";
import NoticeDetailMain from "components/notice/NoticeDetailMain";
import NewsListMain from "components/societyNews/NewsListMain";
import NewsDetailMain from "components/societyNews/NewsDetailMain";
import CustomerMain from "components/service/CustomerMain";
import PartnershipMain from "components/service/PartnershipMain";
import FaqListMain from "components/faq/FaqListMain";
import EventListMain from "components/event/EventListMain";
import EventDetailMain from "components/event/EventDetailMain";

const Router = () => {
    // 레이지 로딩 추가
    // const Main = lazy(() => import("components/main/Main"));
    // const MyPageMain = lazy(() =>
    //     import("components/myPage/myPage/MyPageMain")
    // );
    // const SignUpMain = lazy(() => import("components/signUp/SignUpMain"));
    // const SignUpOk = lazy(() => import("components/signUp/SignUpOk"));
    // const TermsMain = lazy(() => import("components/termPrivacy/TermMain"));
    // const PrivacyMain = lazy(() =>
    //     import("components/termPrivacy/PrivacyMain")
    // );
    // const FindIdMain = lazy(() =>
    //     import("components/findAccount/findID/FindIDMain")
    // );
    // const FindPWMain = lazy(() =>
    //     import("components/findAccount/findPW/FindPWMain")
    // );

    return (
        <Suspense
            fallback={
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        >
            <Routes>
                {/* /link를 입력하면 LinkPage 오픈 */}
                {/* 메인 */}
                <Route path={routerPath.main_url} element={<Main />} />
                {/* 회원가임 */}
                <Route path={routerPath.signup_url} element={<SignUpMain />} />
                <Route path={routerPath.signup_ok_url} element={<SignUpOk />} />
                <Route path={routerPath.terms_url} element={<TermsMain />} />
                <Route
                    path={routerPath.privacy_url}
                    element={<PrivacyMain />}
                />
                {/* 아이디 찾기 */}
                <Route path={routerPath.findId_url} element={<FindIDMain />} />

                {/* 비번 찾기 */}
                <Route path={routerPath.findPw_url} element={<FindPWMain />} />

                {/* 마이페이지 */}
                <Route path={routerPath.myPage_url} element={<MyPageMain />} />

                {/* 마이페이지 - 예약 */}
                <Route
                    path={routerPath.my_page_reserve_url}
                    element={<ReserveMain />}
                />

                {/* 마이페이지 - 예약중 */}
                <Route
                    path={routerPath.my_page_reserve_temp_url}
                    element={<ReserveTemporaryMain />}
                />

                {/* 마이페이지 - 예약 상세보기 */}
                <Route
                    path={routerPath.my_page_reserve_detail_url}
                    element={<ReserveDetail />}
                />

                {/* 본인인증결과 */}
                <Route
                    path={`${routerPath.cert_result}:cert_idx`}
                    element={<CertResult />}
                />
                {/* 회원정보 수정 (비번입력) */}
                <Route
                    path={`${routerPath.mod_mypage}`}
                    element={<ModMyPageMain />}
                />
                {/* 회원정보 수정 (비번입력) */}
                <Route
                    path={`${routerPath.mod_mypage_user}`}
                    element={<ModMyPageUser />}
                />
                {/*
                    // 전체서비스
                    // /service
                 */}
                <Route
                    path={`${routerPath.service_url}`}
                    element={<ServiceMain />}
                />
                {/*
                    // Hotel - List
                    // 호텔 - 리스트
                    // /hotel/list
                 */}
                <Route
                    path={`${routerPath.hotel_list}`}
                    element={<HotelList />}
                />
                {/*
                    // Hotel - detail
                    // 호텔 - 디테일
                    // /hotel/detail/idx
                 */}
                <Route
                    path={`${routerPath.hotel_detail}:hotelIdx`}
                    element={<HotelDetailMain />}
                />
                {/*
                    // reserve - date select
                    // 예약 - 날짜 선택
                    // /reserve/date-select {param}
                 */}
                <Route
                    path={`${routerPath.reserve_date_select}`}
                    element={<ReserveDateSelect />}
                />
                {/*
                    // reserve - room select
                    // 예약 - 객실 선택
                    // /reserve/room-select {param}
                 */}
                <Route
                    path={`${routerPath.reserve_room_select}`}
                    element={<ReserveRoomSelect />}
                />
                {/*
                    // reserve - guest select
                    // 예약 - 투숙객 선택
                    // /reserve/guest-select {param}
                 */}
                <Route
                    path={`${routerPath.reserve_guest_select}`}
                    element={<ReserveGuestSelect />}
                />

                {/*
                    // reserve - payment select
                    // 예약 - 결제 선택
                    // /reserve/payment-select
                 */}
                <Route
                    path={`${routerPath.reserve_payment_select}`}
                    element={<ReservePaymentSelect />}
                />

                {/*
                    // reserve - success
                    // 예약 - 완료
                    // /reserve/success
                 */}
                <Route
                    path={`${routerPath.reserve_success}`}
                    element={<ReserveSuccess />}
                />

                {/*
                    // Medi-Art 갤러리 리스트
                    // 갤러리 리스트
                    // /medi-art/gallery-list
                */}
                <Route
                    path={`${routerPath.medi_art_gallery_list}`}
                    element={<GalleryListMain />}
                />

                {/*
                    // Medi-Art 갤러리 상세
                    // 갤러리 상세
                    // /medi-art/gallery/
                */}
                <Route
                    path={`${routerPath.medi_art_gallery_detail}:workIdx`}
                    element={<GalleryDetailMain />}
                />

                {/*
                    // Medi-Art 아티스트 리스트
                    // 아티스트 리스트
                    // /medi-art/artist-list
                */}
                <Route
                    path={`${routerPath.medi_art_artist_list}`}
                    element={<ArtistListMain />}
                />

                {/*
                    // Medi-Art 아티스트 상세
                    // 아티스트 상세
                    // /medi-art/artist/
                */}
                <Route
                    path={`${routerPath.medi_art_artist_detail}:peopleIdx`}
                    element={<ArtistDetailMain />}
                />

                {/*
                    // 세무/회계 - 컨설팅
                    // 세무/회계 - 컨설팅
                    // /tax/consulting
                */}
                <Route
                    path={routerPath.tax_consulting}
                    element={<ConsultingMain />}
                />
                {/*
                    // K-medi
                    // /kmedi/creator
                */}
                <Route
                    path={routerPath.kmedi_creator}
                    element={<CreatorMain />}
                />

                {/*
                    // 공지사항 리스트
                    // /notice-list
                */}
                <Route
                    path={routerPath.notice_list}
                    element={<NoticeListMain />}
                />

                {/*
                    // 공지사항 상세
                    // /notice/{board_idx}
                */}
                <Route
                    path={`${routerPath.notice_detail}:boardIdx`}
                    element={<NoticeDetailMain />}
                />

                {/*
                    // 학회소식 리스트
                    // /news-list
                */}
                <Route path={routerPath.news_list} element={<NewsListMain />} />

                {/*
                    // 학회소식 상세
                    // /news/{board_idx}
                */}
                <Route
                    path={`${routerPath.news_detail}:boardIdx`}
                    element={<NewsDetailMain />}
                />

                {/*
                    // 고객센터
                    // /customer
                */}
                <Route path={routerPath.customer} element={<CustomerMain />} />

                {/*
                    // 제휴문의
                    // /partnership
                */}
                <Route
                    path={routerPath.partnership}
                    element={<PartnershipMain />}
                />

                {/*
                    // FAQ
                    // /faq
                */}
                <Route path={routerPath.faq_list} element={<FaqListMain />} />

                {/*
                    // 이벤트 리스트
                    // /event-list
                */}
                <Route
                    path={routerPath.event_list}
                    element={<EventListMain />}
                />

                {/*
                    // 이벤트 상세
                    // /event/{board_idx}
                */}
                <Route
                    path={`${routerPath.event_detail}:boardIdx`}
                    element={<EventDetailMain />}
                />

                {/* 카카오알림톡테스트 */}
                <Route path="/kakaotest" element={<KakaoTest />} />
                {/* 상태체크 */}
                <Route path="/health" element={<HealthCheck />} />
                {/* 아이콘 이미지 리스트 */}
                <Route path="/svg_list" element={<SvgList />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
