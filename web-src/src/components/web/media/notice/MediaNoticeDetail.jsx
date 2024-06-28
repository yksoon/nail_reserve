import React, { useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify } from "etc/lib/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "etc/lib/recoils/atoms";
import { useParams } from "react-router";
import apiPath from "etc/lib/path/apiPath";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";
import { successCode } from "etc/lib/resultCode";
import Header from "components/web/common/Header";
import { Link } from "react-router-dom";
import routerPath from "etc/lib/path/routerPath";
import Footer from "components/web/common/Footer";

const MediaNoticeDetail = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // url params
    const params = useParams();
    const boardIdx = params ? params.boardIdx : "";

    /**
     * 게시판 상세 state
     */
    const [boardInfo, setBoardInfo] = useState({});

    useEffect(() => {
        detailBoard(boardIdx);
    }, []);

    /**
     * 공지사항 상세
     * @param idx
     */
    const detailBoard = (idx) => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_board + idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            if (res.headers.resultcode === successCode.success) {
                const resultInfo = res.data.resultInfo;
                setBoardInfo(resultInfo);

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.resultmessageko,
                });
            }
        };
    };

    const createMarkup = (content) => {
        return { __html: content };
    };

    return (
        <>
            <Header />

            <div id="subvisual">
                <div className="sub_txt">
                    <h2>MEDIA CENTER</h2>
                </div>
                <div id="leftmenu">
                    <Link to={routerPath.web_media_news_url}>NEWS</Link>
                    <Link
                        to={routerPath.web_media_notice_url}
                        className="active"
                    >
                        공지사항
                    </Link>
                </div>
            </div>

            <div id="con_area">
                <div className="notice">
                    {Object.keys(boardInfo).length !== 0 && (
                        <table className="board_Vtable">
                            <colgroup>
                                <col width="18%" />
                                <col width="*" />
                                <col width="*" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colSpan="3">{boardInfo.subject}</th>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <ul>
                                            <li>{boardInfo.regDttm}</li>
                                        </ul>
                                    </td>
                                </tr>
                                {boardInfo.fileInfo.length !== 0 && (
                                    <tr>
                                        <td colSpan="3" className="filetd">
                                            <ul>
                                                {boardInfo.fileInfo.map(
                                                    (item) => (
                                                        <li className="download_li">
                                                            <Link
                                                                to={`${apiPath.api_file}${item.filePathEnc}`}
                                                                className="attachment_parent"
                                                            >
                                                                {
                                                                    item.fileNameOrg
                                                                }{" "}
                                                                <img
                                                                    src="img/common/file.svg"
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="3">
                                        <div className="board_content ql-snow">
                                            <div
                                                dangerouslySetInnerHTML={createMarkup(
                                                    boardInfo.content,
                                                )}
                                                className="ql-editor"
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            {/*이전글/다음글 백엔드 안내려옴*/}
                            {/*<tfoot>*/}
                            {/*    <tr>*/}
                            {/*        <td>Previous</td>*/}
                            {/*        <td colSpan="2"></td>*/}
                            {/*    </tr>*/}
                            {/*    <tr>*/}
                            {/*        <td>Next</td>*/}
                            {/*        <td colSpan="2">*/}
                            {/*            <a href=""></a>*/}
                            {/*        </td>*/}
                            {/*    </tr>*/}
                            {/*</tfoot>*/}
                        </table>
                    )}
                    <div className="board_btn_wrap">
                        <div className="boardW_btn">
                            <Link
                                to={routerPath.web_media_notice_url}
                                className="back_btn"
                            >
                                List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MediaNoticeDetail;
