// 기본 url
import { routerCategory } from "etc/lib/path/category";

const base_url = "/";

// const base_api_url = protocol + host + colon + port;
// const base_api_url = process.env.REACT_APP_DB_HOST;
// const base_api_url = "http://localhost:3005";
// "proxy": "http://jejujobara.com:60000"

// admin
const admin = "admin";

// route
const routerPath = {
    // -----------------------------------------------
    // |                  web                        |
    // -----------------------------------------------

    // 메인
    // /
    web_main_url: `${base_url}`,

    // --------------------- infos ----------------------
    // 인포 - 인사말
    web_info_greet_url: `${base_url}${routerCategory.info}/welcome`,

    // --------------------- K-MEDI ----------------------
    // K-MEDI - 소개
    web_kmedi_intro_url: `${base_url}${routerCategory.kmedi}/intro`,

    // --------------------- K-MEDI ----------------------
    // 비즈니스 - 호텔
    web_business_hotel_url: `${base_url}${routerCategory.business}/hotel`,

    // --------------------- MEDIA ----------------------
    // 미디어 - 뉴스
    web_media_news_url: `${base_url}${routerCategory.media}/news`,

    // 미디어 - 뉴스 - 상세
    web_media_news_detail_url: `${base_url}${routerCategory.media}/news/`,

    // 미디어 - 공지
    web_media_notice_url: `${base_url}${routerCategory.media}/notice`,

    // 미디어 - 공지 - 상세
    web_media_notice_detail_url: `${base_url}${routerCategory.media}/notice/`,

    // -----------------------------------------------
    // |                  admin                      |
    // -----------------------------------------------
    // 메인
    // /admin
    admin_main_url: `${base_url + admin}`,

    // 로그인
    // /admin/signin
    admin_signin_url: `${base_url + admin}/signin`,
};

export default routerPath;
