// 비밀번호 패턴
// 특수문자, 문자, 숫자 포함 형태의 6~16자리
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;

// 아이디 패턴
// 모든 글자 4글자이상 20글자 이하
const idPattern = /^.{4,20}$/;

// 휴대전화 패턴
// mobile1: 숫자 3자리
// mobile2: 숫자 3~4자리
// mobile3: 숫자 3~4자리
const mobile1Pattern = /^[0-9]{1,3}$/;
const mobile2Pattern = /^[0-9]{1,4}$/;

// 자동가입방지코드 패턴
// 숫자6자리
const securityPattern = /^[0-9]{6}$/;

// 한줄응원 패턴
// 모든 글자 1글자이상 글자 이하
const oneLinePattern = /^.{1,60}$/;
const spacePattern = /\s/g;

// 숫자 세자리 콤마 패턴 (replace 사용해서 콤마 찍어줘야됨)
const commaOfNumber = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export {
    pwPattern,
    idPattern,
    mobile1Pattern,
    mobile2Pattern,
    securityPattern,
    oneLinePattern,
    spacePattern,
    commaOfNumber,
    emailPattern,
};
