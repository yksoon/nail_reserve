import React from "react";

const HotelDetailModal = (props) => {
    const modData = props.modData;
    return (
        <>
            <pre className="modal_service">{modData}</pre>
        </>
    );
};

export default HotelDetailModal;
