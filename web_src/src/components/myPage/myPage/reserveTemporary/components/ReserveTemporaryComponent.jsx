import React from "react";
import { apiPath, routerPath } from "webPath";
import { Link } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { myPageDetailType } from "common/js/static";
import { successCode } from "common/js/resultCode";

const ReserveTemporaryComponent = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const modData = props.modData;
    const handleNeedUpdate = props.handleNeedUpdate;

    const clickRemoveReserve = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "삭제 하시겠습니까?",
            callback: () => doRemoveReserve(),
        });

        const doRemoveReserve = () => {
            setIsSpinner(true);

            // 삭제
            const url =
                apiPath.api_mypage_remove +
                myPageDetailType.reserveTemporary +
                "/" +
                modData.reserve_idx;

            const restParams = {
                method: "delete",
                url: url,
                data: {},
                err: err,
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);

            const responsLogic = (res) => {
                const result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "삭제가 완료 되었습니다",
                        callback: () => pageUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }

                const pageUpdate = () => {
                    handleNeedUpdate();
                };
            };
        };
    };

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
                    <div className="btn_box">
                        <Link
                            to=""
                            onClick={clickRemoveReserve}
                            className="backbtn"
                        >
                            삭제
                        </Link>
                    </div>
                </div>
            </li>
        </>
    );
};

export default ReserveTemporaryComponent;
