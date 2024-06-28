import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "recoilSession", //원하는 key 값 입력
    storage: sessionStorage,
});

// ----------------atoms-------------------

// ----session Start----
// 관리자 페이지
export const pageAtom = atom({
    key: "page",
    default: import.meta.env.VITE_ADMIN_DEFAULT_PAGE,
    effects_UNSTABLE: [persistAtom], // 세션에 저장하려면 해당 코드 추가
});

// 관리자
export const userInfoAdminAtom = atom({
    key: "userInfoAdmin",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

// 관리자 토큰
export const userTokenAdminAtom = atom({
    key: "userTokenAdmin",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

// ip info
export const ipInfoAtom = atom({
    key: "ipInfo",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

// resultCode
export const resultCodeAtom = atom({
    key: "resultCode",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// codes
export const codesAtom = atom({
    key: "codes",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// country bank
export const countryBankAtom = atom({
    key: "countryBank",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// 사용자
export const userInfoAtom = atom({
    key: "userInfo",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

// 사용자 토큰
export const userTokenAtom = atom({
    key: "userToken",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

// 언어 기본 세팅
export const globalLanguageAtom = atom({
    key: "globalLanguage",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

// 게시판 카테고리
export const boardCategoryAtom = atom({
    key: "boardCategory",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

// ----session End----

// 스피너
export const isSpinnerAtom = atom({
    key: "isSpinner",
    default: false,
});
