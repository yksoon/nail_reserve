// 콜론, slash
const colon = ":";
const slash = "/";

const isDeveloping = import.meta.env.VITE_ISDEVELOPING;
const apiUrl = import.meta.env.VITE_API_URL;

// 프로토콜
// 호스트
// 포트
// 버전
// const protocol = "https://";
// let host = "";
//
// if (isDeveloping === "local" || isDeveloping === "dev") {
//     host = "dev-api.medi-city.co.kr";
// } else if (isDeveloping === "prd") {
//     // host = "3.36.85.141";
//     host = "api.medi-people.co.kr";
// } else {
//     host = "dev-api.medi-city.co.kr";
// }

const port = "60000";

const version = "v1";

// 기본 url
// const base_url = protocol + host + colon + port + slash + version + slash;
const base_url = "/";
// const base_api_url = protocol + host + colon + port;
const base_api_url = apiUrl + colon + port;

// Auth
const auth = "auth";

// Management Service
const mng = "mng";

// Account Service
const account = "act";

// Hotel Service
const hotel = "hotel";

// route
const routerPath = {
    // 메인
    main_url: `${base_url}`,

    // 마이페이지
    myPage_url: `${base_url}mypage${slash}`,

    // 회원가입
    signup_url: `${base_url}signup${slash}`,
    signup_ok_url: `${base_url}signupok${slash}`,

    // 약관
    terms_url: `${base_url}terms${slash}`,
    privacy_url: `${base_url}privacy${slash}`,

    // 아이디찾기
    findId_url: `${base_url}find_id${slash}`,

    // 비번찾기
    findPw_url: `${base_url}find_pw${slash}`,

    // 인증결과
    cert_result: `${base_url}cert/result${slash}`,

    // 회원정보 수정 (비번입력)
    mod_mypage: `${base_url}mypage/update${slash}`,

    // 회원정보 수정
    mod_mypage_user: `${base_url}mypage/update${slash}user${slash}`,

    // 마이페이지 - 예약
    my_page_reserve_url: `${base_url}mypage/reserve`,

    // 마이페이지 - 예약중
    my_page_reserve_temp_url: `${base_url}mypage/reserve-temporary`,

    // 마이페이지 - 예약 상세
    my_page_reserve_detail_url: `${base_url}mypage/reserve/detail`,

    /**
     * 전체서비스
     */
    service_url: `${base_url}service`,

    /**
     * Hotel
     */
    // Hotel - List
    // 호텔 - 리스트
    // /hotel/list
    hotel_list: `${base_url}hotel/list`,

    // Hotel - detail
    // 호텔 - 디테일
    // /hotel/detail/idx
    hotel_detail: `${base_url}hotel/detail${slash}`,

    // reserve - date select
    // 예약 - 날짜 선택
    // /reserve/date-select
    reserve_date_select: `${base_url}reserve/date-select`,

    // reserve - room select
    // 예약 - 객실 선택
    // /reserve/room-select
    reserve_room_select: `${base_url}reserve/room-select`,

    // reserve - guest select
    // 예약 - 투숙객 선택
    // /reserve/guest-select
    reserve_guest_select: `${base_url}reserve/guest-select`,

    // reserve - payment select
    // 예약 - 결제 선택
    // /reserve/payment-select
    reserve_payment_select: `${base_url}reserve/payment-select`,

    // reserve - success
    // 예약 - 완료
    // /reserve/success
    reserve_success: `${base_url}reserve/success`,

    // Medi-Art 갤러리 리스트
    // 갤러리 리스트
    // /medi-art/gallery-list
    medi_art_gallery_list: `${base_url}medi-art/gallery-list`,

    // Medi-Art 갤러리 상세
    // 갤러리 상세
    // /medi-art/gallery/
    medi_art_gallery_detail: `${base_url}medi-art/gallery${slash}`,

    // Medi-Art 아티스트 리스트
    // 아티스트 리스트
    // /medi-art/artist-list
    medi_art_artist_list: `${base_url}medi-art/artist-list`,

    // Medi-Art 아티스트 상세
    // 아티스트 상세
    // /medi-art/artist/
    medi_art_artist_detail: `${base_url}medi-art/artist${slash}`,

    // 세무/회계 - 컨설팅
    // 세무/회계 - 컨설팅
    // /tax/consulting
    tax_consulting: `${base_url}tax/consulting`,

    // K-medi
    // /kmedi/creator
    kmedi_creator: `${base_url}kmedi/creator`,

    // 공지사항 리스트
    // /notice-list
    notice_list: `${base_url}notice-list`,

    // 공지사항 상세
    // /notice/{board_idx}
    notice_detail: `${base_url}notice${slash}`,

    // 학회소식 리스트
    // /news-list
    news_list: `${base_url}news-list`,

    // 학회소식 상세
    // /news/{board_idx}
    news_detail: `${base_url}news${slash}`,

    // 고객센터
    // /customer
    customer: `${base_url}customer`,

    // 제휴문의
    // /partnership
    partnership: `${base_url}partnership`,

    // FAQ
    // /faq
    faq_list: `${base_url}faq`,

    // 이벤트 리스트
    // /event-list
    event_list: `${base_url}event-list`,

    // 이벤트 상세
    // /event/{board_idx}
    event_detail: `${base_url}event${slash}`,
};

