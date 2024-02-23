import React, { forwardRef } from "react";

const NameComponent = forwardRef((props, ref) => {
    const {
        user_name_first_ko,
        user_name_last_ko,
        user_name_first_en,
        user_name_last_en,
    } = ref;

    return (
        <>
            <div>
                <h5>
                    성명 (국문) <span className="red">*</span>
                </h5>
                <input
                    type="name"
                    className="input w180"
                    placeholder="성"
                    ref={user_name_first_ko}
                />
                <input
                    type="name"
                    className="input w180"
                    placeholder="이름"
                    ref={user_name_last_ko}
                />
            </div>
            <div>
                <h5>
                    성명 (영문) <span className="red">*</span>
                </h5>
                <input
                    type="name"
                    className="input w180"
                    placeholder="First name"
                    ref={user_name_first_en}
                />
                <input
                    type="name"
                    className="input w180"
                    placeholder="Last name"
                    ref={user_name_last_en}
                />
            </div>
        </>
    );
});

export default NameComponent;
