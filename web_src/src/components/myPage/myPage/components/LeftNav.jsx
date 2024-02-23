import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";
import { useRecoilValue } from "recoil";
import { isSpinnerAtom, userInfoAtom } from "recoils/atoms";
import { Skeleton } from "@mui/material";

const LeftNav = (props) => {
    const userInfo = useRecoilValue(userInfoAtom);
    const reserveTotalCount = props.reserveTotalCount;
    const reserveTemporaryTotalCount = props.reserveTemporaryTotalCount;
    const contentsQnaTotalCount = props.contentsQnaTotalCount;
    const contentsTotalCount = props.contentsTotalCount;

    const isSpinner = useRecoilValue(isSpinnerAtom);

    const allowRole = ["000", "100", "300"];

    useEffect(() => {
        // 좌측 메뉴 위치 고정
        let fixedMenu = document.querySelector(".fixed_menu");
        const position = fixedMenu.offsetTop; // fixed 메뉴 위치

        window.addEventListener("scroll", function () {
            const scrollTop = window.pageYOffset; // 현재 스크롤 위치
            const footer = document.querySelector("footer");
            const footerH = footer.offsetHeight + 150; // footer 높이
            const wrap = document.querySelector(".wrap");
            const wrapH = wrap.offsetHeight; // 모든 컨텐츠 높이
            const conH = wrapH - footerH - fixedMenu.offsetHeight - position; // footer 까지 스크롤 도달 위치 계산

            if (scrollTop + 15 > position) {
                if (conH + position - 30 > scrollTop) {
                    fixedMenu.style.position = "fixed";
                    fixedMenu.style.top = "0";
                } else {
                    fixedMenu.style.position = "absolute";
                    fixedMenu.style.top = conH + "px";
                }
            } else {
                fixedMenu.style.position = "absolute";
                fixedMenu.style.top = "0";
            }
        });
    }, []);

    return (
        <>
            <div className="my_fix_wrap">
                <div className="fixed_menu">
                    <div className="my_quick">
                        <div className="info">
                            <div className="name">
                                <h3>{userInfo.user_name_ko} 님</h3>
                                {/* <p className="point">*/}
                                {/*    <span>*/}
                                {/*        <img*/}
                                {/*            src="img/mypage/point.png"*/}
                                {/*            alt=""*/}
                                {/*        />*/}
                                {/*    </span>*/}
                                {/*    1,480,960,000*/}
                                {/*</p> */}
                            </div>
                            <div className="my_list">
                                <ul>
                                    <li>
                                        <Link to={routerPath.mod_mypage}>
                                            회원정보 수정
                                        </Link>
                                    </li>
                                </ul>
                                <div className="flex">
                                    <ul>
                                        <li>
                                            <Link
                                                to={
                                                    routerPath.my_page_reserve_url
                                                }
                                            >
                                                호텔 전체 예약{" "}
                                                <span>
                                                    {isSpinner ? (
                                                        <Skeleton
                                                            width={"40px"}
                                                            variant="text"
                                                            sx={{
                                                                display:
                                                                    "inline-block",
                                                            }}
                                                        />
                                                    ) : (
                                                        `${reserveTotalCount}건`
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={
                                                    routerPath.my_page_reserve_temp_url
                                                }
                                            >
                                                둘러본 호텔{" "}
                                                <span>
                                                    {isSpinner ? (
                                                        <Skeleton
                                                            width={"35px"}
                                                            variant="text"
                                                            sx={{
                                                                display:
                                                                    "inline-block",
                                                            }}
                                                        />
                                                    ) : (
                                                        `${reserveTemporaryTotalCount}건`
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                        {allowRole.includes(
                                            userInfo.user_role_cd,
                                        ) && (
                                            <li>
                                                <Link href="mypage_qna_list.html">
                                                    전체 Q&A{" "}
                                                    <span>
                                                        {isSpinner ? (
                                                            <Skeleton
                                                                width={"35px"}
                                                                variant="text"
                                                                sx={{
                                                                    display:
                                                                        "inline-block",
                                                                }}
                                                            />
                                                        ) : (
                                                            `${contentsQnaTotalCount}건`
                                                        )}
                                                    </span>
                                                </Link>
                                            </li>
                                        )}

                                        {allowRole.includes(
                                            userInfo.user_role_cd,
                                        ) && (
                                            <li>
                                                <Link href="">
                                                    전체 동영상{" "}
                                                    <span>
                                                        {isSpinner ? (
                                                            <Skeleton
                                                                width={"35px"}
                                                                variant="text"
                                                                sx={{
                                                                    display:
                                                                        "inline-block",
                                                                }}
                                                            />
                                                        ) : (
                                                            `${contentsTotalCount}건`
                                                        )}
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                    <ul>
                                        {/*<li>*/}
                                        {/*   <Link href="">*/}
                                        {/*       포인트 정산 내역*/}
                                        {/*   </Link>*/}
                                        {/*</li>*/}

                                        {/*<li>*/}
                                        {/*   <Link*/}
                                        {/*       to={*/}
                                        {/*           routerPath.my_page_reserve_temp_url*/}
                                        {/*       }*/}
                                        {/*   >*/}
                                        {/*       예약중인 호텔{" "}*/}
                                        {/*       <span>*/}
                                        {/*           {isSpinner ? (*/}
                                        {/*               <Skeleton*/}
                                        {/*                   width={"35px"}*/}
                                        {/*                   variant="text"*/}
                                        {/*                   sx={{*/}
                                        {/*                       fontSize:*/}
                                        {/*                           "1.3rem",*/}
                                        {/*                       display:*/}
                                        {/*                           "inline-block",*/}
                                        {/*                   }}*/}
                                        {/*               />*/}
                                        {/*           ) : (*/}
                                        {/*               `${reserveTemporaryTotalCount}건`*/}
                                        {/*           )}*/}
                                        {/*       </span>*/}
                                        {/*   </Link>*/}
                                        {/*</li>*/}

                                        {/*{userInfo.user_role_cd === "000" ||*/}
                                        {/*   userInfo.user_role_cd === "100" ||*/}
                                        {/*   (userInfo.user_role_cd ===*/}
                                        {/*       "300" && (*/}
                                        {/*       <li>*/}
                                        {/*           <Link href="">*/}
                                        {/*               구독자 현황*/}
                                        {/*           </Link>*/}
                                        {/*       </li>*/}
                                        {/*   ))}*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="add_banner">
                        <li>
                            <Link href="">
                                <img
                                    src="img/mypage/banner_230614.png"
                                    alt=""
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <img
                                    src="img/mypage/banner_230615.png"
                                    alt=""
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeftNav;
