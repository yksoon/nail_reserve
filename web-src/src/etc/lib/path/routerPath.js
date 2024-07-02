// 기본 url
import { routerCategory } from "etc/lib/path/category";

const base_url = "/";

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
