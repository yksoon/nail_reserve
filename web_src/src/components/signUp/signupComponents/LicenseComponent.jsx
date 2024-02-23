import React, { forwardRef, useEffect, useState } from "react";
import { CommonInputNumberPattern } from "common/js/Common";

const LicenseComponent = forwardRef((props, ref) => {
    const { md_licenses_number } = ref;

    const [mdLicensesNumber, setMdLicensesNumber] = useState("");

    return (
        <>
            <h5>면허번호</h5>
            <div className="flex">
                <div>
                    <input
                        type="text"
                        className="input w370"
                        ref={md_licenses_number}
                        onInput={(e) => {
                            e.target.value = CommonInputNumberPattern(e);
                            setMdLicensesNumber(e.target.value);
                        }}
                    />
                </div>

                {!mdLicensesNumber && (
                    <p className="mark red" id="mark_id">
                        면허번호는 숫자 형식으로 입력하세요
                    </p>
                )}
            </div>
        </>
    );
});

export default LicenseComponent;
