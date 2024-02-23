import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useRecoilValue } from "recoil";
import { codesAtom } from "recoils/atoms";
import { apiPath } from "webPath";

const ReserveComponent = (props) => {
    const modData = props.modData;
    const detailBoard = props.detailBoard;

    const codes = useRecoilValue(codesAtom);

    const [reserveStatus, setReserveStatus] = useState([]);

    useEffect(() => {
        setReserveStatus(
            codes
                .filter((el) => el.code_type === "RESERVE_STATUS")
                .filter((el) => el.code_key !== "400"),
        );
    }, []);

    // const steps = [
    //     "Select master blaster campaign settings",
    //     "Create an ad group",
    //     "Create an ad",
    // ];

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
                        <Link
                            to=""
                            className="font-12"
                            onClick={() => detailBoard(modData.reserve_idx)}
                        >
                            예약 상세보기
                        </Link>
                    </div>
                </div>
                <div className="h_status">
                    {modData.reserve_status_cd !== "400" ? (
                        <Box sx={{ width: "100%" }}>
                            <Stepper
                                activeStep={
                                    reserveStatus.findIndex(
                                        (el) =>
                                            el.code_key ===
                                            modData.reserve_status_cd,
                                    ) + 1
                                }
                                alternativeLabel
                            >
                                {reserveStatus.length !== 0 &&
                                    reserveStatus.map((reserveStatusItem) => (
                                        <Step key={reserveStatusItem.code_key}>
                                            <StepLabel>
                                                {
                                                    reserveStatusItem.code_value_ko
                                                }
                                            </StepLabel>
                                        </Step>
                                    ))}
                            </Stepper>
                        </Box>
                    ) : (
                        "예약 취소"
                    )}
                </div>
            </li>
        </>
    );
};

export default ReserveComponent;
