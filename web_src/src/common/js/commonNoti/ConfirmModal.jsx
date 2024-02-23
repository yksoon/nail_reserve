import { Link } from "react-router-dom";
import useConfirm from "hook/useConfirm";

const ConfirmModal = () => {
    const { confirmList } = useConfirm();

    if (confirmList.length <= 0) return null;

    return (
        <div className="alert_wrap block">
            {confirmList.map(
                ({ id, message, buttons: { ok, close, cancel } }, idx) => {
                    return (
                        <div className="alert" key={`confirm_${idx}`}>
                            <div>
                                {/*<span className="confirm_icon">?</span>*/}
                                <h3>
                                    {message
                                        ? decodeURI(message)
                                              .replaceAll("%20", " ")
                                              .replaceAll("%40", "@")
                                        : ""}
                                </h3>
                                <p>
                                    {/* {message
                                        ? decodeURI(message)
                                              .replaceAll("%20", " ")
                                              .replaceAll("%40", "@")
                                        : ""} */}
                                </p>
                            </div>
                            <div className="modal_btn_box">
                                <Link
                                    className="modal_btn on"
                                    onClick={ok.click}
                                >
                                    {ok.text}{" "}
                                </Link>{" "}
                                <Link
                                    className="modal_btn"
                                    onClick={cancel.click}
                                >
                                    {cancel.text}{" "}
                                </Link>
                            </div>
                        </div>
                        // <div className="mmodal-content" key={`confirm_${idx}`}>
                        //     <span className="close" onClick={close.click}>
                        //         &times;
                        //     </span>

                        //     <p>{message}</p>

                        //     <div className="mmodal-buttons">
                        //         <button onClick={ok.click}>{ok.text}</button>

                        //         {cancel && (
                        //             <button onClick={cancel.click}>
                        //                 {cancel.text}
                        //             </button>
                        //         )}
                        //     </div>
                        // </div>
                    );
                },
            )}
        </div>
    );
};

export default ConfirmModal;
