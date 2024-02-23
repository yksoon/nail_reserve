import { forwardRef, React } from "react";
import { routerPath } from "webPath";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { CommonErrModule, CommonNotify } from "common/js/Common";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";

const Sitemap = (props) => {
    // const needToken = props.needToken;
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();

    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    const navigate = useNavigate();

    const items = [
        {
            imgUrl: "img/main/quick01.png",
            title: "전체",
            url: routerPath.service_url,
            onClick: () => needToken(routerPath.service_url),
        },
        {
            imgUrl: "img/main/quick02.png",
            title: "MEDI POINT",
        },
        {
            imgUrl: "img/main/quick03.png",
            title: "호텔 특가",
            url: routerPath.hotel_list,
            onClick: () => needToken(routerPath.hotel_list),
        },
        {
            imgUrl: "img/main/quick04.png",
            title: "MEDI ART",
            url: routerPath.medi_art_gallery_list,
            onClick: () => needToken(routerPath.medi_art_gallery_list),
        },
        {
            imgUrl: "img/main/quick05.png",
            title: "세무/회계 컨설팅",
            onClick: () => needToken(routerPath.tax_consulting),
        },
        {
            imgUrl: "img/main/quick06.png",
            title: "MICE/PCO",
        },
        {
            imgUrl: "img/main/quick07.png",
            title: "K-MEDI CREATOR",
            onClick: () => needToken(routerPath.kmedi_creator),
        },
        {
            imgUrl: "img/main/quick08.png",
            title: "MYPAGE",
            url: routerPath.myPage_url,
            onClick: () => needToken(routerPath.myPage_url),
        },
    ];

    // 로그인 필요
    const needToken = (url) => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스입니다.",
                callback: () => inputId.current.focus(),
            });
        } else {
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("html").style.paddingRight = "0";
            // hotelIdx 변수를 올바르게 사용하도록 수정
            navigate(url);
        }
    };

    return (
        <>
            <div id="sitemap">
                <div>
                    <div>
                        <h3 className="font-38">SERVICE</h3>
                        <ul>
                            <li>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        navigate(routerPath.main_url)
                                    }
                                >
                                    <span>
                                        {/*<img*/}
                                        {/*    src="/img/main/quick09.png"*/}
                                        {/*    alt=""*/}
                                        {/*/>*/}
                                        <img
                                            src="/img/main/quick14.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>HOME</p>
                                </a>
                            </li>
                            <li>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        needToken(routerPath.hotel_list)
                                    }
                                >
                                    <span>
                                        <img
                                            src="/img/main/quick03.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>호텔 특가</p>
                                </a>
                            </li>
                            <li>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        needToken(
                                            routerPath.medi_art_gallery_list,
                                        )
                                    }
                                >
                                    <span>
                                        <img
                                            src="/img/main/quick04.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>MEDI ART</p>
                                </a>
                            </li>
                            <li>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        needToken(routerPath.tax_consulting)
                                    }
                                >
                                    <span>
                                        <img
                                            src="/img/main/quick05.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>세무/회계 컨설팅</p>
                                </a>
                            </li>
                            {/* <li>
                                <a>
                                    <span>
                                        <img
                                            src="/img/main/quick06.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>MICE/PCO</p>
                                </a>
                            </li> */}
                            <li>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        needToken(routerPath.kmedi_creator)
                                    }
                                >
                                    <span>
                                        <img
                                            src="/img/main/quick07.png"
                                            alt=""
                                        />
                                    </span>
                                    <p>K-MEDI CREATOR</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex">
                        <div>
                            <h3 className="font-38">COMMUNITY</h3>
                            <ul>
                                <li>
                                    <a
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            needToken(routerPath.news_list)
                                        }
                                    >
                                        <span>
                                            <img
                                                src="/img/main/quick10.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>학회소식</p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            needToken(routerPath.event_list)
                                        }
                                    >
                                        <span>
                                            <img
                                                src="/img/main/quick11.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>EVENT</p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            needToken(routerPath.faq_list)
                                        }
                                    >
                                        <span>
                                            <img
                                                src="/img/main/quick13.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>FAQ</p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            needToken(routerPath.notice_list)
                                        }
                                    >
                                        <span>
                                            <img
                                                src="/img/main/quick12.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>공지사항</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-38">MEMBERSHIP</h3>
                            <ul>
                                {/*<li>*/}
                                {/*    <a href="">*/}
                                {/*        <span>*/}
                                {/*            <img*/}
                                {/*                src="/img/main/quick02.png"*/}
                                {/*                alt=""*/}
                                {/*            />*/}
                                {/*        </span>*/}
                                {/*        <p>MEDI POINT</p>*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                <li>
                                    <a href="">
                                        <span>
                                            <img
                                                src="/img/main/quick07.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>K-MEDI CREATOR</p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            needToken(routerPath.myPage_url)
                                        }
                                    >
                                        <span>
                                            <img
                                                src="/img/main/quick08.png"
                                                alt=""
                                            />
                                        </span>
                                        <p>MYPAGE</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sitemap;
