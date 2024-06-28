import { Modal } from "@mui/material";
import { React } from "react";
import NoticeBoardModal from "components/admin/board/notice/modal/NoticeBoardModal";
import ContentsBoardModal from "components/admin/board/contents/modal/ContentsBoardModal";

const CommonModal = (props) => {
    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        handleModalClose: props.handleModalClose,
        width: props.width,
    };

    const component = props.component;

    const data = props.data ?? {}

    const handleNeedUpdate = props.handleNeedUpdate
        ? props.handleNeedUpdate
        : null;

    const handleNeedUpdateComment = props.handleNeedUpdateComment
        ? props.handleNeedUpdateComment
        : null;

    // 모달 컴포넌트 렌더
    const renderComponent = (component) => {
        switch (component) {
            // case "RegUserModalMain":
            //     return (
            //         <RegUserModalMain
            //             handleNeedUpdate={handleNeedUpdate}
            //             handleModalClose={modalOption.handleModalClose}
            //             modUserData={props.modUserData}
            //         />
            //     );

            // 공지사항
            case "NoticeBoardModal":
                return (
                    <NoticeBoardModal
                        handleNeedUpdate={handleNeedUpdate}
                        handleNeedUpdateComment={handleNeedUpdateComment}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 컨텐츠
            case "ContentsBoardModal":
                return (
                    <ContentsBoardModal
                        handleNeedUpdate={handleNeedUpdate}
                        handleNeedUpdateComment={handleNeedUpdateComment}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            default:
                return;
        }
    };
    return (
        <>
            <Modal
                open={modalOption.isOpen}
                onClose={modalOption.handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal_wrap" id="modal_wrap">
                    <div
                        className={`modal`}
                        style={{ width: `${modalOption.width}px` }}
                    >
                        <div
                            className="modal_content form hotel"
                            id="hotelInsert"
                        >
                            <div className="mo_title">
                                <h4>{modalOption.title}</h4>
                                <div
                                    className="modal_close"
                                    onClick={modalOption.handleModalClose}
                                >
                                    <img
                                        src="img/common/modal_close.png"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* 모달 컨텐츠 드가자 */}

                            {renderComponent(component)}

                            {/* 모달 컨텐츠 드가자 END */}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CommonModal