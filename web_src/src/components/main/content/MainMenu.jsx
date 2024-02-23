import { forwardRef, React } from "react";
import { routerPath } from "webPath";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userTokenAtom } from "recoils/atoms";
import { CommonErrModule, CommonNotify } from "common/js/Common";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";

const MainMenu = forwardRef((props, ref) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const userToken = useRecoilValue(userTokenAtom);

    const inputId = ref.inputId;

    const items = [
        {
            imgUrl: "img/main/quick01.png",
            title: "전체",
            url: routerPath.service_url,
            onClick: () => navigate(routerPath.service_url),
        },
        // {
        //     imgUrl: "img/main/quick02.png",
        //     title: "MEDI POINT",
        // },
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
            url: routerPath.tax_consulting,
            onClick: () => needToken(routerPath.tax_consulting),
        },
        // {
        //     imgUrl: "img/main/quick06.png",
        //     title: "MICE/PCO",
        //     onClick: () => needToken("/"),
        // },
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

    const needToken = (url) => {
        if (!userToken) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "로그인이 필요한 서비스입니다.",
                callback: () => inputId.current.focus(),
            });
        } else {
            // hotelIdx 변수를 올바르게 사용하도록 수정
            navigate(url);
        }
    };

    return (
        <>
            <div className="quick">
                <div className="title">
                    <h3>메디씨티에서 다양한 혜택을 제공합니다!</h3>
                </div>
                <ul>
                    {items.map((item, idx) => (
                        <li key={`main_quick_${idx}`}>
                            <a
                                onClick={item.onClick}
                                style={{ cursor: "pointer" }}
                            >
                                <span>
                                    <img src={item.imgUrl} alt="" />
                                </span>
                                <p>{item.title}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});

export default MainMenu;
