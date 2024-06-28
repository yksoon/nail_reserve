import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";

function Header(props) {
    return (
        <>
            <Box
                component="section"
                sx={{ pt: 5, display: "flex", justifyContent: "center" }}
            >
                <Box>
                    <p className="main_title">네일, 다시만나</p>
                </Box>
            </Box>

            <Box
                component="section"
                sx={{ p: 2, display: "flex", justifyContent: "center" }}
            >
                <Box>
                    <p className="main_sub_title">실시간 고객 예약현황</p>
                </Box>
            </Box>
        </>
    );
}

export default Header;
