import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ko from "etc/lib/language/web/languages/ko";
import en from "etc/lib/language/web/languages/en";
import id from "etc/lib/language/web/languages/id";

// 사용자 언어 탐지 옵션 설정
const languageDetectorOptions = {
    // 여기서 원하는 순서로 언어를 탐지하도록 설정할 수 있습니다.
    // 예를 들어, 쿠키 -> 세션 스토리지 -> 브라우저 언어 -> HTML lang 속성 순으로 탐지
    order: [
        "cookie",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
    ],
    // 쿠키 이름 설정
    lookupCookie: "i18next",
    // 로컬 스토리지 키 설정
    lookupSessionStorage: "i18nextLng",
    // 사용할 언어를 여기에 정의
    caches: ["sessionStorage", "cookie"],
};

i18n.use(LanguageDetector) // 사용자 언어 탐지
    .use(initReactI18next) // i18n 객체를 react-18next에 전달
    .init({
        // for all options read: https://www.i18next.com/overview/configuration-options
        detection: languageDetectorOptions, // 설정한 언어 탐지 옵션 추가
        debug: false,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ko: ko,
            en: en,
            id: id,
        },
    });

export default i18n;
