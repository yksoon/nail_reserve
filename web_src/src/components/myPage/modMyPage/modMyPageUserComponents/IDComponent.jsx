import React, { forwardRef } from "react";

const IDComponent = forwardRef((props, ref) => {
    const userInfo = props.userInfo;

    const { userId } = ref;
    return (
        <>
            <h5>아이디</h5>
            <div className="flex">
                <div>
                    <input
                        type="email"
                        className="input w600 hold"
                        defaultValue={userInfo.user_id}
                        ref={userId}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
});

export default IDComponent;
