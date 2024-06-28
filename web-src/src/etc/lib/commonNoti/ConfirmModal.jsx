import { Link } from "react-router-dom";
import useConfirm from "hook/useConfirm";

const ConfirmModal = () => {
    const { confirmList } = useConfirm();

    if (confirmList.length <= 0) return null;

    const escKeyModalClose = (e) => {
        if (e.keyCode === 27 && document.getElementById("closeBtn") !== null) {
            document.getElementById("closeBtn").click();
            return false;
        }
    };
    window.addEventListener("keydown", escKeyModalClose);

    return (
        <div className="alert_wrap block">
            {confirmList.map(
                ({ id, message, buttons: { ok, close, cancel } }, idx) => {
                    return (
                        <div className="alert" key={`confirm_${idx}`}>
                            <div>
                                <span className="confirm_icon">?</span>
                                <h3>
                                    {message
                                        ? decodeURI(message)
                                              .replaceAll("%20", " ")
                                              .replaceAll("%40", "@")
                                              .replaceAll("%3A", ":")
                                        : ""}
                                </h3>
                            </div>
                            <div className="modal_btn_box">
                                <Link className="modal_btn on" onClick={ok.click}>
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
                    );
                }
            )}
        </div>
    );
};

export default ConfirmModal;
