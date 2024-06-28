import { Link } from "react-router-dom";
import useAlert from "hook/useAlert";

const AlertModal = () => {
    const { alertList } = useAlert();

    if (alertList.length <= 0) return null;

    const escKeyModalClose = (e) => {
        if (e.keyCode === 27 && document.getElementById("okBtn") !== null) {
            document.getElementById("okBtn").click();
            return false;
        }
    };
    window.addEventListener("keydown", escKeyModalClose);

    return (
        <div className="alert_wrap block">
            {alertList.map(
                ({ id, message, buttons: { ok, close, cancel } }, idx) => {
                    return (
                        <div className="alert" key={`confirm_${idx}`}>
                            <div>
                                {/* <span
                                    className="noti_icon"
                                    id="modal-modal-title"
                                >
                                    <img src="img/common_old/alert.png" alt="" />
                                </span> */}
                                <span className="confirm_icon">!</span>
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
                                <Link className="modal_btn" onClick={ok.click}>
                                    {ok.text}{" "}
                                </Link>
                            </div>
                        </div>
                    );
                },
            )}
        </div>
    );
};

export default AlertModal;