// api
const apiPath = {
    // http://dev-api.medi-city.co.kr:60000/auth/v1/signin
    // File Image
    // mng/v1/_file/000/${file_path_enc}
    // get
    api_img_path: `${
        base_api_url + slash + mng + slash + version + slash
    }_file/000/`,
    // ------------------ Auth ------------------
    // Refresh POST
    api_refresh: `${
        base_api_url + slash + auth + slash + version + slash
    }refresh`,

    // 로그인 POST
    api_login: `${base_api_url + slash + auth + slash + version + slash}signin`,

    // 로그아웃 POST
    api_signout: `${
        base_api_url + slash + auth + slash + version + slash
    }signout`,

    // ------------------ Management Service ------------------
    // 게시판관리 GET PUT POST DELETE
    api_board: `${base_api_url + slash + mng + slash + version + slash}board`,

    // 게시판목록 POST
    api_boards: `${base_api_url + slash + mng + slash + version + slash}boards`,

    // 게시판 GET DELETE
    api_board_idx: `${
        base_api_url + slash + mng + slash + version + slash
    }board${slash}`,

    // 공통 결과코드
    api_mng_result: `${
        base_api_url + slash + mng + slash + version + slash
    }info/result`,

    // 공통 결과코드
    api_mng_codes: `${
        base_api_url + slash + mng + slash + version + slash
    }_codes`,

    // 게시판 정보 등록
    // /v1/_board
    // POST
    api_board_reg: `${
        base_api_url + slash + mng + slash + version + slash
    }_board`,

    // 게시판 정보 목록
    // /v1/_boards
    // POST
    api_board_list: `${
        base_api_url + slash + mng + slash + version + slash
    }_boards`,

    // 게시판 정보 상세
    // /v1/board/{board_idx}
    // GET
    api_board_detail: `${
        base_api_url + slash + mng + slash + version + slash
    }board${slash}`,

    // ------------------ Account Service ------------------
    // 사용자 상세 GET
    // 사용자 수정 PUT
    // 사용자 등록 POST
    api_user: `${
        base_api_url + slash + account + slash + version + slash
    }_user`,

    // 사용자 정보 조회 POST
    // 사용자 정보 수정 PUT
    api_user_info: `${
        base_api_url + slash + account + slash + version + slash
    }user/info`,

    // 인증번호 발송 POST
    api_user_cert: `${
        base_api_url + slash + account + slash + version + slash
    }user/_cert`,
    // 인증번호 확인 PUT
    api_user_cert_chk: `${
        base_api_url + slash + account + slash + version + slash
    }user/_cert`,

    // 인증결과조회 GET
    api_user_cert_result: `${
        base_api_url + slash + account + slash + version + slash
    }user/_cert`,

    // 인증결과 받아서 다시 GET
    api_auth_cert_recieve_result: `${
        base_api_url + slash + auth + slash + version + slash
    }cert/result/`,

    // 사용자 목록 POST
    api_users: `${
        base_api_url + slash + account + slash + version + slash
    }users`,

    api_user_check: `${
        base_api_url + slash + account + slash + version + slash
    }user/_check`,

    // 사용자 확인 POST
    api_user_licenses: `${
        base_api_url + slash + account + slash + version + slash
    }user/_licenses`,

    // 아이디찾기 POST
    api_user_find_id: `${
        base_api_url + slash + account + slash + version + slash
    }user/find/_id`,

    // 비번찾기 POST
    api_user_find_pw: `${
        base_api_url + slash + account + slash + version + slash
    }user/find/_pwd`,

    // 비번변경 PUT
    api_user_reset_pw: `${
        base_api_url + slash + account + slash + version + slash
    }user/find/_pwd`,

    // 약관 목록 POST
    api_terms_list: `${
        base_api_url + slash + account + slash + version + slash
    }_policies`,

    // 마이페이지 리스트
    // /v1/user/mypages
    // POST
    api_mypage_list: `${
        base_api_url + slash + account + slash + version + slash
    }user/mypages`,

    // 마이페이지 정보 삭제
    // /v1/user/mypage/{detail_type}/{object_idx}/
    // DELETE
    api_mypage_remove: `${
        base_api_url + slash + account + slash + version + slash
    }user/mypage${slash}`,

    // 마이페이지 정보 수정
    // /v1/user/mypage
    // PUT
    api_mypage_mod: `${
        base_api_url + slash + account + slash + version + slash
    }user/mypage`,

    /**
     * 호텔
     */
    // 호텔 리스트
    // hotel/v1/meta/hotel
    // post
    api_hotel_list: `${
        base_api_url + slash + hotel + slash + version + slash
    }meta/hotels`,

    // 호텔 리스트 - no auth
    // hotel/v1/meta/_hotel
    // post
    api_hotel_list_no_auth: `${
        base_api_url + slash + hotel + slash + version + slash
    }meta/_hotels`,

    // 호텔 상세
    // /meta/hotel/{hotel_idx}/
    // get
    api_hotel_detail: `${
        base_api_url + slash + hotel + slash + version + slash
    }meta/hotel${slash}`,

    // 객실 리스트
    // /meta/rooms
    // post
    api_room_list: `${
        base_api_url + slash + hotel + slash + version + slash
    }meta/rooms`,

    // 객실 리스트2
    // /reserve/rooms
    // post
    api_reserve_rooms: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve/rooms`,

    // 예약 정보 상세
    // /v1/reserve/{reserve_idx}/
    // GET
    api_reserve_detail: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve${slash}`,

    // 예약 정보 등록
    // /v1/reserve
    // post
    api_reserve: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve`,

    // 예약 정보 등록
    // /v1/reserve/room
    // post
    api_reserve_room: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve/room`,

    // 예약 정보 등록 투숙객
    // /v1/reserve/room
    // post
    api_reserve_guest: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve/guest`,

    // 예약 정보 등록 결제정보
    // /v1/reserve/payment
    // post
    api_reserve_payment: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve/payment`,

    // /v1/reserve
    // PUT
    // 예약 정보 수정
    api_reserve_mod: `${
        base_api_url + slash + hotel + slash + version + slash
    }reserve`,

    /**
     * People Management API
     * 인물 관리 API
     */
    // 인물 정보 목록
    // /v1/_peoples
    // POST
    api_people_list: `${
        base_api_url + slash + mng + slash + version + slash
    }_peoples`,

    // 인물 정보 상세
    // /v1/_people/{people_idx}
    // GET
    api_people_detail: `${
        base_api_url + slash + mng + slash + version + slash
    }_people${slash}`,

    /**
     * Gallery Management API
     * Medi-Art 갤러리 관리 API
     */
    // /v1/_gallerys
    // POST
    // 갤러리 목록
    api_gallery_list: `${
        base_api_url + slash + mng + slash + version + slash
    }_gallerys`,

    // /v1/_gallery/{work_idx}/
    // GET
    // 갤러리 상세
    api_gallery_detail: `${
        base_api_url + slash + mng + slash + version + slash
    }_gallery${slash}`,

    // 댓글 정보 등록
    // /v1/_comment
    // POST MULTI
    api_mng_comment_reg: `${
        base_api_url + slash + mng + slash + version + slash
    }_comment`,
};

export { routerPath, apiPath };
