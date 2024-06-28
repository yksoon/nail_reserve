// 콜론, slash
const colon = ":";
const slash = "/";

const gateway = import.meta.env.VITE_API_GATEWAY
const prefix = import.meta.env.VITE_API_PREFIX
const version = "v1"
const base_api_url = `${gateway}/${prefix}/${version}`;

// api
const apiPath = {
    // ------------------ Information ------------------

    // /v1/_codes
    // POST
    // 공통 코드
    api_codes: `${base_api_url + slash}_codes`,
    // api_codes: `${slash}_codes`,

    // /v1/info/result
    // GET
    // 공통 코드
    api_result: `${base_api_url + slash}info/result`,
    // api_result: `${slash}info/result`,

    // /v1/captcha/img
    // GET
    // 자동가입방지-이미지
    api_captcha_img: `${base_api_url + slash}captcha/img`,
    // api_captcha_img: `${slash}captcha/img`,

    // /v1/_file/000/
    // GET
    // 파일 다운로드
    api_file: `${base_api_url + slash}_file/000/`,

    // ------------------ Auth ------------------

    // /v1/signin
    // POST
    // 로그인
    api_auth_signin: `${base_api_url + slash}signin`,
    // api_auth_signin: `${slash}signin`,

    // /v1/signout
    // POST
    // 로그아웃
    api_auth_signout: `${base_api_url + slash}signout`,
    // api_auth_signout: `${slash}signout`,

    // /v1/_user
    // POST(multi) 등록
    // PUT(multi) 수정
    api_auth_reg_user: `${base_api_url + slash}_user`,
    // api_auth_reg_user: `${slash}_user`,

    // ------------------ Refresh ------------------

    // /v1/refresh
    // POST
    // 토큰 리프레쉬
    api_refresh: `${base_api_url + slash}refresh`,
    // api_refresh: `${slash}refresh`,

    // ------------------ Menu Management ------------------

    // /v1/menus
    // GET
    // 메뉴 리스트
    api_admin_menus: `${base_api_url + slash}menus`,
    // api_admin_menus: `${slash}menus`,

    // ------------------ User Info Management API 사용자 정보 관리 API ------------------

    // /v1/user/infos
    // POST
    // 유저 리스트
    api_admin_user_infos: `${base_api_url + slash}user/infos`,
    // api_admin_user_infos: `${slash}user/infos`,

    // /v1/user/info/{user_idx}
    // POST
    // 유저 리스트
    api_admin_user_info: `${base_api_url + slash}user/info`,
    // api_admin_user_info: `${slash}user/info`,

    // /v1/user/_check
    // POST
    // 중복확인
    api_user_check: `${base_api_url + slash}user/_check`,
    // api_user_check: `${slash}user/_check`,

    // /v1/user/{user_idx}
    // GET
    // 유저 상세
    api_auth_user_idx: `${base_api_url + slash}user/`,
    // api_auth_user_idx: `${slash}user/`,

    // ------------------ Board API 게시판 관리 API ------------------
    // /v1/_boards
    // POST
    // 게시판 목록
    api_admin_boards: `${base_api_url + slash}_boards`,

    // /v1/board/{board_idx}
    // GET
    // 게시판 상세
    api_admin_get_board: `${
        base_api_url + slash
    }board${slash}`,

    // /v1/_board
    // POST MULTI
    // 게시판 등록
    api_admin_reg_board: `${base_api_url + slash}_board`,

    // /v1/board/
    // PUT MULTI
    // 게시판 수정
    api_admin_mod_board: `${base_api_url + slash}board`,

    // /v1/board/{board_idx}
    // DELETE
    // 게시판 삭제
    api_admin_remove_board: `${
        base_api_url + slash
    }board${slash}`,

    // /v1/board/_download
    // POST
    // 게시판 엑셀 다운로드
    api_admin_board_download: `${
        base_api_url + slash
    }board/_download`,

    // ------------------ People Management API 인물 관리 API ------------------
    // /v1/peoples
    // POST
    // 아티스트 리스트
    api_admin_list_people: `${base_api_url + slash}_peoples`,

    // /v1/people/{people_idx}/
    // GET
    // 아티스트 상세
    api_admin_detail_people: `${
        base_api_url + slash
    }_people${slash}`,

    // /v1/people/{people_idx}/
    // DELETE
    // 아티스트 삭제
    api_admin_remove_people: `${
        base_api_url + slash
    }people${slash}`,

    // /v1/people
    // POST
    // 아티스트 등록
    api_admin_add_people: `${base_api_url + slash}people`,

    // /v1/people
    // PUT
    // 아티스트 수정
    api_admin_mod_people: `${base_api_url + slash}people`,

    // /v1/qrcodes
    // POST
    // QR코드 리스트
    api_admin_get_qrcodes: `${base_api_url + slash}qrcodes`,

    // ------------------ Gallery Management API 갤러리 관리 API ------------------

    // /v1/_gallerys
    // POST
    // 갤러리 목록
    api_list_gallery: `${base_api_url + slash}_gallerys`,

    // /v1/gallery/{work_idx}/
    // DELETE
    // 갤러리 삭제
    api_delete_gallery: `${
        base_api_url + slash
    }gallery${slash}`,

    // /v1/_gallery/{work_idx}/
    // GET
    // 갤러리 상세
    api_detail_gallery: `${
        base_api_url + slash
    }_gallery${slash}`,

    // /v1/_gallery
    // POST MULTI
    // 갤러리 등록
    api_add_gallery: `${base_api_url + slash}_gallery`,

    // /v1/gallery
    // PUT
    // 갤러리 수정
    api_mod_gallery: `${base_api_url + slash}gallery`,

    // /v1/gallery/_download/{work_idx}/
    // GET
    // 갤러리 정보 다운로드
    api_gallery_download: `${
        base_api_url + slash
    }gallery/_download${slash}`,
};

export default apiPath