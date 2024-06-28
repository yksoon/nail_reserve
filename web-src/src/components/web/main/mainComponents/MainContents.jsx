import Section01 from "components/web/main/mainComponents/mainContentsComponents/Section01";
import Section02 from "components/web/main/mainComponents/mainContentsComponents/Section02";
import Section03 from "components/web/main/mainComponents/mainContentsComponents/Section03";
import Section04 from "components/web/main/mainComponents/mainContentsComponents/Section04";
import Section05 from "components/web/main/mainComponents/mainContentsComponents/Section05";
import Section06 from "components/web/main/mainComponents/mainContentsComponents/Section06";
import { Box } from "@mui/material";

const MainContents = (props) => {
    return (
        <>
            <div id="container">
                <Box display="flex" justifyContent="flex-end">
                    <Box className="index_openkakao_btn">
                        <div className="index_openkakao_img_div">
                            <img
                                src="./img/common/kakao.png"
                                className="index_openkakao_img"
                                alt=""
                            />
                        </div>
                        <div className="index_openkakao_text_div">KakaoCh</div>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default MainContents;
