import React from "react";
import { apiPath } from "webPath";

const ReserveTemporaryComponent = (props) => {
    const modData = props.modData;

    return (
        <>
            <li className="my_hotel">
                <div className="flex">
                    <span className="h_thumb">
                        <img
                            src={
                                modData.hotel_info.file_path_enc
                                    ? `${apiPath.api_img_path}${modData.hotel_info.file_path_enc}`
                                    : "img/main/hotel01.png"
                            }
                            alt=""
                        />
                    </span>
                    <div>
                        <p className="date">
                            {modData.reg_dttm
                                .split(" ")[0]
                                .replaceAll("-", ".")}
                        </p>
                        <div className="m_title">
                            <h5>{modData.hotel_info.name_ko}</h5>
                        </div>
                        {/*<Link href="mypage_hotel.html" className="font-12">*/}
                        {/*    예약 상세보기*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </li>
        </>
    );
};

export default ReserveTemporaryComponent;
