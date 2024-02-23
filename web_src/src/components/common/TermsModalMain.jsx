import React from "react";

const TermsModalMain = (props) => {
    const modData = props.modData;

    return (
        <>
            <pre>{modData.conditions}</pre>
        </>
    );
};

export default TermsModalMain;
